/**
 * @Created by chenlin chenlin2@yusys.com.cn on 2019-2-26 14:22:11.
 * @updated by
 * @description 商品类别管理
 */
define(['custom/widgets/js/yufpEqucataTree.js'], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('USE_FLAG,CATEGORY_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          instuOption: [],
          height: yufp.frame.size().height,
          treeUrl: '/api/loyqycommoditycategory/categorytree',
          dataUrl: '/api/loyqycommoditycategory/categorylist',
          defaultLoad: false,
          baseParams: {}, // 列表查询参数
          treeNode: '', // 树形节点对象
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          async: false,
          // param: { categoryCode: '0000', categoryLevel: '1' },
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          orgModel: {},
          corpOrg: '',
          catalogParam: {condition: JSON.stringify({
            orgCode: yufp.session.org.code
          }) },
          optionStatus: [
            {key: '1', value: '启用'},
            {key: '2', value: '停用'}
          ]
        };
      },
      mounted: function () {
        var _this = this;
        yufp.service.request({
          url: '/api/loyqycommoditycategory/getinstus',
          method: 'get',
          callback: function (code, message, response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
              _this.instuOption.push(data[i]);
            }
          }
        });
      },
      methods: {
        dateFormatter: function (row, column) {
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
        },
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.formdata, model);
          var validate = false;
          _this.$refs.refForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (model.categoryLevel > 2) {
            _this.$message('目录最多维护两层');
            return;
          }
          var saveUrl = '';
          if (model.id != undefined) {
            saveUrl = '/api/loyqycommoditycategory/update';
          } else {
            saveUrl = '/api/loyqycommoditycategory/';
          }
          model.instuCde = _this.corpOrg || yufp.session.user.instu.code;
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: saveUrl,
            data: model,
            callback: function (code, message, response) {
              _this.$refs.refTable.remoteData();
              _this.$refs.refTree.remoteData();
              _this.$message('操作成功');
              _this.dialogVisible = false;
              _this.treeNode = '';
            }
          });
        },
        /** 点击树节点 */
        selectFn: function (data) {
          if (data != '') {
            this.corpOrg = data;
            this.catalogParam = {condition: JSON.stringify({
              orgCode: data
            }) };
            this.baseParams = {condition: JSON.stringify({
              orgCode: data,
              categoryCode: '0000'
            }) };
            this.$refs.refTable.remoteData(this.baseParams);
          }
        },
        /**
         * 刷新
         */
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          _this.treeNode = nodeData;
          var categoryCode = nodeData.categoryCode;
          _this.baseParams.categoryCode = categoryCode;
          var baseParams = {
            condition: JSON.stringify({
              categoryCode: categoryCode,
              orgCode: _this.corpOrg
            })
          };
          _this.$refs.refTable.remoteData(baseParams);
        },
        /**
         * 控制保存按钮、xdialog、表单的状态
        * @param viewType 表单类型
        * @param editable 可编辑,默认false
        */
        switchStatus: function (viewType, editable) {
          var _this = this;
          _this.viewType = viewType;
          _this.dialogVisible = true;
          _this.formDisabled = !editable;
          _this.saveBtnShow = editable;
          _this.cancelBtnShow = editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          if (_this.treeNode == '') {
            _this.$message({ message: '请选择父类别!', type: 'warning' });
            return false;
          }
          if (_this.treeNode.categoryLevel > 1) {
            _this.$message('目录最多维护两层');
            return;
          }
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.formdata.id = undefined;
            _this.formdata.parentCategoryCode = _this.treeNode.categoryCode;
            _this.formdata.parentCategoryName = _this.treeNode.categoryName;
            _this.formdata.categoryLevel = parseInt(_this.treeNode.categoryLevel) + 1;
          });
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
          _this.switchStatus('EDIT', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.$refs.refForm.formdata = {};
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
          });
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
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(selectionsAry[0], _this.formdata);
          });
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
          _this.$confirm('确认要删除该类别吗?删除该类别将连同子类别一起删除！ 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/loyqycommoditycategory/delcategory',
                  data: selections[0].categoryCode,
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.$refs.refTable.remoteData();
                      _this.$refs.refTree.remoteData();
                      _this.$message('操作成功');
                    } else {
                      _this.$message({ message: response.message, type: 'warning' });
                    }
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