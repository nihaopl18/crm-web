/**
 * @Created by 万爽 wanshuang@yusys.com.cn on 2020-1-7 10:00:26.
 * @updated by
 * @description 业绩转移
 */
define([
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/yufpSchemeSelector.js',
  './custom/widgets/js/yufpDySchemeSelector.js',
  './custom/widgets/js/yufpIndexSelector.js',
  './custom/widgets/js/yufpInstuOrg.js',
  './custom/widgets/js/yufpDyOrgTree.js'
], function (require, exports) {
  /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('CRUD_TYPE,NATIONALITY,PUBLISH_STATUS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          ld: Object,
          funCode: '',
          rankCode: '',
          scoreRankMethod: 'asc',
          compRateRankMethod: 'asc',
          titleData: [],
          listData: [],
          isManager: false, // 是否为客户经理，客户经理只能查询自己的数据
          // dataUrl: backend.appBaseService + '/api/commonPerformanceTrans/querylist',
          dataUrl: backend.appBaseService + '/api/pmafschemeindexscoreorgresource/orgAssessSelf',
          scoreDataUrl: backend.appBaseService + '/api/pmafschemeindexscoreorgresource/orgAssessIndexInfo',
          dataUrltwo: backend.appBaseService + '/api/commonPerformanceTrans/queryPerformance',
          formdata: {},
          form: {},
          obj: {
            objType: '03'
          },
          schemeCycle: [],
          scoreData: {},
          dialogVisible: false,
          transData: [],
          colunmNamelist: [],
          datacodeList: '',
          queryList: [],
          indexParams: {},
          dialogVisibleTwo: false,
          model: {
            managerId: yufp.session.userId
          },
          formDataTwo: {},
          orgTreeParams: {
            needCheckbox: true,
            checkStrictly: true
          },
          rule: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '数字', trigger: 'blur' }
          ],
          optionsA: [],
          options1: [
            { key: 'asc', value: '升序' },
            { key: 'desc', value: '降序' }
          ],
          options2: [
            { key: 'asc', value: '升序' },
            { key: 'desc', value: '降序' }
          ],
          rankOptions: [
            { key: 'desc', value: '降序' },
            { key: 'asc', value: '升序' }
          ],
          orgUserTreeParams: {
            needCheckbox: true,
            checkStrictly: true,
            checkboxVal: true,
            lazy: true
          },
          orgUserTreeParamsTwo: {
            needCheckbox: false,
            checkStrictly: false,
            checkboxVal: false,
            lazy: true
          },
          params: {},
          scoreParams: {},
          dataAuth: '',
          tableColList: [], // 导出使用，业绩对应的表头信息
          dialogtwo_loading: true,
          loading: false
        };
      },
      mounted: function () {
        var _this = this;
        console.log('yufp.session', yufp.session);
      },
      watch: {
        // dialogVisibleTwo: function (val) {
        //     var _this = this;
        //     if (val) {
        //         _this.transData = [];
        //         yufp.service.request({
        //             method: 'GET',
        //             url: '/api/commonPerformanceTrans/queryPerformance',
        //             data: {
        //                 condition: JSON.stringify({
        //                     funCode: _this.$refs.refQuery.formdata.funCode,
        //                     dataAuth: _this.dataAuth,
        //                     managerId: _this.$refs.refTable.selections[0].managerId,
        //                     orgId: _this.$refs.refQuery.formdata.orgId,
        //                     openDateStart: _this.$refs.refQuery.formdata.openDateStart,
        //                     openDateEnd: _this.$refs.refQuery.formdata.openDateEnd
        //                 })
        //             },
        //             callback: function (code, message, response) {
        //                 _this.transData = response.data;
        //                 _this.dialogtwo_loading = false;
        //             }
        //         });
        //     } else {
        //         _this.dialogtwo_loading = true;
        //     }
        // }
      },
      methods: {
        loadedHandler: function () {
          var _this = this;
          // _this.loading.close();
        },
        scoreSearchFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var selectData = _this.$refs.refTable.selections[0];
          console.log('selectData', selectData);
          // console.log(_this.scoreRankMethod, _this.compRateRankMethod);
          let model = {};
          yufp.clone(_this.$refs['scoreRefForm'].formdata, model);
          model.scoreRankMethod = _this.scoreRankMethod;
          model.compRateRankMethod = _this.compRateRankMethod;
          model.schemeId = selectData.schemeId;
          model.schemeCycle = selectData.schemeCycle;
          model.orgId = selectData.orgCode;

          var scoreParams = { condition: JSON.stringify(model) };
          _this.$refs.scoreRefTable.remoteData(scoreParams);
          // yufp.service.request({
          //     method: 'POST',
          //     url: backend.appBaseService + '/api/pmafschemeindexscoremgr/mgrAssessIndexInfo',
          //     data: model,
          //     callback: function (code, message, response) {

          //     }
          // });
        },
        scoreResetFn: function () {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs['scoreRefForm'].resetFields();
          });
        },
        searchFn: function () {
          var _this = this;
          _this.$refs['refQuery'].validate(function (valid) {
            if (valid) {
              // 显示loading
              // var options = {
              //     target: cite.el, // Loading 需要覆盖的 DOM 节点
              //     body: false, // 遮罩是否插入至 DOM 中的 body 中，true: 插入，false: 不插入，
              //     fullscreen: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
              //     text: '拼命加载中', // 显示在加载图标下方的加载文案
              //     customClass: 'trans-class' // Loading 的自定义类名
              // };
              // _this.loading = _this.$loading(options);
              var roles = yufp.session.roles;
              let model = {};
              console.log('formdata', _this.$refs['refQuery'].formdata);
              yufp.clone(_this.$refs['refQuery'].formdata, model);
              if (_this.schemeCycle.length > 0) {
                model.startTime = _this.schemeCycle[0];
                model.endTime = _this.schemeCycle[1];
              }
              var param = { condition: JSON.stringify(model) };
              _this.$refs.refTable.remoteData(param);
            } else {
              return;
            }
          });
        },
        // 重置按钮
        resetFn: function () {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs.refQuery.resetFields();
            // _this.$refs['refQuery'].resetFields();
          });
        },
        // 导出按钮fn
        downloadFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length > 0) { // 导出选中数据
            var dataIds = [];
            var selectData = _this.$refs.refTable.selections;
            for (var i = 0; i < selectData.length; i++) {
            //   var obj = {};
            //   obj.orgCode = selectData[i].orgCode;
            //   obj.orgName = selectData[i].orgName;
            //   obj.schemeCycle = selectData[i].schemeCycle;
            //   obj.schemeId = selectData[i].schemeId;
            //   obj.schemeName = selectData[i].schemeName;
            //   obj.totalScore = selectData[i].totalScore;
            //   obj.totalScoreRank = selectData[i].totalScoreRank;
              dataIds.push(selectData[i].id);
            }
            var reqData = 'dataIds=' + encodeURIComponent(dataIds.join(','));
            yufp.util.download('/api/pmafschemeindexscoreorgresource/orgAssessExportExcelAll?' + reqData);
          } else { // 导出全量
            let reqData = '';
            let validate = true;
            _this.$refs['refQuery'].validate(function (valid) {
              if (valid) {
                var formdata = {};
                yufp.clone(_this.$refs.refQuery.formdata, formdata);
                if (_this.schemeCycle.length > 0) {
                  reqData = 'startTime=' + encodeURIComponent(_this.schemeCycle[0]);
                  reqData = reqData + '&endTime=' + encodeURIComponent(_this.schemeCycle[1]) + '&';
                }
                reqData = reqData + 'schemeId=' + encodeURIComponent(formdata.schemeId) + '&orgId=' + encodeURIComponent(formdata.orgId) + '&rankMethod=' + encodeURIComponent(formdata.rankMethod);
              } else {
                validate = false;
                return;
              }
            });
            if (validate) {
              yufp.util.download('/api/pmafschemeindexscoreorgresource/orgAssessExportExcelAll?' + reqData);
            }
          }
        },
        changeFn: function (val) {
          var _this = this;
          yufp.service.request({
            method: 'GET',
            url: '/api/metafunctionmanager/getmetafuninfo',
            data: { funCode: val },
            callback: function (code, message, response) {
              _this.funCode = val;
              _this.makeDynamicFields(response.data, val);
              var list = yufp.util.getList(response.data);
              _this.queryList = list.queryList;
              _this.colunmNamelist = list.colunmNamelist;
              _this.datacodeList = list.datacodeList;
              if (_this.datacodeList != '' || _this.datacodeList != undefined) {
                yufp.lookup.reg(_this.datacodeList);
              }
              _this.dataAuth = list.dataAuth;
              _this.params = {
                condition: JSON.stringify({
                  dataAuth: list.dataAuth
                })
              };
            }
          });
        },
        rankChangeFn: function (val) {
          // console.log('val', val)
        },
        // 关闭遮罩
        closeLd: function () {
          this.ld.close();
        },
        /**
                 * 取消
                 */
        cancelFn: function () {
          var _this = this;
          _this.$refs.scoreRefForm.resetFields();
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
        },
        /**
                 * 业绩结果
                 */
        performanceFn: function () {
          var _this = this;
          if (_this.$refs.refTable.selections.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var selectData = _this.$refs.refTable.selections[0];
          _this.dialogVisibleTwo = true;
          var _self = _this.$refs['refQuery'];
          // _this.$refs['refQuery'].formdata
          console.log('_this.$refs.refTableResult', _self);
          var formdata = {};
          formdata.schemeId = selectData.schemeId;
          formdata.orgId = selectData.orgCode;
          yufp.service.request({
            method: 'GET',
            url: '/api/pmafperformanceresult/getListTitle',
            data: {
              condition: JSON.stringify(formdata)
            },
            callback: function (code, message, response) {
              if (response.code == 0) {
                _this.titleData = [].concat(response.data);
                yufp.service.request({
                  method: 'GET',
                  url: '/api/pmafperformanceresult/getListByOrg',
                  data: {
                    condition: JSON.stringify(formdata),
                    page: _self.page,
                    size: _self.size
                  },
                  callback: function (code, message, response) {
                    if (response.code == 0) {
                      _this.titleData = response.data.titleFiled;
                      _this.listData = response.data.resultList;
                    } else if (response.code == -9) {
                      _this.$message({ message: response.message, type: 'warning' });
                    } else {
                      _this.$message({ message: response.message, type: 'error' });
                    }
                  }
                });
              } else {
                _this.$message({ message: response.message, type: 'error' });
              }
            }
          });
        },
        /**
                 * 评分详情
                 **/
        detailFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          _this.indexParams.schemeId = selectionsAry[0].schemeId;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请先选择一条记录', type: 'warning' });
            return;
          }
          var selectData = selectionsAry[0];
          console.log('selectData', selectData);
          let model = {};
          _this.dialogVisible = true;

          // 查询数据
          _this.$nextTick(function () {
            yufp.clone(_this.$refs['scoreRefForm'].formdata, model);
            model.scoreRankMethod = _this.scoreRankMethod;
            model.compRateRankMethod = _this.compRateRankMethod;
            model.schemeId = selectData.schemeId;
            model.schemeCycle = selectData.schemeCycle;
            model.orgId = selectData.orgCode;
            var scoreParams = { condition: JSON.stringify(model) };
            _this.$refs.scoreRefTable.remoteData(scoreParams);
          });


          _this.$nextTick(function () {
            _this.$refs.scoreRefForm.resetFields();
          });
        }
      }
    });
  };
});