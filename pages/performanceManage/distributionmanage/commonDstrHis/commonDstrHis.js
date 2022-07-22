/**
 * @Created by 万爽 wanshuang@yusys.com.cn on 2020-1-7 16:34:21.
 * @updated by
 * @description 业绩分配历史
 */
define([
  './custom/widgets/js/YufpDemoSelector.js',
  './custom/widgets/js/YufpUserSelector.js',
  './custom/widgets/js/yufpExtTree.js',
  './custom/widgets/js/yufpOrgTree.js'
], function (require, exports) {
  /**
   * 页面加载完成时触发
   * @param hashCode 路由ID
   * @param data 传递数据对象
   * @param cite 页面站点信息
   */
  exports.ready = function (hashCode, data, cite) {
    yufp.lookup.reg('APPLY_STS,DATA_SRC');
    yufp.custom.vue({
      el: cite.el,
      data: function () {
        return {
          dataUrlTable: backend.appBaseService + '/api/commondistribution/querylist',
          params: {},
          colunmNamelist: [],
          datacodeList: '',
          queryList: [],
          formDataTwo: [],
          dialogVisible: false,
          contactData: [],
          queryData: {},
          flagOne: false,
          activeNames: ['1'],
          modelVal: {},
          loading: false,
          queryDateList: {}
        };
      },
      watch: {
        dialogVisible: function (newVal) {
          var _this = this;
          if (newVal) {
            // 清空留存数据
            _this.contactData = [];
            var obj = _this.$refs.refTable.selections[0];
            var model = {};
            model.funCode = data.funCode;
            for (var i = 0; i < _this.key.length; i++) {
              model[_this.key[i].ename] = obj[_this.key[i].ename];
            }
            if (data.funCode == 'ComCustDstr' || data.funCode == 'PerCustDstr') {
              model.acctOrgId = obj.acctOrgId;
            }
            yufp.service.request({
              method: 'GET',
              url: backend.appBaseService + '/api/commondistribution/queryPeriodHisTable',
              data: {condition: JSON.stringify(model)},
              callback: function (code, message, response) {
                _this.formDataTwo = response.data;
                _this.$refs.refForm.resetFields();
                for (var i = 0; i < _this.formDataTwo.length; i++) {
                  _this.formDataTwo[i].effectDate = _this.fromDate(_this.formDataTwo[i].effectDate);
                  _this.formDataTwo[i].expirateDate = _this.fromDate(_this.formDataTwo[i].expirateDate);
                  _this.formDataTwo[i].operTime = _this.fromDate(_this.formDataTwo[i].operTime);
                }
              }
            });
          }
        }
      },
      created () {
        var _this = this;
        yufp.service.request({
          async: false,
          method: 'GET',
          url: '/api/metafunctionmanager/getmetafuninfo',
          data: {funCode: data.funCode},
          callback: function (code, message, response) {
            var list = yufp.util.getList(response.data);
            _this.queryList = list.queryList;
            _this.colunmNamelist = list.colunmNamelist;
            _this.queryDateList = list.queryDateList;
            _this.datacodeList = list.datacodeList;
            if (_this.datacodeList != '' || _this.datacodeList != undefined) {
              _this.datacodeList = _this.datacodeList + ',DATA_SRC,APPLY_STS';
              yufp.lookup.reg(_this.datacodeList);
            }
            _this.key = list.key;
            _this.modelVal = list.model;
            if (list.dstrType == '1') {
              _this.flagOne = false;
            } else {
              _this.flagOne = true;
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
        });
      },
      mounted: function () {
        var _this = this;
        // _this.$refs.queryFormRef.formdata.orgId = yufp.session.details.grantOrgCode;
        _this.$refs.queryFormRef.formdata.orgId = yufp.session.org.code;
        // _this.$nextTick(function () {
        //   _this.$refs.refTable.remoteData(_this.params);
        // });
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
            _this.$refs['queryFormRef'].resetFields();
          });
        },
        fromDate: function (date) {
          if (date) {
            date = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
          }
          return date;
        },
        /**
         * 取消
         */
        cancelFn: function () {
          var _this = this;
          _this.dialogVisible = false;
        },
        /**
         * 详情
         */
        infoFn: function () {
          var _this = this;
          var selectionsAry = _this.$refs.refTable.selections;
          if (selectionsAry.length != 1) {
            _this.$message({ message: '请选择一条数据', type: 'warning' });
            return;
          }
          _this.dialogVisible = true;
        },
        /**
         * 分配明细
         */
        handleFenpei: function (index, row) {
          var _this = this;
          _this.$nextTick(function () {
            _this.$refs.refForm.resetFields();
            _this.activeNames = ['1'];
            _this.queryData.id = index;
            _this.queryData.effectDate = row.effectDate;
            _this.queryData.expirateDate = row.expirateDate;
            if (row.list != null && row.list != undefined && row.list != '') {
              _this.contactData = row.list;
            } else {
              var model = {};
              model.funCode = data.funCode;
              model.periodId = row.id;
              // 获取分配明细
              yufp.service.request({
                method: 'GET',
                url: backend.appBaseService + '/api/commondistribution/queryDistributeHisTable',
                data: {condition: JSON.stringify(model)},
                callback: function (code, message, response) {
                  _this.contactData = response.data;
                }
              });
            }
          });
        }
      }
    });
  };
});