/**
 * @Created by 宋雨 songyu4@yusys.com.cn on 2019-1-17 14:31:58.
 * @updated by
 * @description 对公客户基本信息
 */
define(['./libs/js-xlsx/xlsx.full.min.js',
  './custom/widgets/js/yufpRoleSelector.js',
  './libs/jsencrypt/jsencrypt.min.js',
  './custom/widgets/js/yufpDptTree.js',
  './custom/widgets/js/yufpExtTree.js'], function (require, exports) {
  /**
    * 页面加载完成时触发
    * @param hashCode 路由ID
    * @param data 传递数据对象
    * @param cite 页面站点信息
    */
  exports.ready = function (hashCode, data, cite) {
    var custId = data.custId;// 获取客户id
    var flagImport = false;
    var flagRelat = false;
    var flagRelation = false;
    var flagManage = false;
    var lookupCodes = 'CD0050';
    yufp.lookup.reg('CD0446,CD0447,CD0288,CD0238,CD0281,CD0071,CD0011,CD0019,CD0026,CD0206,CD0028,CD0050,CD0279,CD0280,CD0126,CD0034,CD0052,CD0282');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          saveBtn: !yufp.session.checkViewCtrl('save', data.id),
          hisBtn: !yufp.session.checkViewCtrl('his', data.id),
          expandCollapseName: ['base'],
          imageUrl: '',
          baseformdata: {}, // 基本信息
          importformdata: {}, // 重要标志信息
          relatformdata: {}, // 涉农个性标识信息
          relationformdata: {}, // 与我行的关系信息
          manageformdata: {}, // 与我行的关系信息
          oldBase: {}, // 修改前基本信息
          oldImport: {}, // 修改前重要标志信息
          oldRelation: {}, // 修改前与我行关系
          oldManage: {}, // 修改前经营信息
          hisdialogVisible: false,
          // treeParams: {
          //   placeholder: '行业类型',
          //   needCheckbox: true,
          //   dataUrl: backend.custpersonService + '/api/acrmFciOrgCustBasic/getlookupItem',
          //   dataId: 'lookupItemCode',
          //   dataLabel: 'lookupItemName',
          //   dataPid: 'upCode'
          // },
          hisviewTitle: yufp.lookup.find('CRUD_TYPE', false),
          hisviewType: 'DETAIL',
          hisdataUrl: backend.custpersonService + '/api/acrmFciOrgCustBasic/queryCustUpdateHis/' + custId, // 修改历史查询
          rule: {
            // 基本信息
            certNo: [
              { max: 25, message: '最大长度不超过25个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            insCredCod: [
              { max: 15, message: '最大长度不超过15个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            natTaxRegCode: [
              { max: 25, message: '最大长度不超过15个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            locTaxRegCode: [
              { max: 25, message: '最大长度不超过15个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            totalAssets: [
              { validator: yufp.validator.number, message: '请输入数字' }
            ],
            regAddr: [
              { max: 50, message: '最大长度不超过50个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            legalName: [
              { max: 30, message: '最大长度不超过30个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            realCntr: [
              { max: 40, message: '最大长度不超过40个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            // 重要标志信息
            fexcPrmNo: [
              { max: 25, message: '最大长度不超过25个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            assocName: [
              { max: 100, message: '最大长度不超过100个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            actDesc: [
              { max: 500, message: '最大长度不超过500个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            tsywDesc: [
              { max: 250, message: '最大长度不超过250个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            // 涉农个性标识信息
            amoOfIns: [
              { max: 10, message: '最大长度不超10个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            insurance: [
              { max: 10, message: '最大长度不超10个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            proLoc: [
              { max: 10, message: '最大长度不超10个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            mainBusiVillage: [
              { max: 10, message: '最大长度不超10个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            mainBusiVillageNo: [
              { max: 10, message: '最大长度不超10个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            capitalDemand: [
              { max: 10, message: '最大长度不超10个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            // 与我行的关系
            holdStockAmt: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            // 经营信息
            invType: [
              { max: 250, message: '最大长度不超过250个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            regCapital: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            netAsset: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            premisArea: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            totalAsset: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            debtTotal: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            invenTotal: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            saleTotal: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            profitScale: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            receBal: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            payabBal: [
              { validator: yufp.validator.float, message: '请输入正确的数据' }
            ],
            mainRange: [
              { max: 250, message: '最大长度不超过250个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ],
            partRange: [
              { max: 150, message: '最大长度不超过150个字符', trigger: 'blur' },
              { required: false, message: '字段不能为空', trigger: 'blur' }
            ]
          }
        };
      },
      mounted: function () {
        // 反显页面数据
        var _this = this;
        _this.initPageData();
      },
      methods: {
        /**
         * 表单初始化数据
         */
        // nodeClickFn: function (node, obj, nodeComp) {
        //   // if (node != '') {
        //   //   this.$refs.indusCdTree.key=node.data.id;
        //   //   this.$refs.indusCdTree.value=
        //   // }
        // yufp.lookup.bind('CD0050', function (data) {
        //   var nodesRootId = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        //   for (var i = 0; i < data.length; i++) {
        //     data[i].upindusCd = data[i].key.substring(0, 1);
        //   }
        //   _this.$refs.indusCdTree = data;
        // });
        // },
        // treeClick: function () {
        //   var _this = this;
        //   _this.treeParams = {
        //     placeholder: '行业类型',
        //     needCheckbox: true,
        //     dataUrl: backend.remindService + '/api/adminsmlookupitem/weblist?lookupCodes=CD0050',
        //     dataId: 'key',
        //     dataLabel: 'value',
        //     dataPid: 'upTypeId'
        //   };
        // },
        changeCollapse: function (item) {
          var _this = this;
          for (var i = 0; i < item.length; i++) {
            if (item[i] === 'relat') {
              if (!flagRelat) {
                yufp.service.request({ // 查询涉农个性标识信息
                  method: 'GET',
                  url: backend.custorgService + '/api/ocrmfciorgrelatinfo/querylist/' + custId,
                  callback: function (code, message, response) {
                    if (code == 0) { // code等于0 说明成功
                      flagRelat = true;
                      _this.relatformdata.custId = custId;
                      yufp.clone(response.data[0], _this.$refs.relatForm.formdata);
                    }
                  }
                });
              }
            }
            if (item[i] === 'relation') {
              if (!flagRelation) {
                yufp.service.request({ // 查询与我行关系信息
                  method: 'GET',
                  url: backend.custorgService + '/api/acrmFciOrgCustBasic/querylist/' + custId,
                  callback: function (code, message, response) {
                    if (code == 0) { // code等于0 说明成功
                      flagRelation = true;
                      _this.relationformdata.custId = custId;
                      yufp.clone(response.data[0], _this.$refs.relationForm.formdata);
                      yufp.clone(_this.$refs.relationForm.formdata, _this.oldRelation);
                    }
                  }
                });
              }
            }
            if (item[i] === 'manage') {
              if (!flagManage) {
                yufp.service.request({ // 查询经营信息
                  method: 'GET',
                  url: backend.custorgService + '/api/ocrmfciorgmanageinfo/querylist/' + custId,
                  callback: function (code, message, response) {
                    if (code == 0) { // code等于0 说明成功
                      flagManage = true;
                      _this.manageformdata.custId = custId;
                      yufp.clone(response.data[0], _this.$refs.manageForm.formdata);
                      yufp.clone(_this.$refs.manageForm.formdata, _this.oldManage);
                    }
                  }
                });
              }
            }
            if (item[i] === 'import') {
              if (!flagImport) {
                yufp.service.request({ // 查询重要标志信息
                  method: 'GET',
                  url: backend.custorgService + '/api/acrmfciorgkeyflag/querylist/' + custId,
                  callback: function (code, message, response) {
                    if (code == 0) { // code等于0 说明成功
                      _this.importformdata.custId = custId;
                      flagImport = true;
                      yufp.clone(response.data[0], _this.$refs.importForm.formdata);
                      yufp.clone(_this.$refs.importForm.formdata, _this.oldImport);
                    }
                  }
                });
              }
            }
          }
        },
        initPageData: function () {
          var _this = this;
          yufp.service.request({ // 查询基础信息
            method: 'GET',
            url: backend.custorgService + '/api/acrmFciOrgCustBasic/querylist/' + custId,
            callback: function (code, message, response) {
              if (code == 0) { // code等于0 说明成功
                _this.baseformdata.custId = custId;
                response.data[0].indusCd = response.data[0].indusCd.substr(0, 1);
                yufp.clone(response.data[0], _this.$refs.baseForm.formdata);
                yufp.clone(_this.$refs.baseForm.formdata, _this.oldBase);
              }
            }
          });
        },
        /**
         * 修改历史
         */
        /**
         * 保存
         */
        saveFn: function () {
          var _this = this;
          var baseinfomodel = {};// 基本信息
          var importmodel = {};// 重要标志信息
          var relatmodel = {};// 涉农个性标识信息
          var managemodel = {};// 涉农个性标识信息

          _this.baseformdata.custBankRel = _this.relationformdata.custBankRel;
          _this.baseformdata.comRelDgr = _this.relationformdata.comRelDgr;
          _this.baseformdata.beCustDate = _this.relationformdata.beCustDate;
          _this.baseformdata.stockFlg = _this.relationformdata.stockFlg;
          _this.baseformdata.holdStockAmt = _this.relationformdata.holdStockAmt;
          _this.baseformdata.comInitLoanDate = _this.relationformdata.comInitLoanDate;

          yufp.clone(_this.baseformdata, baseinfomodel);
          yufp.clone(_this.importformdata, importmodel);
          yufp.clone(_this.relatformdata, relatmodel);
          // yufp.clone(_this.relationformdata, baseinfomodel);
          yufp.clone(_this.manageformdata, managemodel);

          var validate = false;
          _this.$refs.baseForm.validate(function (valid) {
            validate = valid;
          });
          _this.$refs.importForm.validate(function (valid) {
            validate = valid;
          });
          _this.$refs.relatForm.validate(function (valid) {
            validate = valid;
          });
          _this.$refs.relationForm.validate(function (valid) {
            validate = valid;
          });
          _this.$refs.manageForm.validate(function (valid) {
            validate = valid;
          });

          if (!validate) {
            return;
          }

          // 向后台发送保存请求
          yufp.service.request({
            method: 'POST',
            url: backend.custorgService + '/api/acrmFciOrgCustBasic/save',
            data: baseinfomodel,
            callback: function (code, message, response) {
              if (code == 0) {
                // _this.$refs.refTable.remoteData();
                // _this.$message('操作成功');
              }
            }
          });
          importmodel.custId = custId;
          yufp.service.request({
            method: 'POST',
            url: backend.custorgService + '/api/acrmfciorgkeyflag/save',
            data: {
              'importId': importmodel.importId,
              'importData': JSON.stringify(importmodel)
            },
            callback: function (code, message, response) {
              if (code == 0) {
                // _this.$refs.refTable.remoteData();
                // _this.$message('操作成功');
              }
            }
          });
          // yufp.service.request({
          //   method: 'POST',
          //   url: backend.custorgService + '/api/ocrmfciorgrelatinfo/save',
          //   data: { 'relatmodel': relatmodel, 'custId': custId },
          //   callback: function (code, message, response) {
          //     if (code == 0) {
          //       // _this.$refs.refTable.remoteData();
          //       // _this.$message('操作成功');
          //     }
          //   }
          // });
          yufp.service.request({
            method: 'POST',
            url: backend.custorgService + '/api/ocrmfciorgmanageinfo/save',
            data: managemodel,
            callback: function (code, message, response) {
              if (code == 0) {
                // _this.$refs.refTable.remoteData();
                // _this.$message('操作成功');
              }
            }
          });
          _this.oldBase; // 修改前基本信息
          _this.oldImport; // 修改前重要标志信息
          _this.oldRelation; // 修改前与我行关系
          _this.oldManage; // 修改前经营信息
          // 比对基础信息修改字段
          var baseChange = [];
          for (var key in _this.oldBase) {
            if (baseinfomodel[key] != _this.oldBase[key] && baseinfomodel[key]) {
              var map = {};
              map.chgEngName = key;
              map.chgBefValueValue = _this.oldBase[key];
              map.chgAftValueValue = baseinfomodel[key];
              map.chgChiName = _this.$refs[key].label;
              map.chgBefKeyValue = _this.oldBase[key];
              map.chgAftKeyValue = baseinfomodel[key];
              map.dataCode = _this.$refs[key].dataCode;
              baseChange.push(map);
            }
          }
          var importChange = [];
          for (var key1 in _this.oldImport) {
            if (importmodel[key1] != _this.oldImport[key1] && importmodel[key1]) {
              var map1 = {};
              map1.chgEngName = key1;
              map1.chgBefValueValue = _this.oldImport[key1];
              map1.chgAftValueValue = importmodel[key1];
              map1.chgChiName = _this.$refs[key1].label;
              map1.chgBefKeyValue = _this.oldImport[key1];
              map1.chgAftKeyValue = importmodel[key1];
              map1.dataCode = _this.$refs[key1].dataCode;
              importChange.push(map1);
            }
          }
          // var relatChange = [];
          // for (var key2 in _this.oldRelation) {
          //   if (relatmodel[key] != _this.oldRelation[key2] && relatmodel[key2]) {
          //     var map2 = {};
          //     map.chgEngName = key2;
          //     map.chgBefValueValue = _this.oldRelation[key2];
          //     map.chgAftValueValue = relatmodel[key2];
          //     if (_this.$refs[key2] != null && _this.$refs[key2] != undefined) {
          //       map.chgChiName = _this.$refs[key2].label;
          //       relatChange.push(map2);
          //     }
          //   }
          // }
          var manageChange = [];
          for (var key3 in _this.oldManage) {
            if (managemodel[key3] != _this.oldManage[key3] && managemodel[key3]) {
              var map3 = {};
              map3.chgEngName = key3;
              map3.chgBefValueValue = _this.oldManage[key3];
              map3.chgAftValueValue = managemodel[key3];
              map3.chgChiName = _this.$refs[key3].label;
              map3.chgBefKeyValue = _this.oldManage[key3];
              map3.chgAftKeyValue = managemodel[key3];
              map3.dataCode = _this.$refs[key3].dataCode;
              manageChange.push(map3);
            }
          }
          _this.$message('数据保存成功');
          yufp.service.request({
            method: 'POST',
            url: backend.custpersonService + '/api/acrmFciOrgCustBasic/changelist',
            data: {
              'baseChange': baseChange,
              'importChange': importChange,
              // 'relatChange': relatChange,
              'manageChange': manageChange,
              'custId': custId
            },
            callback: function (code, message, response) {
              if (code == 0) {
                yufp.clone(baseinfomodel, _this.oldBase);
                yufp.clone(importmodel, _this.oldImport);
                yufp.clone(relatmodel, _this.oldRelation);
                yufp.clone(managemodel, _this.oldManage);
                _this.$message('操作成功');
              }
            }
          });
        },
        selectHis: function () {
          var _this = this;
          this.hisdialogVisible = true;
          _this.$nextTick(function () {
            _this.$refs.hisrefTable.remoteData();
          });
        }
      }
    });
  };
});