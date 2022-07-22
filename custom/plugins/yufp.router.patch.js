/**
 * @created by helin3 2018-04-11
 * @updated by
 * @description 1、页面路由切换时，销毁vm实例;
 *              2、页面路由切换模拟多webview（迁移jiangcheng）
 *                若通过yufp.router.append打开的页面，必须通过yufp.router.remove移除，不能使用yufp.router.back，否则会报错
 */
(function (yufp, $, duration, Vue) {
  'use strict';

  /** **********路由切换时，销毁vm实例**************/
  var vmSeedAttr = 'VM_SEED_ID'; // seed type
  var vmSeed = 0; // vmSeed种子
  var vmInstanceRegister = {}; // vue注册表
  var vmGetSeedId = function () {
    return 'VM_' + vmSeed++;
  };
  var vmStorageRemove = function (id) {
    var vm = vmInstanceRegister[id];
    if (vm) {
      delete vmInstanceRegister[id];
    }
    return vm;
  };
  var vmStoragePut = function (id, vm) {
    vmInstanceRegister[id] = vm;
  };
  Vue.mixin({
    mounted: function () {
      var el = this.$el;
      var id = el && el.getAttribute ? el.getAttribute(vmSeedAttr) : false;
      if (!id && el.id) {
        id = el && el.parentNode ? el.parentNode.getAttribute(vmSeedAttr) : false;
      }
      if (id) {
        vmStoragePut(id, this);
      }
    }
  });
  /** **********路由切换时，销毁vm实例**************/

  /**
   * view mount handler
   */
  var ViewMountHandler = (function () {
    function ViewMountHandler () {}

    /**
     * 替换加载
     *
     * @param id
     * @param route
     * @param cite
     * @param router
     * @param callback
     * @param root
     */
    ViewMountHandler.prototype.replace = function (id, route, cite, router, callback, root) {
      // css node节点数组
      var cssNodes = [];
      // js node节点数组
      var jsNodes = [];
      // html node节点
      var htmlNode;
      // 获取第一节点
      var node = yufp.getFirstElementChild(root);
      while (node != null) {
        // 获取name
        var nodeName = node.nodeName.toUpperCase();

        if (nodeName === 'SCRIPT') {
          jsNodes.push(node);
        } else if (nodeName === 'LINK') {
          cssNodes.push(node);
        } else if (nodeName == 'DIV') {
          htmlNode = node;
        }
        node = yufp.getNextElementSibling(node);
      }
      var libs = [];
      // 1、加入css
      if (route.css) {
        libs = libs.concat(route.css.split(','));
      }
      // 2、加入js
      if (route.js) {
        libs = libs.concat(route.js.split(','));
      }
      // 获取html资源
      yufp.require.get(route.html, function (code, data) {
        // 正常返回
        if (code != 0) {
          yufp.logger.error('加载html资源失败');
          router.eventChain.fire();
          return;
        }
        // 数组参数
        var args = {
          'cssPoint': root,
          'jsPoint': root
        };
        // 加载css和js
        yufp.require.require(libs, function () {
          // 释放旧的page
          router.unMount(cite.rootId);

          var args = arguments;
          // 获取export函数
          var exports;
          for (var i = 0; i < args.length; i++) {
            if (yufp.type(args[i]) === 'object') {
              exports = args[i];
              break;
            }
          }
          if (exports && exports.mount) {
            // 执行过滤器
            router.doFilters(yufp.core.FilterType.Mount, id, cite);
            // 执行mount方法
            try {
              exports.mount(id, cite);
            } catch (ex) {
              yufp.logger.error(ex.Message, ex);
            }
          }

          // 删除旧的js节点
          for (var i = 0; root.hasChildNodes() && i < jsNodes.length; i++) {
            try {
              root.removeChild(jsNodes[i]);
            } catch (ex) {
            }
          }
          // 删除旧的css节点
          for (var i = 0; root.hasChildNodes() && i < cssNodes.length; i++) {
            try {
              root.removeChild(cssNodes[i]);
            } catch (ex) {
            }
          }
          // 设置html内容
          if (htmlNode) {
            // 替换html节点
            htmlNode.innerHTML = data;
            cite.el = htmlNode;
          } else {
            // 创建新的node节点
            var newHtmlNode = document.createElement('div');
            newHtmlNode.innerHTML = data;
            cite.el = newHtmlNode;
            // 新增html节点
            root.appendChild(newHtmlNode);
          }
          // 设置seed 属性
          cite.el.setAttribute(vmSeedAttr, vmGetSeedId());
          // 调用回调函数
          callback(0, exports, root);
        }, args);
      });
    };

    /**
     * 替换加载
     *
     * @param id
     * @param route
     * @param cite
     * @param router
     * @param callback
     * @param root
     */
    ViewMountHandler.prototype.append = function (id, route, cite, router, callback, root) {
      var libs = [];
      // 1、加入css
      if (route.css) {
        libs = libs.concat(route.css.split(','));
      }
      // 2、加入js
      if (route.js) {
        libs = libs.concat(route.js.split(','));
      }
      // 获取html资源
      yufp.require.get(route.html, function (code, data) {
        // 正常返回
        if (code != 0) {
          yufp.logger.error('加载html资源失败');
          router.eventChain.fire();
          return;
        }
        var view = document.createElement('div');
        view.classList.add('yu-view');
        view.classList.add('yu-view-hide');
        root.appendChild(view);
        // 数组参数
        var args = {
          'cssPoint': view,
          'jsPoint': view
        };
        // 加载css和js
        yufp.require.require(libs, function () {
          var args = arguments;
          // 获取export函数
          var exports;
          for (var i = 0; i < args.length; i++) {
            if (yufp.type(args[i]) === 'object') {
              exports = args[i];
              break;
            }
          }
          if (exports && exports.mount) {
            // 执行过滤器
            router.doFilters(yufp.core.FilterType.Mount, id, cite);
            // 执行mount方法
            try {
              exports.mount(id, cite);
            } catch (ex) {
              yufp.logger.error(ex.Message, ex);
            }
          }

          // 创建新的node节点
          var newHtmlNode = document.createElement('div');
          newHtmlNode.style = 'height: 100%;';
          // 记录el
          cite.el = newHtmlNode;
          // 设置seed 属性
          cite.el.setAttribute(vmSeedAttr, vmGetSeedId());
          // 设置html内容
          newHtmlNode.innerHTML = data;
          // 新增html节点
          view.appendChild(newHtmlNode);
          // 调用回调函数
          callback(0, exports, view);

          // 动画完成才调用函数
          setTimeout(function () {
            view.classList.remove('yu-view-hide');
            view.classList.add('yu-view-anim-slidein-right');
          }, 3);
        }, args);
      });
    };

    /**
     * 加载
     *
     * @param id
     * @param route
     * @param cite
     * @param router
     * @param callback
     */
    ViewMountHandler.prototype.mount = function (id, route, cite, router, callback) {
      // 获取root id
      var rootId = cite.rootId;
      // 获取root节点
      var root = document.getElementById(rootId);

      if (cite.options && cite.options.openPolicy === yufp.core.OpenPolicy.Append) {
        this.append(id, route, cite, router, callback, root);
      } else {
        this.replace(id, route, cite, router, callback, root);
      }
    };
    /**
     * 卸载
     *
     * @param id
     * @param route
     * @param rootId
     * @param cite
     * @param exports
     * @param router
     */
    ViewMountHandler.prototype.unMount = function (id, route, cite, exports, router) {
      var vsid = cite.el.getAttribute(vmSeedAttr);
      // 准备待销毁的vue实例对象
      var vm = vsid !== undefined ? vmStorageRemove(vsid) : null;
      if (cite.options && cite.options.openPolicy == yufp.core.OpenPolicy.Append) {
        try {
          var node = cite.root;
          node.classList.remove('yu-view-anim-slidein-right');
          node.classList.add('yu-view-anim-slideout-right');
        } finally {
          setTimeout(function () {
            node.parentNode.removeChild(node);
            vm ? vm.$destroy() : 0;
          }, duration);
        }
      } else {
        vm ? vm.$destroy() : 0;
      }

      // 执行过滤器
      router.doFilters(yufp.core.FilterType.UnMount, id, cite);
      // 执行unMount方法
      if (exports.unMount) {
        try {
          exports.unMount(id, cite);
        } catch (ex) {
          yufp.logger.error(ex.Message, ex);
        }
      }
    };
    return ViewMountHandler;
  }());
  // 加入mount handler
  yufp.router.addMountHandler('default', new ViewMountHandler());
}(yufp, yufp.$, 300, Vue));