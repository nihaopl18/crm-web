/**
 * @Created by taoting1 taoting1@yusys.com.cn on 2019-1-4 14:31:12.
 * @updated by
 * @description 客户网络关系
 */
yufp.require.require([
  './libs/jsPlumb/css/jsPlumbToolkit-defaults.css',
  './libs/jsPlumb/css/jsPlumbToolkit-demo.css',
  './themes/default/font_project/iconfont.css',
  './pages/crmsys/custGeneralManager/custNetRelation/flowTempDesign1.css',
  './libs/swiper/idangerous.swiper.css'
]);
define(['jquery',
  './libs/jsPlumb/js/jsPlumb.js',
  './libs/swiper/idangerous.swiper.min.js',
  './custom/widgets/js/custRelaDesign.js', // 关系图组件
  './libs/vuedraggble/sortable.js',
  './libs/vuedraggble/vuedraggable.min.js',
  './libs/js-xlsx/xlsx.full.min.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CD0016,RELA_NAME');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          addButton: !yufp.session.checkCtrl('add'),
          delButton: !yufp.session.checkCtrl('del'),
          updButton: !yufp.session.checkCtrl('upd'),
          viewButton: !yufp.session.checkCtrl('view'),
          // 后端接口
          dataUrl: backend.adminService + '/api/ocrmfcinetworkrela/list',
          // dataUrl: '/trade/example/list',
          formdata: {},
          edit: false,
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          containerKey: false,
          saveBtnShow: true
        };
      },
      methods: {
        // 日期格式化(年月日)
        dateFormatterSimple: function (row, column) {
          var datetime = row[column.property];
          if (datetime === undefined) {
            return '';
          }
          return yufp.util.dateFormat(datetime, '{y}-{m}-{d}');
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
          _this.$refs.refTable.remoteData();
        },
        // /**
        //  * 保存
        //  */
        // saveFn: function () {
        //   var _this = this;
        //   var model = {};
        //   yufp.clone(_this.formdata, model);
        //   var validate = false;
        //   _this.$refs.refForm.validate(function (valid) {
        //     validate = valid;
        //   });
        //   if (!validate) {
        //     return;
        //   }
        //   if (_this.viewType === 'ADD' && model.id == undefined) {
        //     delete model.id;
        //   }
        //   // 向后台发送保存请求
        //   yufp.service.request({
        //     method: 'POST',
        //     url: backend.adminService + '/api/ocrmfcinetworkrela/add',
        //     data: model,
        //     callback: function (code, message, response) {
        //       if (code == '0' && response.code == 0) {
        //         _this.$refs.refTable.remoteData();
        //         _this.$message('操作成功');
        //         _this.dialogVisible = false;
        //       } else {
        //         _this.$message.error('操作失败');
        //       }
        //     }
        //   });
        // },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.saveBtnShow = editable;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.formdata = {
            networkRelaId: '',
            networkRelaName: '',
            remark: ''
          };
          _this.containerKey = new Date().getTime() + '';// // 问了能每次打开的时候都去重新刷新页面内容
        },
        /**
         * 修改
         */
        modifyFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var obj = _this.$refs.refTable.selections[0];
          if (obj.createUser != yufp.session.userCode) {
            _this.$message({ message: '只能修改自己创建的数据！', type: 'warning' });
            return;
          }
          _this.switchStatus('EDIT', true);

          yufp.clone(obj, _this.formdata);
          _this.containerKey = new Date().getTime() + '';// // 问了能每次打开的时候都去重新刷新页面内容
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }

          _this.switchStatus('DETAIL', false);
          yufp.clone(selectionsAry[0], this.formdata);
          _this.containerKey = new Date().getTime() + '';// // 问了能每次打开的时候都去重新刷新页面内容
          // _this.$nextTick(function () {
          //   _this.$refs.refForm.resetFields();
          //   yufp.clone(selectionsAry[0], this.formdata);
          // });
        },
        /**
         * 删除
         */
        deleteFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            if (selections[i].createUser != yufp.session.userCode) {
              _this.$message({ message: '只能修改自己创建的数据！', type: 'warning' });
              return;
            } else {
              arr.push(selections[i].networkRelaId);
            }
          }
          _this.$confirm('此操作将永久删除所选网络关系, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.adminService + '/api/ocrmfcinetworkrela/del?networkRelaId=' + arr.join(','),
                  // data: {
                  //   networkRelaId: arr.join(',')
                  // },
                  callback: function (code, message, response) {
                    if (response.code === 0) {
                      _this.$refs.refTable.remoteData();
                    }
                    _this.$message(response.message);
                  }
                });
              }
            }
          });
        }
      }
    });
  };
});