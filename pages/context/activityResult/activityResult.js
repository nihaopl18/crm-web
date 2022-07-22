/**
 * @Created by zhanghan zhanghan3@yusys.com.cn on 2019-6-19 18:04:22.
 * @updated by
 * @description 活动结果
 */
 define(function (require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function (hashCode, data, cite) {
        yufp.lookup.reg('ACTIVITY_RESULT');
        var nameListColumns = [
            {label: '客户id', prop: 'customerId', resizable: true},
            {label: '客户名称', prop: 'customerName', resizable: true},
            {label: '营销信息', prop: 'marketMessage', resizable: true},
            {label: '发送方式', prop: 'channelName', resizable: true},
            {label: '发送时间', prop: 'sendTime', resizable: true},
            {label: '发送结果', prop: 'resultType', resizable: true, dataCode: 'ACTIVITY_RESULT'},
        ]
        var eventListColumns = [
            {label: '客户id', prop: 'custId', resizable: true},
            {label: '客户名称', prop: 'custName', resizable: true},
            {label: '客户类型', prop: 'custName', resizable: true},
            {label: '客户动作', prop: 'custName', resizable: true},
            {label: '触发时间', prop: 'custName', resizable: true},
            {label: '触发结果', prop: 'custName', resizable: true},
        ]
      yufp.custom.vue({
        el: cite.el,
        data: function () {
            return {
                channelResult:[],
                keyword: '',
                activityList: [],
                activityForm: {
                    tempId: '',
                    activityName: '',
                    activityType: '',
                    keyword: ''
                },
                activeId: '',
                activityInfo: {},
                activityInfo2: {},
                activityName1: '',
                tableColumns: [],
                tableUrl:  backend.adminService + '/api/marketplanaction/result/customer',
                initTableParams: {
                    tempId: ''
                },
                activeType: '',
                rightSearchForm: {},
                selectResultData: {
                    page: 1,
                    size: 10,
                    tempId: ''
                },
                optionsType: [
                    {key: '01', value: '名单制营销类'},
                    {key: '02', value: '互联网场景营销类'},
                    {key: '03', value: '实时事件/批量事件营销类'}
                ],
                optionsSts: [
                    {key: '02', value: '已发布'},
                    {key: '03', value: '已下架'},
                    {key: '04', value: '执行中'}
                ]
            }
        },
        methods: {
            // 查询活动列表
            selectActivity() {
                var _this = this;
                _this.activityForm.keyword = '';
                var url = '/api/marketplan/result';
                if (_this.keyword != null && _this.keyword != '') {
                    _this.activityForm.keyword = _this.keyword;
                }
                yufp.service.request({
                    method: 'POST',
                    url: url,
                    data: this.activityForm,
                    callback: function (code, message, response) {
                        _this.activityList = [];
                        var data = response.data;
                        for (let index = 0; index < data.length; index++) {
                            const element = data[index];
                            var activity = {};
                            activity.id = element.tempId;
                            activity.name = element.activityName;
                            activity.type = element.activityType;
                            _this.activityList.push(activity);
                        }
                        console.log("activityList", _this.activityList);
                    }
                });
            },
            /**左边模糊查询 */
            fuzzyQuery: function(){
                this.selectActivity();
            },
            handleMenuClick(item) {
                var _this = this;
                _this.initTableParams.tempId = item.id;
                _this.selectResultData.tempId = item.id;
                var data = _this.selectResultData;
                console.log(_this.selectResultDatam, data);
                this.activeId = item.id;
                this.activeType = item.type;
                console.log("type 是否等于 1", this.activeType == 1);
                console.log("type 是否等于 2", this.activeType == 2);
                console.log("type 是否等于 3", this.activeType == 3);
                var url = '/api/marketplanaction/result';
                yufp.service.request({
                    method: 'POST',
                    url: url,
                    data: _this.selectResultData,
                    callback: function (code, message, response) {
                        _this.activityInfo.activityName = response.data.activityName;
                        _this.activityInfo.activitySts = response.data.activitySts;
                        _this.activityInfo.activityType = response.data.activityType;
                        _this.activityInfo.endTime = response.data.endTime;
                        _this.activityInfo.startTime = response.data.startTime;
                        // _this.activityInfo.actionNames = response.data.marketModeNames;
                        // _this.activityInfo.channelNames = response.data.channelNames;
                        // _this.activityInfo.customerGroupNames = response.data.groupNames;
                        // _this.activityInfo.productNames = response.data.productNames;
                        _this.activityInfo2.customerNumber = response.data.customerNumber;
                        _this.activityInfo2.successRate = response.data.successRate;
                    }
                });
                if(this.activeType == 1) {
                    this.tableColumns = nameListColumns;
                } else {
                    this.tableColumns = eventListColumns;
                }
                _this.$nextTick(function() {
                    _this.$refs.pubtable.remoteData()
                })
            },
        },
        created () {
            this.selectActivity();
        }
      });
    };
  });