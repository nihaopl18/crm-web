/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-29
 * @updated by
 * @description 客户群视图
 */
define(function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    var clientInfo = data.clientInfo;
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          // 左侧视图树请求url
          viewUrl: backend.adminService + '/api/ocrmfsysviewauth/selectviewtree',
          // 动态路由id
          viewPageId: 'viewPageId_' + new Date().getTime(),
          async: false,
          viewId: data.id,
          treedata: [],
          dataRoot: {id: '0', label: '全部视图'},
          param: { loginCode: yufp.session.userCode, sysId: yufp.session.logicSys.id },
          height: yufp.frame.size().height,
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          filterNodeids: '',
          // 进入树节点筛选if判断的次数
          index: 1,
          showTree: false
        };
      },
      mounted: function () {
        yufp.session.loadViewCtrls();
      },
      methods: {
        /**
        * 获取树数据
        * @param originalData 未处理过的树数据
        */
        getTreeDataFn: function (originalData) {
          var data = [];
          this.filterNodeids = ',' + this.viewId + ',';
          for (var i = 0, len = originalData.length; i < len; i++) {
            // if (originalData[i].parentId == this.viewId || originalData[i].id == this.viewId) {
            //   data.push(originalData[i]);
            // }
            if (this.filterNodeids.indexOf(',' + originalData[i].id + ',') >= 0 || this.filterNodeids.indexOf(',' + originalData[i].parentId + ',') >= 0) {
              this.filterNodeids += originalData[i].id + ',';
              data.push(originalData[i]);
            }
          }
          this.$nextTick(function () {
            this.$refs.refTree.data = this.$refs.refTree.genTreeData(data);
            this.$refs.refTree.data[0] && this.$refs.refTree.data[0].children && this.$refs.refTree.data[0].children && this.routeToFn(this.$refs.refTree.data[0].children[0]);
          });
        },
        /**
        * 树结构数据加载完成
        */
        treeDataLoadFn: function () {
          this.filterNodeids = ',' + this.viewId + ',';
          this.$refs.refTree.filter(this.viewId);
        },
        /**
        * 递归找到树节点下的第一个叶子节点
        * @param {Array} node 树节点
        * return Boolean 找到叶子节点，返回true
        */
        dealTreeNode: function (node) {
          if (node.childNodes && node.childNodes.length > 0) {
            var childNodes = node.childNodes;
            for (var i = 0, len = childNodes.length; i < len; i++) {
              if (childNodes[i].data.viewAddr || childNodes[i].isLeaf) {
                return {data: childNodes[i].data, node: childNodes[i]};
              } else {
                return this.dealTreeNode(childNodes[i]);
              }
            }
          }
        },
        /**
       * 筛选树节点——此方法会按树节点顺序，深度优先遍历树节点
       * @param value yufp-ext-tree组件的filter()方法传的参数，用于匹配筛选树节点
       * @param {Array} data 树节点数据对象
       * return Boolean 返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
       */
        filterFn: function (value, data, node) {
          if (this.filterNodeids.indexOf(',' + data.id + ',') >= 0 || this.filterNodeids.indexOf(',' + data.parentId + ',') >= 0) {
            this.filterNodeids += data.id + ',';
            // 路由到要展示的节点下的第一个可路由的节点或叶子节点
            if (this.index == 1) {
              this.showTree = true;
              // 如果是叶子节点，并且节点数据有可路由的页面路径
              if (node.isLeaf && data.viewAddr) {
                // 路由到对应页面
                this.routeToFn(node.data);
                // 使当前route页面对应的树节点高亮
                this.$refs.refTree.$children[0].store.currentNode = node;
              } else {
                var rdObj = this.dealTreeNode.call(this, node);
                if (rdObj.data) {
                  this.routeToFn(rdObj.data);
                  // 使当前route页面对应的树节点高亮
                  this.$refs.refTree.$children[0].store.currentNode = rdObj.node;
                }
              }
            }
            this.index++;
            return true;
          } else {
            return false;
          }
        },
        /**
         * 树节点点击处理程序
         */
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          if (nodeData.parentId == '0') {
            return;
          }
          _this.routeToFn(nodeData);
        },
        /**
        * 路由到对应页面
        * @param 信息对象
        */
        routeToFn: function (obj) {
          // 获得树节点中的路由id
          // 分割获得关键字
          var _this = this;
          var routeId = obj.viewItemId;
          yufp.router.addRoute(routeId, { html: obj.viewAddr + '.html', js: obj.viewAddr + '.js' });
          // _this.viewPageId = 'viewPage_' + routeId + new Date().getTime();
          _this.$nextTick(function () {
            var route = yufp.router.getRoute(routeId);
            if (!route) {
              _this.$message({
                showClose: true,
                message: '没有该路由信息',
                type: 'error'
              });
              return;
            }
            try {
              yufp.router.to(routeId, {id: obj.viewItemId, clientInfo: clientInfo, divId: _this.viewPageId}, _this.viewPageId);
            } catch (error) {

            }
          });
        }
      }
    });
  };
});