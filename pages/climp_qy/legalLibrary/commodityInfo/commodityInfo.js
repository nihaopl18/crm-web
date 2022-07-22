/**
 * @Created by chenlin chenlin2@yusys.com.cn on 2019-2-27 19:45:04.
 * @updated by yangxiao2
 * @description 商品管理
 */
define([
  'pages/climp_qy/legalLibrary/commodityInfo/commodityInfo.css',
  'custom/widgets/js/yufpMerchantSelector.js',
  'libs/yufp/widgets/js/YufpWfInit.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('COMMODITY_TYPE,UP_DOWN_STATE,SUIT_OBJ_TYPE,WF_APP_STATUS,IF_FLAG,PICTURE_TYPE');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          instuOption: [],
          height: yufp.frame.size().height,
          treeUrl: backend.qyPoolService + '/api/loyqycommoditycategory/categorytree',
          dataUrl: backend.qyPoolService + '/api/loyqycommodityinfo/commlist',
          saveBtnShow: true,
          cancelBtnShow: true,
          formdata: {},
          baseParams: {},
          async: false,
          categoryCode: '0000',
          // param: { UNITID: '0000', LEVELUNIT: '1' },
          dialogVisible: false,
          formDisabled: false,
          viewType: 'DETAIL',
          viewTitle: yufp.lookup.find('CRUD_TYPE', false),
          commDetail: true,
          commodityCode: '', // 商品编号
          // 商品上架
          shelDialogVisible: false,
          shelFormDisabled: false,
          shelFormdata: {},
          shelTitle: '商品上架',
          // 商品规格开始
          modelDataUrl: backend.qyPoolService + '/api/loyqycommmodel/modellist',
          modelDialogVisible: false,
          modelFormDisabled: false,
          modelSaveBtnShow: true,
          modelFormdata: {},
          modelTitle: '',
          modelParams: { commodityCode: '' },
          // 商品图片开始
          uploadAction: yufp.service.getUrl({url: backend.gatewayService + backend.fileService + '/api/file/provider/uploadfile?access_token=' + yufp.service.getToken()}),
          picDataUrl: backend.qyPoolService + '/api/loyqycommpicture/piclist',
          picDialogVisible: false,
          picFormDisabled: false,
          picSaveBtnShow: true,
          picFormdata: {},
          picTitle: '',
          imageUrl: '',
          picParams: { commodityCode: '' },
          // 库存维护开始
          stgDialogVisible: false,
          totalStgData: {},
          detailStgData: {},
          stgModel: 'stg1',
          // 审批流公共参数
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          orgModel: {},
          corpOrg: '',
          catalogParam: {condition: JSON.stringify({
            orgCode: yufp.session.org.code
          }) }
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
        /** 点击树节点 */
        selectFn: function (data) {
          if (data != '') {
            this.corpOrg = data;
            this.catalogParam = {condition: JSON.stringify({
              orgCode: data
            }) };
            this.baseParams = {
              condition: JSON.stringify({
                categoryCode: '0000',
                instuCde: data,
                orgCode: data
              })
            };
            this.$refs.refTable.remoteData(this.baseParams);
          }
        },
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
          _this.$refs.refTable.remoteData();
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
          var saveUrl = '';
          if (model.id != undefined) {
            saveUrl = backend.qyPoolService + '/api/loyqycommodityinfo/update';
          } else {
            saveUrl = backend.qyPoolService + '/api/loyqycommodityinfo/';
          }
          model.categoryCode = _this.categoryCode;
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: saveUrl,
            data: model,
            callback: function (code, message, response) {
              _this.commodityCode = response.data.commodityCode;
              _this.$message('操作成功');
            }
          });
        },
        /**
         * 刷新
         */
        nodeClickFn: function (nodeData, node, self) {
          var _this = this;
          _this.categoryCode = nodeData.categoryCode;
          _this.baseParams = {
            condition: JSON.stringify({
              categoryCode: nodeData.categoryCode
            })
          };
          _this.$refs.refTable.remoteData(_this.baseParams);
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
          _this.commDetail = editable;
        },
        /**
         * 新增按钮
         */
        addFn: function () {
          var _this = this;
          _this.switchStatus('ADD', true);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
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
            var obj = _this.$refs.refTable.selections[0];
            yufp.clone(obj, _this.formdata);
            var param = {commodityCode: obj.commodityCode};
            _this.$refs.modelTable.remoteData(param);
            _this.$refs.picTable.remoteData(param);
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
        infoClick: function (row) {
          var _this = this;
          _this.switchStatus('DETAIL', false);
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            yufp.clone(row, _this.formdata);
          });
        },
        /**
         * 提交
         */
        submitFn: function () {
          var _this = this;
          var commitData = {};
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          if (selections[0].wfApprSts != '000') {
            _this.$message({message: '只有未审批的商品可以提交', type: 'warning'});
            return;
          }
          commitData.custId = yufp.session.userId;
          commitData.custName = yufp.session.userName;
          commitData.bizSeqNo = selections[0].id;
          commitData.applType = 'SPTJLC';
          var load = _this.$loading();
          _this.$refs.yufpWfInit.wfInit(commitData, load);
        },
        onAfterClose: function () {
          var _this = this;
          _this.$refs.refTable.remoteData();
        },
        /**
        * 库存维护
        */
        stgEditFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.stgDialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.stgForm1.resetFields();
            _this.$refs.stgForm2.resetFields();
            yufp.clone(selections[0], _this.totalStgData);
            var param = {commodityCode: selections[0].commodityCode};
            _this.$refs.modelTable.remoteData(param);
          });
        },
        stgSaveFn: function () {
          var _this = this;
          if (_this.stgModel == 'stg1') {
            // 主库存维护
            var model = {};
            var validate = false;
            _this.$refs.stgForm1.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            yufp.clone(_this.totalStgData, model);
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.qyPoolService + '/api/loyqycommodityinfo/update',
              data: model,
              callback: function (code, message, response) {
                // _this.commodityCode = response.data.commodityCode;
                _this.$message('操作成功');
                _this.$refs.refTable.remoteData();
                _this.stgDialogVisible = false;
              }
            });
          } else if (_this.stgModel == 'stg2') {
            // 库存明细维护
            var demodel = {};
            var validate = false;
            _this.$refs.stgForm2.validate(function (valid) {
              validate = valid;
            });
            if (!validate) {
              return;
            }
            yufp.clone(_this.detailStgData, demodel);
            // 向后台发送保存请求
            yufp.service.request({
              method: 'POST',
              url: backend.qyPoolService + '/api/loyqycommmodel/update',
              data: demodel,
              callback: function (code, message, response) {
                if (_this.formdata.commodityCode != undefined) {
                  var param = {commodityCode: _this.formdata.commodityCode};
                } else {
                  var param = {commodityCode: _this.commodityCode};
                }
                _this.$refs.modelTable.remoteData(param);
                _this.$message('操作成功');
                _this.modelDialogVisible = false;
              }
            });
          } else {
            _this.$message('加载错误');
            _this.stgCancelFn();
          }
        },
        stgCancelFn: function () {
          var _this = this;
          _this.stgDialogVisible = false;
        },
        modelClick: function (row) {
          var _this = this;
          _this.$nextTick(function () {
            yufp.clone(row, _this.detailStgData);
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
          _this.$confirm('此操作将永久删除该数据！是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.qyPoolService + '/api/loyqycommodityinfo/delcommodity',
                  data: selections[0].id,
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        // 商品上架
        onShelFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请选择一条审批通过的下架的数据记录！', type: 'warning' });
            return false;
          }
          var len = selections.length;
          for (var i = 0; i < len; i++) {
            var mCount = selections[i].mCount;
            if (mCount == 0) {
              _this.$message({ message: '该商品没有规格信息，不能上架！', type: 'warning' });
              return false;
            }
            var pCount = selections[i].pCount;
            if (pCount == 0) {
              _this.$message({ message: '该商品没有缩略图(图片)信息，不能提交！', type: 'warning' });
              return false;
            } else if (pCount > 1) {
              _this.$message({ message: '该商品缩略图(图片)超过1张，不能提交！', type: 'warning' });
              return false;
            }
            if (selections[i].upDownState != 'D' && selections[i].wfApprSts != '997') {
            // if (selections[i].upDownState == 'D' && selections[i].wfApprSts == '997') {
              // _this.shelDialogVisible = true;
              // _this.$nextTick(function () {
              //   _this.$refs.shelForm.resetFields();
              //   var obj = _this.$refs.refTable.selections[0];
              //   yufp.clone(obj, _this.shelFormdata);
              // });
            // } else {
              _this.$message({ message: '请选择审批通过的下架的数据记录！', type: 'warning' });
              return false;
            }
          }
          _this.shelDialogVisible = true;
        },
        // 商品上架保存
        shelSaveFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          var model = {};
          yufp.clone(_this.shelFormdata, model);
          var validate = false;
          _this.$refs.shelForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('确定上架吗?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.qyPoolService + '/api/loyqycommodityinfo/doupdateupdown',
                  data: {
                    ids: arr.join(','),
                    onShelfBegin: model.onShelfBegin,
                    onShelfEnd: model.onShelfEnd,
                    upDownState: 'U'
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        // 商品上架取消
        shelCancelFn: function () {
          this.shelDialogVisible = false;
        },
        // 商品下架
        downShelFn: function () {
          var _this = this;
          var selections = _this.$refs.refTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请选择需要下架的数据！', type: 'warning' });
            return false;
          }
          if (selections[0].upDownState == 'D') {
            _this.$message({ message: '请选择上架状态的数据记录！', type: 'warning' });
            return false;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('确定下架吗?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: backend.qyPoolService + '/api/loyqycommodityinfo/doupdateupdown',
                  data: {
                    ids: arr.join(','),
                    upDownState: 'D'
                  },
                  callback: function (code, message, response) {
                    _this.$refs.refTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        // ~~~~~~~~~~~~~~~~~~商品规格开始~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        /**
         * 商品规格取消
         */
        modelCancelFn: function () {
          var _this = this;
          _this.modelDialogVisible = false;
        },
        /**
         * 商品规格保存
         */
        modelSaveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.modelFormdata, model);
          var validate = false;
          _this.$refs.modelForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          if (_this.formdata.commodityCode != undefined) {
            model.commodityCode = _this.formdata.commodityCode;
          } else {
            model.commodityCode = _this.commodityCode;
          }
          var saveUrl = '';
          if (model.id != undefined) {
            saveUrl = backend.qyPoolService + '/api/loyqycommmodel/update';
          } else {
            saveUrl = backend.qyPoolService + '/api/loyqycommmodel/';
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: saveUrl,
            data: model,
            callback: function (code, message, response) {
              if (_this.formdata.commodityCode != undefined) {
                var param = {commodityCode: _this.formdata.commodityCode};
              } else {
                var param = {commodityCode: _this.commodityCode};
              }
              _this.$refs.modelTable.remoteData(param);
              _this.$message('操作成功');
              _this.modelDialogVisible = false;
            }
          });
        },
        /**
         * 商品规格新增按钮
         */
        modelAddFn: function () {
          var _this = this;
          if (_this.commodityCode == '') {
            _this.$message({ message: '请先保存商品信息', type: 'warning' });
            return;
          }
          _this.modelDialogVisible = true;
          _this.modelFormDisabled = false;
          _this.modelSaveBtnShow = true;
          _this.modelTitle = '商品规格新增';
          _this.$nextTick(function () {
            _this.$refs.modelForm.resetFields();
          });
        },
        /**
         * 商品规格修改
         */
        modelModifyFn: function () {
          var _this = this;
          if (_this.$refs.modelTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.modelDialogVisible = true;
          _this.modelFormDisabled = false;
          _this.modelSaveBtnShow = true;
          _this.modelTitle = '商品规格修改';
          _this.$nextTick(function () {
            _this.$refs.modelForm.resetFields();
            var obj = _this.$refs.modelTable.selections[0];
            yufp.clone(obj, _this.modelFormdata);
          });
        },
        /**
         * 商品规格详情
         */
        modelInfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.modelTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.modelDialogVisible = true;
          _this.modelFormDisabled = true;
          _this.modelSaveBtnShow = false;
          _this.modelTitle = '商品规格详情';
          _this.$nextTick(function () {
            _this.$refs.modelForm.resetFields();
            yufp.clone(selectionsAry[0], this.modelFormdata);
          });
        },
        /**
         * 商品规格删除
         */
        modelDeleteFn: function () {
          var _this = this;
          var selections = _this.$refs.modelTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/loyqycommmodel/delmodel',
                  data: {
                    ids: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    _this.$refs.modelTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        /**
         * 默认规格弹窗
         */
        defaultModelFn: function () {
          var _this = this;
          var selections = _this.$refs.modelTable.selections;
          if (selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          yufp.service.request({
            method: 'POST',
            url: '/api/loyqycommmodel/defaultmodel',
            data: selections[0].id,
            callback: function (code, message, response) {
              if (response.code == 0) {
                if (_this.formdata.commodityCode != undefined) {
                  var param = {commodityCode: _this.formdata.commodityCode};
                } else {
                  var param = {commodityCode: _this.commodityCode};
                }
                _this.$refs.modelTable.remoteData(param);
                _this.$message('操作成功');
              }
            }
          });
        },
        // ~~~~~~~~~~~~~~~~~~商品规格结束~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        // ~~~~~~~~~~~~~~~~~~商品图片开始~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        /**
         * 商品图片取消
         */
        picCancelFn: function () {
          var _this = this;
          _this.picDialogVisible = false;
        },
        /**
         * 商品图片保存
         */
        picSaveFn: function () {
          var _this = this;
          var model = {};
          yufp.clone(_this.picFormdata, model);
          if (_this.formdata.commodityCode != undefined) {
            model.commodityCode = _this.formdata.commodityCode;
          } else {
            model.commodityCode = _this.commodityCode;
          }
          var validate = false;
          _this.$refs.picForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: '/api/loyqycommpicture/savepic',
            data: model,
            callback: function (code, message, response) {
              if (_this.formdata.commodityCode != undefined) {
                var param = {commodityCode: _this.formdata.commodityCode};
              } else {
                var param = {commodityCode: _this.commodityCode};
              }
              _this.$refs.picTable.remoteData(param);
              _this.$message('操作成功');
              _this.picDialogVisible = false;
            }
          });
        },
        /**
         * 商品图片新增按钮
         */
        picAddFn: function () {
          var _this = this;
          if (_this.commodityCode == '') {
            _this.$message({ message: '请先保存商品信息', type: 'warning' });
            return;
          }
          _this.picDialogVisible = true;
          _this.picFormDisabled = false;
          _this.picSaveBtnShow = true;
          _this.picTitle = '商品图片新增';
          _this.$nextTick(function () {
            _this.$refs.picForm.resetFields();
          });
        },
        /**
         * 商品图片修改
         */
        picModifyFn: function () {
          var _this = this;
          if (_this.$refs.picTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.picDialogVisible = true;
          _this.picFormDisabled = false;
          _this.picSaveBtnShow = true;
          _this.picTitle = '商品图片修改';
          _this.$nextTick(function () {
            _this.$refs.picForm.resetFields();
            var obj = _this.$refs.picTable.selections[0];
            yufp.clone(obj, _this.picFormdata);
          });
        },
        /**
         * 商品图片详情
         */
        picInfoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.picTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          _this.picDialogVisible = true;
          _this.picFormDisabled = true;
          _this.picTitle = '商品图片详情';
          _this.picSaveBtnShow = false;
          _this.$nextTick(function () {
            _this.$refs.picForm.resetFields();
            yufp.clone(selectionsAry[0], this.picFormdata);
          });
        },
        /**
         * 商品图片删除
         */
        picDeleteFn: function () {
          var _this = this;
          var selections = _this.$refs.picTable.selections;
          if (selections.length < 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var len = selections.length, arr = [];
          for (var i = 0; i < len; i++) {
            arr.push(selections[i].id);
          }
          _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            type: 'warning',
            callback: function (action) {
              if (action === 'confirm') {
                yufp.service.request({
                  method: 'POST',
                  url: '/api/loyqycommpicture/delpic',
                  data: {
                    ids: arr.join(',')
                  },
                  callback: function (code, message, response) {
                    _this.$refs.picTable.remoteData();
                    _this.$message('操作成功');
                  }
                });
              }
            }
          });
        },
        handleAvatarSuccess: function (res, file) {
          var _this = this;
          var url = yufp.settings.ssl ? 'https://' : 'http://';
          url += yufp.settings.url;
          url += backend.fileService;
          url += '/api/file/provider/download?fileId=' + res.data.filePath;
          _this.imageUrl = yufp.util.addTokenInfo(url);
        },
        beforeAvatarUpload: function (file) {
          var isJPG = file.type === 'image/jpeg';
          var isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
        // ~~~~~~~~~~~~~~~~~~商品图片结束~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
    });
  };
});