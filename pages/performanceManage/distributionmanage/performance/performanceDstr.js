/**
 * @Created by 万爽 wanshuang@yusys.com.cn on 2019-12-31 10:32:51.
 * @updated by
 * @description 样例demo
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTree.js',
  './custom/widgets/js/YufpWfInit.js'
], function (require, exports) {
  /**
       * 页面加载完成时触发
       * @param hashCode 路由ID
       * @param data 传递数据对象
       * @param cite 页面站点信息
       */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('APPLY_STS');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        var me = this;
        return {
          userSelectorParams: { // 用户放大镜数据权限使用现场机构号，基地测试需要修改
            org: {
              dataRoot: {
                orgId: yufp.session.org.id,
                orgName: yufp.session.org.name
              },
              dataParams: {
                orgCode: yufp.session.org.code
              }
            },
            user: {
              dataParams: {
                orgCode: yufp.session.org.code
              }
            }
          },
          distrShow: !yufp.session.checkCtrl('distribute'),
          distrDetailShow: !yufp.session.checkCtrl('distributeDetails'),
          etlDate: '',
          dataUrl: backend.custmgrService + '/api/pmamiddistribute/querylist',
          params: {},
          wfCommonParams: {
            sessionInstuCde: yufp.session.instu.code,
            // sessionOrgCode: yufp.session.details.grantOrgCode,
            sessionOrgCode: yufp.session.org.code,
            sessionLoginCode: yufp.session.user.loginCode
          },
          singleRules: [
            { required: true, message: '必填项', trigger: 'blur' },
            { validator: yufp.validator.number, message: '请输入数字', trigger: 'blur' }
          ],
          dialogVisible: false,
          singleData: [],
          singleViewData: [],
          formDisabled: false,
          saveBtnShow: true,
          colunmNamelist: [],
          queryList: [],
          key: [],
          formDataTwo: [],
          contactData: [],
          activeNames: ['1'],
          queryData: {},
          flagOne: false,
          oldData: [],
          flagTwo: false,
          pickerOptions: {
            disabledDate: function (time) {
              return time.getTime() < me.etlDate.getTime();
            }
          },
          queryForm: {},
          modelVal: {},
          flagThree: false,
          maxDstrRate: '',
          minAmt: '',
          amt: '',
          dstrPeriod: '',
          flagPeriod: true,
          queryObj: {},
          datacodeList: '',
          allowRepeat: '',
          dialogVisibleDetail: false,
          queryDateList: {},
          loading: false
        };
      },
      created: function () {
        var _this = this;
        yufp.service.request({
          async: false,
          method: 'GET',
          url: backend.appBaseService + '/api/commondistribution/queryTimeState',
          callback: function (code, message, response) {
            var dateMonth = response.statDate;
            var year = parseInt(dateMonth.substring(0, 4));
            var month = parseInt(dateMonth.substring(4, 6));
            var day = parseInt('01');
            _this.etlDate = new Date(year, month, day);
          }
        });
        // 审批状态的调用
        /* yufp.service.request({
                            async: false,
                            method: 'GET',
                            url: '/api/metafunctionmanager/getmetafuninfo',
                            data: {funCode: data.funCode},
                            callback: function (code, message, response) {
                                var list = yufp.util.getList(response.data);
                                _this.queryList = list.queryList;
                                _this.queryList.push({
                                    dataCode: 'APPLY_STS',
                                    ename: 'applySts',
                                    name: '审批状态',
                                    type: 'select'
                                });
                                _this.colunmNamelist = list.colunmNamelist;
                                _this.colunmNamelist.push({
                                    dataCode: 'APPLY_STS',
                                    ename: 'applySts',
                                    name: '审批状态',
                                    width: '200'
                                });
                                _this.queryDateList = list.queryDateList;
                                _this.datacodeList = list.datacodeList;
                                if (_this.datacodeList != '' || _this.datacodeList != undefined) {
                                    _this.datacodeList = _this.datacodeList + ',APPLY_STS';
                                    yufp.lookup.reg(_this.datacodeList);
                                }
                                _this.key = list.key;
                                _this.amt = list.amt;
                                _this.modelVal = list.model;
                                _this.maxDstrRate = list.maxDstrRate;
                                _this.minAmt = list.minAmt;
                                _this.allowRepeat = list.allowRepeat;
                                /!*if (list.dstrType == '1') {
                                    _this.flagOne = false;
                                } else {
                                    _this.flagOne = true;
                                }*!/
                                _this.flagOne = true;
                                if (list.dstrPeriod == '1') {
                                    _this.flagPeriod = false;
                                } else {
                                    _this.flagPeriod = true;
                                }
                                _this.params = {
                                    condition: JSON.stringify({
                                        funCode: data.funCode,
                                        dataAuth: list.dataAuth,
                                        // orgId: yufp.session.details.grantOrgCode,
                                        orgId: yufp.session.org.code,
                                        isPc: '0',
                                        dstrSts: ''
                                    })
                                };
                            }
                        });*/
      },
      watch: {

      },
      mounted: function () {

      },
      methods: {
        loadedHandler: function () {
          var _this = this;
          _this.loading.close();
        },
        searchFn: function () {
          var _this = this;
          _this.$refs['queryFormRef'].validate(function (valid) {
            if (valid) {
              // 显示loading
              var options = {
                target: cite.el, // Loading 需要覆盖的 DOM 节点
                body: false, // 遮罩是否插入至 DOM 中的 body 中，true: 插入，false: 不插入，
                fullscreen: false, // 遮罩是否全屏, true: 全屏，false: 非全屏
                text: '拼命加载中', // 显示在加载图标下方的加载文案
                customClass: 'trans-class' // Loading 的自定义类名
              };
              _this.loading = _this.$loading(options);
              let model = {};
              yufp.clone(_this.$refs['queryFormRef'].formdata, model);
              for (let key in model) {
                if (_this.queryDateList[key] && model[key]) {
                  model[key] = yufp.util.dateFormat(model[key], _this.queryDateList[key] == 'yyyyMMdd' ? '{y}{m}{d}' : '{y}-{m}-{d}');
                }
              }
              var param = { condition: JSON.stringify(model) };
              _this.$refs.yutable1.remoteData(param);
            } else {
              return;
            }
          });
        },
        resetFn: function () {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs['queryFormRef'].resetFields();
          });
        },
        fromDate: function (date) {
          if (date) {
            date = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
          }
          return date;
        },

        addFn: function () {
          let _this = this;
          if (_this.$refs.yutable1.selections.length != 1) {
            _this.$message({ message: '请选择一条数据', type: 'warning' });
            return;
          }
          let obj = _this.$refs.yutable1.selections[0];
          if (obj.dstrSts != '1' && obj.dstrSts != '4') {
            _this.$message({ message: '只有未分配和自动分配的数据才能分配', type: 'error' });
            return;
          }
          if (obj.applySts == '1') {
            _this.$message({ message: '只有审批驳回的数据才能分配', type: 'error' });
            return;
          }
          _this.dialogVisible = true;
          _this.singleData = [];

          let params = {
            midInfoId: obj.id
          };
          // 当数据分配状态为待审批和自动分配时，需要查询当前数据的分配信息
          if (obj.dstrSts == '4' || obj.dstrSts == '3') {
            yufp.service.request({
              method: 'GET',
              url: backend.appBaseService + '/api/pmamiddistribute/queryDistribute',
              data: params,
              callback: function (code, message, response) {
                if (!response.data) {
                  _this.$message({ message: '无法获取单区间分配信息，请重新进行分配', type: 'warning' });
                  _this.singleData = [{
                    startAmt: '0',
                    endAmt: parseInt(obj.transactionAmount),
                    distrRate: '100'
                  }];
                  return;
                }
                for (let i in response.data) {
                  _this.singleData.push({
                    managerId: response.data[i].managerId,
                    managerName: response.data[i].managerName,
                    distrRate: response.data[i].distrRate
                  });
                }
              }
            });
          } else {
            _this.singleData = [{
              startAmt: '0',
              endAmt: parseInt(obj.transactionAmount),
              distrRate: '100'
            }];
          }
        },
        addSingle: function () {
          let _this = this;
          let rate = 0.0;
          for (let i in this.singleData) {
            if (this.singleData[i].distrRate) {
              rate += parseFloat(this.singleData[i].distrRate);
            }
          }
          if (rate >= 100) {
            _this.$message({
              message: '区间比例之和已达到最大值',
              type: 'error'
            });
            return;
          }
          this.singleData.push({
            // distrRate:10,
          });
        },
        mgrSelectFn: function (data) {
          let _this = this;
          let obj = _this.$refs.singleTable.selections[0];
          if (_this.allowRepeat == '0') {
            if (_this.flagOne) {
              // 带金额校验
              if (_this.userflagEqualTwo(data[0].loginCode, obj.startAmt, obj.endAmt)) {
                obj.managerId = data[0].loginCode;
                obj.managerName = data[0].userName;
              } else {
                obj.managerId = '';
                obj.managerName = '';
                _this.$message({ message: '存在相同的客户经理的分配数据', type: 'warning' });
              }
            } else {
              if (_this.userflagEqual(data[0].loginCode)) {
                obj.managerId = data[0].loginCode;
                obj.managerName = data[0].userName;
              } else {
                obj.managerId = '';
                obj.managerName = '';
                _this.$message({ message: '存在相同的客户经理的分配数据', type: 'warning' });
              }
            }
          } else {
            obj.managerId = data[0].loginCode;
            // obj.managerName = data[0].userName;
            _this.$set(obj, 'managerName', data[0].userName);
          }
        },
        rateChange: function (index, row) {
          // let _this = this;

          // let obj = _this.$refs.yutable1.selections[0];
          // let transactionAmount = parseInt(obj.transactionAmount);
          // let lastNum = 0;
          // for(let i in this.singleData){
          //     let range = (transactionAmount*parseInt(this.singleData[i].distrRate))/100;
          //     this.singleData[i].startAmt = lastNum;
          //     this.singleData[i].endAmt =lastNum + range;
          //     lastNum += range;
          // }
        },
        saveSingle: function () {
          let _this = this;
          let rate = 0.0;
          for (let i in _this.singleData) {
            if (_this.singleData[i].distrRate) {
              rate += parseFloat(_this.singleData[i].distrRate);
            }
          }
          if (rate != 100.0) {
            _this.$message({
              message: '业绩比例之和必须为100',
              type: 'error'
            });
            return;
          }
          let obj = {
            id: _this.$refs.yutable1.selections[0].id,
            pmaMidDistributeList: []
          };
          for (let i in _this.singleData) {
            if (!_this.singleData[i].managerId || !_this.singleData[i].distrRate) {
              _this.$message({ message: '未填写完成，请检查', type: 'error' });
              return;
            }
            obj.pmaMidDistributeList.push({
              midInfoId: _this.$refs.yutable1.selections[0].id,
              allotType: '2',
              distrRate: _this.singleData[i].distrRate,
              managerId: _this.singleData[i].managerId,
              managerName: _this.singleData[i].managerName

            });
          }
          yufp.service.request({
            method: 'POST',
            url: backend.appBaseService + '/api/pmamiddistribute/saveDistribute',
            data: obj,
            callback: function (code, message, response) {
              if (response.code != 1) {
                _this.$message({ message: '单区间分配失败', type: 'warning' });
                return;
              }
              // _this.$refs.yutable1.remoteData();
              _this.$message({ message: '操作成功', type: 'info' });
              // TODO 提交审批
              _this.commitFn();
              _this.dialogVisible = false;
              _this.$refs.yutable1.remoteData();
            }
          });
        },
        singleDelete: function (index) {
          let _this = this;
          _this.singleData.splice(index, 1);
          // let obj = _this.$refs.yutable1.selections[0];
          // let transactionAmount = parseInt(obj.transactionAmount);
          // let lastNum = 0;
          // for(let i in this.singleData){
          //     let range = (transactionAmount*parseInt(this.singleData[i].distrRate))/100;
          //     this.singleData[i].startAmt = lastNum;
          //     this.singleData[i].endAmt =lastNum + range;
          //     lastNum += range;
          // }
        },
        detailFn: function () {
          let _this = this;
          if (_this.$refs.yutable1.selections.length != 1) {
            _this.$message({ message: '请选择一条数据', type: 'warning' });
            return;
          }
          let obj = _this.$refs.yutable1.selections[0];
          if (obj.dstrSts == '1') {
            _this.$message({ message: '当前数据未分配', type: 'warning' });
            return;
          }
          let params = {
            midInfoId: obj.id
          };
          yufp.service.request({
            method: 'GET',
            url: backend.appBaseService + '/api/pmamiddistribute/queryDistribute',
            data: params,
            callback: function (code, message, response) {
              if (!response.data) {
                _this.$message({ message: '无法获取单区间分配信息', type: 'warning' });
                return;
              }
              _this.singleViewData = [];
              for (let i in response.data) {
                _this.singleViewData.push({
                  managerId: response.data[i].managerId,
                  managerName: response.data[i].managerName,
                  distrRate: response.data[i].distrRate
                });
              }
            }
          });
          _this.dialogVisibleDetail = true;
        },

        /**
                         * 清除
                         */
        clearFn: function () {
          this.contactData = [];
        },
        commitFn: function () {
          var _this = this;
          if (_this.$refs.yutable1.selections.length != 1) {
            _this.$message({ message: '请选择一条数据进行审批', type: 'warning' });
            return;
          }
          var obj = _this.$refs.yutable1.selections[0];
          var approveId = obj.id;

          if (approveId == undefined || approveId == null || approveId == '') {
            _this.$message({ message: '获取审批id失败，请联系管理员', type: 'warning' });
            return;
          }
          var applySts = obj.applySts;
          if (applySts == 1) {
            _this.$message({ message: '该条数据正在审批中...', type: 'warning' });
            return;
          }
          var commitData = {};
          commitData.instanceId = approveId; // 关联业务编号
          commitData.bizSeqNo = approveId; // 关联业务编号
          commitData.applType = 'ZSYJFP'; // 审批流程
          commitData.custName = yufp.session.userName; // 展示主题名称
          commitData.custId = yufp.session.userId;
          _this.$refs.yufpWfInit.wfInit(commitData);
        },
        onAfterInit: function (data) {

        },
        // 审批页面关闭后
        onAfterClose: function () {
          var _this = this;
          _this.$refs.yutable1.remoteData();
        }
      }
    });
  };
});