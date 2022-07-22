/**
 * @author linhongjie
 * @since 2021/11/10.
 * @description 
 */

/** 引入相关JS文件 */
define([], function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.lookup.reg('CUST_GRADE,PROPERTY_MORTGAGE_STATUS,CD0376,YES_NO,CD0017,HEALTH_STATE,MAJOR');
        var vm = yufp.custom.vue({
            el: '#exampleEdit',
            data: function() {
                return {
                    wfSign: data.wfSign, // 流程编号
                    instanceId: data.bizSeqNo, // 流程id
                    custId: data.custId,
                    detailformshow: false,
                    istzz: false,
                    iskhdj: false,
                    isbgyy: false,
                    istgyy: true,
                    isfp: false,
                    detailtitle: '',
                    newsshow: false,
                    custdetailData: {},
                    neweditData: {},
                    newseditltable: [],
                    urltg: '/api/trusteeship/detailelist', //管户托管
                    urltzfp: '/api/ocrmfciadmitbelong/detailebelonghis', // 管户分配、管户调整
                    urlxxbj: '/api/pcustbaseinfo/queryCustlist', // 管户信息编辑
                    urlkhfc: '/api/ocrmfciadmitbelong/Gradelist' // 客户分层
                        // mgrId mgrName

                };
            },
            created: function() {},
            mounted: function() {
                var em = this;
                em.getdata();
            },
            methods: {
                getdata: function() {
                    var _this = this;
                    // _this.custdetailData.custName = '胡荣d';
                    // _this.custdetailData.changeReason = '原因';
                    if (_this.wfSign == 'WFCH') { // 管户托管
                        _this.detailtitle = '管户托管';
                        _this.isfp = true;
                        _this.iskhdj = true;
                        _this.istgyy = false;
                        _this.isbgyy = true;
                        _this.detailformshow = true;
                        _this.newsshow = false;
                        yufp.service.request({
                            method: 'GET',
                            url: _this.urltg,
                            data: { applyId: _this.instanceId },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    console.log(response);
                                    let data = response.data;
                                    if (data) {
                                        for (let key in data) {
                                            _this.custdetailData[key] = data[key] || '';
                                        }
                                    }
                                    _this.custdetailData.adjust = ((data.trustMgrName || '') + '/' + (data.trustMgrId || '')) || ''
                                }
                            }
                        })
                    } else if (_this.wfSign == 'WFCLA') { // 管户分层
                        _this.detailtitle = '客户分层';
                        _this.isfp = true;
                        _this.istzz = true;
                        _this.isbgyy = true;
                        _this.detailformshow = true;
                        _this.newsshow = false;
                        yufp.service.request({
                            method: 'GET',
                            url: _this.urlkhfc,
                            data: { id: _this.instanceId },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    console.log(response);
                                    let data = response.data;
                                    if (data) {
                                        for (let key in data) {
                                            _this.custdetailData[key] = data[key] || '';
                                        }
                                    }

                                    // 字典对象的转换
                                    var lookuptype = yufp.lookup.find('CUST_GRADE', true);
                                    if (lookuptype != undefined && _this.custdetailData.aumgrade != '') {
                                        for (let i = 0; i < lookuptype.length; i++) {
                                            if (lookuptype[i].key == _this.custdetailData.aumgrade) {
                                                _this.custdetailData.aumgrade = lookuptype[i].value || '';
                                            }
                                        }
                                    }

                                }
                            }
                        })
                    } else if (_this.wfSign == 'WFMCC' || _this.wfSign == 'WFMCD') { // 管户调整、管户分配
                        if (_this.wfSign == 'WFMCC') {
                            _this.detailtitle = '管户调整';
                        }
                        if (_this.wfSign == 'WFMCD') {
                            _this.detailtitle = '管户分配';
                        }
                        _this.iskhdj = true;
                        _this.detailformshow = true;
                        _this.newsshow = false;
                        yufp.service.request({
                            method: 'GET',
                            url: _this.urltzfp,
                            data: { seqno: _this.instanceId },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    console.log(response);
                                    let data = response.data;
                                    if (data) {
                                        for (let key in data) {
                                            _this.custdetailData[key] = data[key] || '';
                                        }
                                        _this.custdetailData.adjust = ((data.mgrName || '') + '/' + (data.mgrId || '')) || '';
                                        _this.custdetailData.customerMgr = ((data.mgrnamepre || '') + '/' + (data.mgridpre || '')) || '';
                                    }

                                }
                            }
                        })
                    } else if (_this.wfSign == 'WFCFE') { //  管户信息编辑
                        _this.newsshow = true;
                        _this.detailformshow = false;
                        var params;
                        if (_this.instanceId) {
                            params = JSON.stringify({ seqno: _this.instanceId })
                        } else {
                            params = JSON.stringify({ custId: _this.custId })
                        }
                        yufp.service.request({
                            method: 'GET',
                            url: _this.urlxxbj,
                            data: {
                                condition: params
                            },
                            callback: function(code, message, response) {
                                if (code == 0) {
                                    let data = response.data;
                                    if (data.crmFCiUserInformation) {
                                        for (let key in data.crmFCiUserInformation) {
                                            _this.neweditData[key] = data.crmFCiUserInformation[key] || '';
                                        }
                                    }
                                    if (data.ciUserAssetsDTOlist) {
                                        _this.newseditltable = data.ciUserAssetsDTOlist || [];
                                    }
                                    if (data.carFlg) {
                                        _this.neweditData.carFlg = data.carFlg || '';

                                    }
                                    if (data.houseCount) {
                                        _this.neweditData.houseCount = data.houseCount || '';

                                    }
                                    if(!_this.neweditData.incomeSrc) {
                                        _this.neweditData.incomeSrc = data.incomeSrc || '';
                                      }
                                      _this.neweditData.incomeSrc = _this.neweditData.incomeSrc ? _this.neweditData.incomeSrc.split(',') : [];
                                }
                            }
                        })
                    }


                }

            }
        });
    };
});