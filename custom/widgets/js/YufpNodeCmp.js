/**
 * 流程表单组件
 */
 (function (vue, $, name) {
  vue.component(name, {
    template: '<el-dialog ref="dialog" :title="title" top="5%" \
      :visible.sync="visible" :size="size" :show-close="showClose"> \
      <div ref="ncmpRef" :id="ncmpPid" style="width:100%;"><div :id="ncmpSid" style="width:100%;"></div></div> \
    </el-dialog>',

    props: {
      /**
       * 组件状态，编辑与否
       */
      editable: String,
      title: String,
      
      showClose: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'large'
      },

      /**
       * 组件输入
       */
      input: Object,
      /**
       * 设计报文
       */
      designBody: {
        type: String,
        required: true
      },
      
      instanceObj: Object,
      instanceId: String,
      nodeId: String,
      nodeName: String
      
    },
    data: function () {
      return {
        cmpVm: null,
        ncmpKey: null,
        ncmpPid: null,
        ncmpSid: null,

        visible: false,
        /**
         * 组件输出
         */
        output: Object
      };
    },
    created: function () {
      this.ncmpKey = new Date().getTime();
      this.ncmpPid = 'ncmp-pid-' + this.ncmpKey;
      this.ncmpSid = 'ncmp-sid-' + this.ncmpKey;
    },
    mounted: function () {
    },
    destroyed: function () {
    },
    watch: {
      visible: function(val) {
        this.buildCmpVm();
      }
    },
    computed: {
    },
    methods: {
      /**
       * public
       * 显示表单组件
       */
      show: function () {
        this.visible = true;
      },
      /**
       * public
       * 关闭表单组件
       */
      close: function () {
        this.visible = false;
      },
      /**
       * private
       * 对象转字符串，支持function转源码
       */
      obj2str: function (obj) {
        var str = JSON.stringify(obj, function(k, v) {
            if (typeof v === 'function') {
                return v.toString();
            }
            return v;
        });
        return str.replace(/\\n\s+/g, '\\n ');
      },
      /**
       * private
       * 字符串转对象，支持源码转function
       */
      str2obj: function (str) {
        return JSON.parse(str, function(k, v) {
          if (v.indexOf && v.indexOf('function') > -1) {
              return eval("(function(){return " + v + " })()");
          }
          return v;
        });
      },
      /**
       * private
       * 构建表单组件内部调用对象
       */
      getNcmpObj: function () {
        var _this = this;
        return {
          show: function () {
            _this.show();
          },
          close: function () {
            _this.close();
          },
          editable: this.editable,
          input: this.input,
          instanceObj: this.instanceObj,
          instanceId: this.instanceId,
          nodeId: this.nodeId,
          nodeName: this.nodeName
        };
      },
      /**
       * private
       * 构建渲染表单组件
       */
      buildCmpVm: function () {
        var _this = this;
        // 若已经存在，先销毁，再构建
        this.destoryCmpVm();
        // 若表单组件执行关闭操作，则销毁，不继续往下执行
        if (!_this.visible || !_this.designBody) {
          return;
        }
        _this.$nextTick(function(){
          try {
            var options = _this.str2obj(_this.designBody);
            //1代码配置，2路由配置
            if (options.isConfig) {
              options.el = '#' + _this.ncmpPid + '>div';
              options.ncmpobj = _this.getNcmpObj()
              _this.cmpVm = yufp.custom.vue(options);
            } else {
              _this.cmpRoute = {
                html: options.customUrl.html,
                js: options.customUrl.js,
                css: options.customUrl.css
              };
              var routeTable = {};
              routeTable['ncmp-'+_this.ncmpKey] = _this.cmpRoute;
              yufp.router.addRouteTable(routeTable);
              yufp.router.to('ncmp-'+_this.ncmpKey, {ncmpobj: _this.getNcmpObj()}, _this.ncmpSid);
            }
          } catch (e) {
            console.log('构建流程表单组件失败！')
          }
        });
      },
      /**
       * private
       * 销毁表单组件
       */
      destoryCmpVm: function () {
        var _this = this;
        if (_this.cmpVm) {
          _this.cmpVm.$destroy();
          _this.cmpVm = null;
          _this.$refs.ncmpRef.innerHTML='<div id="'+_this.ncmpSid+'" style="width:100%;"></div>';
        } else if (_this.cmpRoute) {
          yufp.router.unMount(_this.ncmpSid);
          _this.cmpRoute = null;
          _this.$refs.ncmpRef.innerHTML='<div id="'+_this.ncmpSid+'" style="width:100%;"></div>';
        }
      }
    }
  });
})(Vue, yufp.$, 'yufp-node-cmp');