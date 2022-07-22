/**
 * @Created by houyx3 houyx3@yusys.com.cn on 2022-5-10 14:59:05.
 * @updated by
 * @description 团队业绩结果
 */
define([
  './custom/widgets/js/yufpSchemeSelector.js',
  './custom/widgets/js/YufpTeamSelector.js',
  './custom/widgets/js/yufpMktSelectors.js',
  './custom/widgets/js/yufpSchemeTeamSelectors.js',
  './custom/widgets/js/yufpSchemeOrgSelectors.js',
  './custom/widgets/js/yufpSchemeTeamSelectorsOrg.js'

], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('SCHEME_CYCLE_TYPE,OBJ');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          rule: [
            { required: true, message: '字段不能为空', trigger: 'blur' }
          ],
          indexOptions: [],
          queryIndexOptions: [],
          hasDataFlag: false,
          action: yufp.service.getUrl({ url: '/api/pmafassesstarget/importExcel' }),
          uploadHeaders: {
            'Authorization': 'Bearer ' + yufp.service.getToken()
          },
          uploadData: {
            bussType: "",
          },
          xtableShow: false,
          viewBtn: !yufp.session.checkCtrl('view'),
          importShow: false,
          currentQueryEvlObjType: '',
          queryMgrObjType: true,
          queryTeamObjType: true,
          queryOrgObjType: true,
          indexFlag: true,
          queryindexFlag: true,
          mgrObjType: true,
          teamObjType: true,
          orgObjType: true,
          currentCycleType: '',
          currentSchemeId: '',
          currentQuerySchemeId: '',
          exportSchemeId: '',
          currentEvlObjType: '',
          exportDialogVisible: false,
          dataUrl: backend.appBaseService + '/api/pmafassesstarget/getList',
          formdata: {},
          exportformdata: {},
          quoteSchemeSelParams: {

          },
          queryMktParams: {
            schemeId: ''
          },
          queryParams:{
            schemeId: ''
          }
        };
      },
      computed: {
      },
      watch: {
        currentSchemeId: function (val) {
          this.queryMktParams.schemeId = this.currentSchemeId;
          if (val) {
            var _this = this;
            _this.exportformdata.indexIds = [];
            _this.indexOptions = [];
            var param = {};
            param.objType = _this.currentEvlObjType;
            param.schemeId = _this.currentSchemeId;
            yufp.service.request({
              method: 'GET',
              url: '/api/pmafperformanceresult/getIndexList',
              data: {
                condition: JSON.stringify(param)
              },
              callback: function (code, message, response) {
                if (response.code == 0) {
                  var data = response.data;
                  for(var i = 0; i < data.length; i++){
                    var indexObj = {};
                    indexObj.key = data[i].indexId;
                    indexObj.value = data[i].indexName;
                    _this.indexOptions.push(indexObj);
                  }
                  _this.indexFlag = false;
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          }
        },
        currentQuerySchemeId: function (val) {
          this.queryParams.schemeId = this.currentSchemeId;
          if (val) {
            var _this = this;
            _this.queryIndexOptions = [];
            var param = {};
            param.objType = _this.currentQueryEvlObjType;
            param.schemeId = _this.currentQuerySchemeId;
            yufp.service.request({
              method: 'GET',
              url: '/api/pmafperformanceresult/getIndexList',
              data: {
                condition: JSON.stringify(param)
              },
              callback: function (code, message, response) {
                if (response.code == 0) {
                  var data = response.data;
                  for(var i = 0; i < data.length; i++){
                    var indexObj = {};
                    indexObj.key = data[i].indexId;
                    indexObj.value = data[i].indexName;
                    _this.queryIndexOptions.push(indexObj);
                  }
                } else {
                  _this.$message({ message: response.message, type: 'warning' });
                }
              }
            });
          }
        }
      },
      methods: {
        // 选择导出方案
        selectSchemeFn: function (data) {
          this.currentEvlObjType = data[0].evlObjType;
          this.exportSchemeId = data[0].id;
          this.currentSchemeId = data[0].schemeId;
          if (this.currentEvlObjType == '01') {
            this.mgrObjType = false;
            this.teamObjType = true;
            this.orgObjType = true;
            this.exportformdata.mgrIds = "";
          } else if (this.currentEvlObjType == '04') {
            this.teamObjType = false;
            this.mgrObjType = true;
            this.orgObjType = true;
            this.exportformdata.teamIds = "";
          } else if (this.currentEvlObjType == '02') {
            this.orgObjType = false;
            this.mgrObjType = true;
            this.teamObjType = true;
            this.exportformdata.orgIds = "";
          }
        },
        // 选择查询方案
        querySchemeFn: function (data) {debugger
          this.currentCycleType = data[0].schemeCycleType;
          this.currentQueryEvlObjType = data[0].evlObjType;
          this.currentQuerySchemeId = data[0].schemeId;
          if (this.currentQueryEvlObjType == '01') {
            this.formdata.objIds = '';
            this.queryMgrObjType = false;
            this.queryTeamObjType = true;
            this.queryOrgObjType = true;
          } else if (this.currentQueryEvlObjType == '04') {
            this.formdata.objIds = '';
            this.queryTeamObjType = false;
            this.queryMgrObjType = true;
            this.queryOrgObjType = true;
          } else if (this.currentQueryEvlObjType == '02') {
            this.formdata.objIds = '';
            this.queryOrgObjType = false;
            this.queryMgrObjType = true;
            this.queryTeamObjType = true;
          }
          this.queryindexFlag = false;
        },

        // 查询
        queryFn: function () {
          var _this = this;
          if (_this.formdata.schemeId) {
            // _this.$refs.refTable.setHiddenColumns("yearValue,fhyValue,shyValue,q1Value,q2Value,q3Value,q4Value,m1Value,m2Value,m3Value,m4Value,m5Value,m6Value,m7Value,m8Value,m9Value,m10Value,m11Value,m12Value");
            if (_this.currentCycleType == 'Y') {
              _this.$refs.refTable.setShowColumns("yearValue");
              _this.$refs.refTable.setHiddenColumns("fhyValue,shyValue,q1Value,q2Value,q3Value,q4Value,m1Value,m2Value,m3Value,m4Value,m5Value,m6Value,m7Value,m8Value,m9Value,m10Value,m11Value,m12Value");
            } else if (_this.currentCycleType == 'HY') {
              _this.$refs.refTable.setShowColumns("fhyValue,shyValue");
              _this.$refs.refTable.setHiddenColumns("yearValue,q1Value,q2Value,q3Value,q4Value,m1Value,m2Value,m3Value,m4Value,m5Value,m6Value,m7Value,m8Value,m9Value,m10Value,m11Value,m12Value");
            } else if (_this.currentCycleType == 'Q') {
              _this.$refs.refTable.setShowColumns("q1Value,q2Value,q3Value,q4Value");
              _this.$refs.refTable.setHiddenColumns("yearValue,fhyValue,shyValue,m1Value,m2Value,m3Value,m4Value,m5Value,m6Value,m7Value,m8Value,m9Value,m10Value,m11Value,m12Value");
            } else if (_this.currentCycleType == 'M') {
              _this.$refs.refTable.setShowColumns("m1Value,m2Value,m3Value,m4Value,m5Value,m6Value,m7Value,m8Value,m9Value,m10Value,m11Value,m12Value");
              _this.$refs.refTable.setHiddenColumns("yearValue,fhyValue,shyValue,q1Value,q2Value,q3Value,q4Value");
            }
            _this.queryMothed();
          } else {
            _this.$message({ message: "请选择考核方案", type: 'warning' });
          }
        },
        // 重置查询
        resetFn: function () {
          this.$refs.refForm.resetFields();
          this.queryMgrObjType = true;
          this.queryTeamObjType = true;
          this.queryOrgObjType = true;
          this.queryindexFlag = true;
        },
        inportExcel: function () {
          var _this = this;
          _this.importShow = true;
        },
        // 导出
        exportExcel: function () {
            var _this = this;
            _this.$nextTick(function () {
                _this.$refs['exportForm'].resetFields();
            });
            
            this.mgrObjType = true;
            this.teamObjType = true;
            this.orgObjType = true;
            this.indexFlag = true;
          this.exportDialogVisible = true;
        },
        //确认导出
        exportFn: function () {
          
          var _this = this;
          var objIds = "";
          var validate = false;
          _this.$refs.exportForm.validate(function (valid) {
            validate = valid;
          });
          if (!validate) {
            return;
          }
          var _self = _this.$refs.refTable;
          if (this.currentEvlObjType == '01') {
            objIds = _this.exportformdata.mgrIds;
          } else if (this.currentEvlObjType == '04') {
            objIds = _this.exportformdata.teamIds;
          } else if (this.currentEvlObjType == '02') {
            objIds = _this.exportformdata.orgIds;
          }
          var indexIds = _this.exportformdata.indexIds.join(",");
          var years = _this.exportformdata.years.getFullYear();

          var url = backend.appCommonService + '/api/pmafassesstarget/exportExcel?'
            + 'id=' + _this.exportSchemeId + '&' + 'years=' + years + '&' + 'objIds=' + objIds + '&' + 'indexIds=' + indexIds + '&' + 'page=' + _self.page + '&' + 'size=' + _self.size;
          yufp.util.download(url);
          _this.exportDialogVisible = false;

        },
        // 查询方法
        queryMothed: function () {debugger
          var _this = this;
          _this.hasDataFlag = true;
          var param = {};
          yufp.clone(_this.formdata,param);
          param.indexIds = _this.formdata.indexIds.join(",");
          _this.$refs.refTable.remoteData({ condition: JSON.stringify(param) });
        },
        beforeFileUpload: function (file) {
          var index = file.name.lastIndexOf('.');
          var ext = file.name.substr(index + 1);
          if(ext!="xls" && ext!="xlsx"){
              this.$message.error('只能上传excel文档!');
              return false;
          }
          this.uploadData.bussType = this.bussType;
          this.$message({
            message: '文件正在上传中，请稍后...',
            type: 'info'
        });
          this.importShow = false;
      },
      submitUpload: function () {
          this.$refs.upload.submit();
      },
      handleRemove: function (file, fileList) {
          yufp.logger.info(file, fileList);
      },
      handlePreview: function (file) {
          yufp.logger.info(file);
      },
      uploadSuccessFn: function (response) {
          this.importShow = false;
          if(response.code == "0" || response.code == 0){
              this.$message({
                  message: '文件导入成功',
                  type: 'info'
              });
          }else{
              let errMsg = '文件上传错误';
              if(response.message){
                  errMsg += response.message;
              }
              this.$message({
                  message: errMsg,
                  type: 'error'
              });
          }
      },
      uploadErrorFn: function (response) {
          this.$message({
              message: '文件上传错误：'+response.message,
              type: 'warn'
          });
      },
      uploadTimeoutFn: function (event, file) {debugger
          this.$message({
              message: '文件上传超时：'+response.message,
              type: 'warn'
          });
      },
      },
      mounted: function () {
        this.$refs.refTable.setHiddenColumns("yearValue,fhyValue,shyValue,q1Value,q2Value,q3Value,q4Value,m1Value,m2Value,m3Value,m4Value,m5Value,m6Value,m7Value,m8Value,m9Value,m10Value,m11Value,m12Value");
      }
    });
  };
});