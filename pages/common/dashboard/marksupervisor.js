/**
 * Created by wangyin on 2017/11/16.
 * modify by qfk 20180719
 * 1、添加mock.js数据,供顶部三个板块、两个表格使用
 * 2、修改界面版块数量及对应的统计图样式
 */
define([
    'echarts',
    // './libs/swiper/idangerous.swiper.scrollbar-2.4.1.min.js',
    'jquery',
    './libs/swiper/idangerous.swiper.min.js'
], function (require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function (hashCode, data, cite) {
        var vm = yufp.custom.vue({
            el: "#fx_marksupervisor",
            data: function () {
                var _self = this;
                return {
                    ToDos: [],
                    toDoTotal: '',
                    Dones: [],
                    doneTotal: '',
                    Ends: [],
                    EndsTotal: '',
                    Tasks: [],
                    taskTotal: '',
                    noStartTasks: [],
                    noStartTaskTotal: '',
                    todoTasks: [],
                    todoTaskTotal: '',
                    Messages: [],
                    MessagesTotal: '',
                    Notices: [],
                    NoticesTotal: '',
                    list: [],
                    // 活动监控配置项
                    activeValue: '00',
                    activeOptions: [{
                        key: '00',
                        value: '全部'
                    },{
                        key: '01',
                        value: '基于客户实时交易的权益营销'
                    }, {
                        key: '02',
                        value: '基于批量事件的客户权益营销'
                    }, {
                        key: '03',
                        value: '基于客户实时事件的营销'
                    }, {
                        key: '04',
                        value: '基于批量事件的营销流程'
                    }, {
                        key: '05',
                        value: '基于数据挖掘的精准营销活动'
                    }],
                    moniTypeValue: '01',
                    moniTypeOptions: [{
                        key: '01',
                        value: '活动'
                    }, {
                        key: '02',
                        value: '机构'
                    }, {
                        key: '03',
                        value: '客户经理'
                    }],
                    ativityMoniTableData: [{
                        name: '基于客户实时交易的权益营销',
                        customer: '80',
                        product: '38',
                        noStart: '23',
                        todo: '17',
                        completion: '31',
                        fail: '9'
                    }, {
                        name: '基于批量事件的客户权益营销',
                        customer: '60',
                        product: '21',
                        noStart: '18',
                        todo: '22',
                        completion: '17',
                        fail: '3'
                    }, {
                        name: '基于客户实时事件的营销',
                        customer: '120',
                        product: '45',
                        noStart: '35',
                        todo: '42',
                        completion: '33',
                        fail: '10'
                    }, {
                        name: '基于批量事件的营销流程',
                        customer: '77',
                        product: '33',
                        noStart: '21',
                        todo: '31',
                        completion: '14',
                        fail: '4'
                    }, {
                        name: '基于数据挖掘的精准营销活动',
                        customer: '89',
                        product: '38',
                        noStart: '31',
                        todo: '22',
                        completion: '29',
                        fail: '7'
                    }],
                    //营销渠道触达监控
                    channelValue: '01',
                    channelOptions: [
                    {
                        key: '01',
                        value: '短信'
                    }, {
                        key: '02',
                        value: '邮件'
                    }, {
                        key: '03',
                        value: '网银'
                    }, {
                        key: '04',
                        value: '微信银行'
                    }, {
                        key: '05',
                        value: '手机银行'
                    }],
                    //存款规模下拉框配置
                    depositOrgValue: '01',
                    depositOrgOptions: [{
                        key: '01',
                        value: '全行'
                    }, {
                        key: '02',
                        value: '对公'
                    }, {
                        key: '03',
                        value: '零售'
                    }],
                    averageValue: '01',
                    averageOptions: [{
                        key: '01',
                        value: '月日均'
                    }, {
                        key: '02',
                        value: '季日均'
                    }, {
                        key: '03',
                        value: '年日均'
                    }],
                    eventPage: {
                        data: null,
                        total: null,
                        multipleSelection: [],
                        paging: {
                            page: 1,
                            size: 5,
                            rules: {
                                type: [
                                    { required: true, message: '请选择类型', trigger: 'change' }
                                ]
                            }
                        }
                    }
                }
            },
            mounted: function () {
                var _this = this;
                this.queryEvenFn();
                _this.queryMyTaskInfo();
                _this.queryMyNoStartTaskInfo();
                _this.queryMytodoTaskInfo();
                _this.queryNoticeInfo();
                _this.queryRemindInfo();
                _this.dashboardToDo();
                _this.dashboardDone();
                _this.dashboardEnd();
              
            },
            methods: {

                clickToDo: function (toDo) {
                    var customKey = 'custom_' + new Date().getTime(); //请以custom_前缀开头，并且全局唯一
                    var routeId = 'todo';   //模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                        id: routeId,       //菜单功能ID（路由ID）
                        key: customKey,           //自定义唯一页签key,请统一使用custom_前缀开头
                        title: '待办事项',   //页签名称为客户群名称
                        data: { toDo }   //传递的业务数据，可选配置
                    });
                },
                clickDone: function (toDo) {
                    var customKey = 'custom_' + new Date().getTime(); //请以custom_前缀开头，并且全局唯一
                    var routeId = 'done';   //模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                        id: routeId,       //菜单功能ID（路由ID）
                        key: customKey,           //自定义唯一页签key,请统一使用custom_前缀开头
                        title: '已办事项',   //页签名称为客户群名称
                        data: { toDo }   //传递的业务数据，可选配置
                    });
                },
                clickEndDo: function (toDo) {
                    var customKey = 'custom_' + new Date().getTime(); //请以custom_前缀开头，并且全局唯一
                    var routeId = 'endDo';   //模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                        id: routeId,       //菜单功能ID（路由ID）
                        key: customKey,           //自定义唯一页签key,请统一使用custom_前缀开头
                        title: '办结事项',   //页签名称为客户群名称
                        data: { toDo }   //传递的业务数据，可选配置
                    });
                },
                clickNotice: function (Notice) {
                    var customKey = 'custom_' + new Date().getTime(); //请以custom_前缀开头，并且全局唯一
                    var routeId = 'notice';   //模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                        id: routeId,       //菜单功能ID（路由ID）
                        key: customKey,           //自定义唯一页签key,请统一使用custom_前缀开头
                        title: '未阅系统公告',   //页签名称为客户群名称
                        data: { Notice }   //传递的业务数据，可选配置
                    });
                },
                clickMessage: function (Message) {
                    var customKey = 'custom_' + new Date().getTime(); //请以custom_前缀开头，并且全局唯一
                    var routeId = 'message';   //模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                        id: routeId,       //菜单功能ID（路由ID）
                        key: customKey,           //自定义唯一页签key,请统一使用custom_前缀开头
                        title: '未读消息',   //页签名称为客户群名称
                        data: { Message }   //传递的业务数据，可选配置
                    });
                },
                clickTask: function (task) {
                    var customKey = 'custom_' + new Date().getTime(); //请以custom_前缀开头，并且全局唯一
                    var routeId = 'task';   //模板示例->普通查询的路由ID
                    yufp.frame.addTab({
                        id: routeId,       //菜单功能ID（路由ID）
                        key: customKey,           //自定义唯一页签key,请统一使用custom_前缀开头
                        title: '我的任务',   //页签名称为客户群名称
                        data: { task }   //传递的业务数据，可选配置
                    });
                },
                //获取首页代办事项
                dashboardToDo: function () {
                    var _this = this;
                    var todoparam = {
                        condition: JSON.stringify({ sessionLoginCode: yufp.session.user.loginCode }),
                    };
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/joinbeanch/getUserTodos',
                        data: todoparam,
                        callback: function (code, message, response) {
                            _this.ToDos = response.data,
                            _this.toDoTotal = response.total
                        }
                    });
                },
                // //获取首页未读信息
                // dashboardMessage: function () {
                //     var _this = this;
                //     yufp.service.request({
                //         method: 'GET',
                //         url: backend.adminService + '/api/cimfmmversionremind/getremindlist',
                //         callback: function (code, message, response) {
                //             _this.Messages = response.data,
                //                 _this.MessagesTotal = response.total
                //         }
                //     });
                // },

                // //获取首页未读公告
                // dashboardNotice: function () {
                //     var _this = this;
                //     var param = {
                //         condition: JSON.stringify({
                //             reciveOgjId: yufp.session.org.id,
                //             creatorId: yufp.session.userId,
                //             userId: yufp.session.userId,
                //             roles: yufp.session.roles
                //         })
                //     };
                //     yufp.service.request({
                //         method: 'GET',
                //         url: backend.adminService + '/api/cimfmmloginfo/getNoticeList',
                //         data: param,
                //         callback: function (code, message, response) {
                //             _this.Notices = response.data,
                //                 _this.NoticesTotal = response.total
                //         }
                //     });
                // },
                //获取首页已办事项
                dashboardDone: function () {
                    var _this = this;
                    var param = {
                        condition: JSON.stringify({
                            reciveOgjId: yufp.session.org.id,
                            creatorId: yufp.session.userId,
                            userId: yufp.session.userId,
                            roles: yufp.session.roles
                        })
                    };
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/cimfmmloginfo/getUserDones',
                        data: param,
                        callback: function (code, message, response) {
                            _this.Dones = response.data,
                             _this.doneTotal = response.total
                        }
                    });
                },
                //获取首页完结事项
                dashboardEnd: function () {
                    var _this = this;
                    var param = {
                        condition: JSON.stringify({
                            reciveOgjId: yufp.session.org.id,
                            creatorId: yufp.session.userId,
                            userId: yufp.session.userId,
                            roles: yufp.session.roles
                        })
                    };
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/cimfmmloginfo/getUserEnds',
                        data: param,
                        callback: function (code, message, response) {
                            _this.Ends = response.data,
                                _this.EndsTotal = response.total
                        }
                    });
                },
                 //获取首页我的任务数据信息
                 queryMyTaskInfo: function () {
                    var _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: backend.adminService + '/api/homepage/getmytaskinfo',
                        data: {
                            userId: yufp.session.userId,
                            taskSts:''
                        },
                        callback: function (code, message, response) {
                            _this.Tasks = response.data.info,
                            _this.taskTotal = response.data.total;
                        }
                    });
                },
                    //获取首页我的未开始任务数据信息
                queryMyNoStartTaskInfo: function () {
                        var _this = this;
                        yufp.service.request({
                            method: 'GET',
                            url: backend.adminService + '/api/homepage/getmytaskinfo',
                            data: {
                                userId: yufp.session.userId,
                                taskSts:'APPLYING'
                            },
                            callback: function (code, message, response) {
                                _this.noStartTasks = response.data.info,
                                _this.noStartTaskTotal = response.data.total;
                            }
                        });
                    },
                       //获取首页我的执行中任务数据信息
                    queryMytodoTaskInfo: function () {
                        var _this = this;
                        yufp.service.request({
                            method: 'GET',
                            url: backend.adminService + '/api/homepage/getmytaskinfo',
                            data: {
                                userId: yufp.session.userId,
                                taskSts:'IMPLEMENTING'
                            },
                            callback: function (code, message, response) {
                                _this.todoTasks = response.data.info,
                                _this.todoTaskTotal = response.data.total;
                            }
                        });
                    },
                     //获取首页我的公共数据信息
                     queryNoticeInfo: function () {
                        var _this = this;
                         yufp.service.request({
                             method: 'GET',
                            url: backend.adminService + '/api/homepage/getmynoticeinfo',
                             data: {
                                userId: yufp.session.userId
                            },
                         callback: function (code, message, response) {
                                 _this.Notices = response.data.info,
                                  _this.NoticesTotal = response.data.total;
                                }
                        });
                     },
                    //获取首页我的提醒数据信息
                     queryRemindInfo: function () {
                        var _this = this;
                         yufp.service.request({
                             method: 'GET',
                            url: backend.adminService + '/api/homepage/getmyremindinfo',
                             data: {
                                userId: yufp.session.userId
                            },
                         callback: function (code, message, response) {
                                 _this.Messages = response.data.info,
                                  _this.MessagesTotal = response.data.total;
                            }
                        });
                     },
                startChangeFn: function (val) {
                    this.eventPage.paging.page = val;
                    this.queryEvenFn();
                },
                sizeChangeFn: function (val) {
                    this.eventPage.paging.page = 1;
                    this.eventPage.paging.size = val;
                    this.queryEvenFn();
                },
                //查询分页数据
                queryEvenFn: function () {
                    var me = this;
                    var param = {
                        page: this.eventPage.paging.page,
                        size: this.eventPage.paging.size,
                    }
                    yufp.service.request({
                        url: backend.adminService + '/api/cimfmmloginfo/queryAllLog',
                        method: 'get',
                        data: param,
                        callback: function (code, message, response) {
                            me.eventPage.total = response.total;
                            for (var i = 0; i < response.data.length; i++) {
                                var dataList = {};
                                dataList.eventName = response.data[i].eventName;
                                dataList.eventDescribe = response.data[i].eventDescribe;
                                dataList.eventTime = response.data[i].eventTime.split(" ")[0];
                                me.list.push(dataList);
                            }
                        }
                    })
                }
            }
        })

        setCharts = function () {
            //客户指标
            var customerChartBox = echarts.init(document.getElementById('customerChartBox'));
            var customerOption = {
                tooltip: {
                    show: false
                },
                legend: {
                    left: '43%',
                    top: 15,
                    icon: 'rect',
                    itemGap: 20,
                    itemWidth: 16,
                    itemHeight: 16,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['对公客户量', '零售客户量']
                },
                calculable: true,
                color: ['#FFA867', '#5EA2FF'],
                series: [{
                    name: '客户指标',
                    type: 'pie',
                    radius: ['40%', '53%'],
                    center: ['65%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            position: 'center',
                            label: {
                                show: true,
                                formatter: "{b}\n\n{d}%"
                            }
                        }
                    },
                    data: [{
                        value: 12,
                        name: '零售客户量'
                    },
                    {
                        value: 34,
                        name: '对公客户量'
                    }
                    ]
                }]
            };
            customerChartBox.setOption(customerOption);
            setPieSelected(customerChartBox);

            //客户星级占比
            var publicChartBox = echarts.init(document.getElementById('publicChartBox'));
            var publicOption = {
                tooltip: {
                    show: false
                },
                title: {
                    text: '对公客户',
                    left: '28%',
                    top: '80%',
                    textStyle: {
                        fontSize: 16,
                        color: '#19233C',
                        fontWeight:400
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '15%',
                    icon: 'rect',
                    padding: [55, 10, 0, 50],
                    itemGap: 20,
                    itemWidth: 16,
                    itemHeight: 16,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['一星级', '二星级', '三星级', '四星级', '五星级']
                },
                calculable: true,
                color: ['#5DA5FF ', '#8191FE', '#FFA767', '#FB758E', '#2ACFAE'],
                series: [{
                    name: '对公客户',
                    type: 'pie',
                    radius: ['40%', '53%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            position: 'center',
                            label: {
                                show: true,
                                formatter: "{b}\n\n{d}%"
                            }
                        }
                    },
                    data: [{
                        value: 240,
                        name: '一星级'
                    }, {
                        value: 180,
                        name: '二星级'
                    }, {
                        value: 120,
                        name: '三星级'
                    }, {
                        value: 86,
                        name: '四星级'
                    }, {
                        value: 40,
                        name: '五星级'
                    }]
                }]
            };
            publicChartBox.setOption(publicOption);
            setPieSelected(publicChartBox);

            //零售客户
            var retailClientChartBox = echarts.init(document.getElementById('retailClientChartBox'));
            var retailClientOption = {
                tooltip: {
                    show: false
                },
                title: {
                    text: '零售客户',
                    left: '28%',
                    top: '80%',
                    textStyle: {
                        fontSize: 16,
                        color: '#19233C',
                        fontWeight:400
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '15%',
                    icon: 'rect',
                    padding: [55, 10, 0, 50],
                    itemGap: 20,
                    itemWidth: 16,
                    itemHeight: 16,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['一星级', '二星级', '三星级', '四星级', '五星级']
                },
                calculable: true,
                color: ['#5DA5FF ', '#8191FE', '#FFA767', '#FB758E', '#2ACFAE'],
                series: [{
                    name: '零售客户',
                    type: 'pie',
                    radius: ['40%', '53%'],
                    center: ['35%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            position: 'center',
                            label: {
                                show: true,
                                formatter: "{b}\n\n{d}%"
                            }
                        }
                    },
                    data: [{
                        value: 240,
                        name: '一星级'
                    }, {
                        value: 180,
                        name: '二星级'
                    }, {
                        value: 120,
                        name: '三星级'
                    }, {
                        value: 86,
                        name: '四星级'
                    }, {
                        value: 40,
                        name: '五星级'
                    }]
                }]
            };
            retailClientChartBox.setOption(retailClientOption);
            setPieSelected(retailClientChartBox);

            //客户等级提升
            var userGradeChartBox = echarts.init(document.getElementById('userGradeChartBox'));
            var userGradeOption = {
                tooltip: {
                    show: false
                },
                legend: {
                    left: '43%',
                    top: 15,
                    icon: 'rect',
                    itemGap: 20,
                    itemWidth: 16,
                    itemHeight: 16,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['对公客户提升量', '零售客户提升量']
                },
                calculable: true,
                color: ['#FFA867', '#5EA2FF'],
                series: [{
                    name: '客户等级提升',
                    type: 'pie',
                    radius: ['40%', '53%'],
                    center: ['65%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            position: 'center',
                            label: {
                                show: true,
                                formatter: "{b}\n\n{d}%"
                            }
                        }
                    },
                    data: [{
                        value: 12,
                        name: '零售客户提升量'
                    },
                    {
                        value: 34,
                        name: '对公客户提升量'
                    }
                    ]
                }]
            };
            userGradeChartBox.setOption(userGradeOption);
            setPieSelected(userGradeChartBox);



            // 客户星级升级数-对公客户
            var publicUpgradeChartBox = echarts.init(document.getElementById('publicUpgradeChartBox'));
            var publicUpgradeOption = {
                title: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        var res = '' + params[0].name;
                        params.forEach(function (item) {
                            res += '<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>' + item.seriesName + ' : ' + item.value + '个';
                        });
                        return res;
                    }
                },
                grid: {
                    left: '7%',
                    width: '90%'
                },
                color: ['#5EA2FF'],
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#E2E7F9'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    data: ['1->2', '1->3', '1->4', '1->5', '2->3', '2->4', '2->5', '3->4', '3->5', '4->5']
                },
                yAxis: [{
                    type: 'value',
                    scale: true,
                    name: '个',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -30,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E2E7F9',
                            type: 'dotted'
                        }
                    }
                }],
                series: [{
                    name: '对公客户升级数',
                    type: 'bar',
                    data: [320, 260, 380, 180, 330, 310, 190, 400, 280, 390],
                    barWidth: 18,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [2, 2, 0, 0],
                            color: '#5EA2FF '
                        }
                    }
                }]
            };
            publicUpgradeChartBox.setOption(publicUpgradeOption);

            // 客户星级升级数-零售客户
            var retailUpgradeChartBox = echarts.init(document.getElementById('retailUpgradeChartBox'));
            var retailUpgradeOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '7%',
                    width: '90%'
                },
                xAxis: {
                    type: 'category',
                    data: ['1->2', '1->3', '1->4', '1->5', '1->6', '1->7', '2->3', '2->4', '2->5', '2->6', '2->7', '3->4', '3->5', '3->6', '3->7', '4->5', '4->6', '4->7', '5->6', '5->7', '6->7'],
                    axisLine: {
                        lineStyle: {
                            color: '#E2E7F9'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    show: true,
                    type: 'value',
                    name: '个',
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E2E7F9',
                            type: 'dotted'
                        }
                    },
                    axisLabel: {
                        inside: true,
                        margin: -30,
                        verticalAlign: 'bottom',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    }
                },
                series: [{
                    name: '零售客户升级数',
                    type: 'bar',
                    barWidth: '18',
                    data: [200, 480, 320, 500, 160, 360, 479, 360, 280, 240, 408, 174, 320, 198, 269, 310, 160, 250, 380, 140, 200],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [2, 2, 0, 0],
                            color: '#FFA867 '
                        }
                    }
                }]
            };
            retailUpgradeChartBox.setOption(retailUpgradeOption);

            //存款规模
            var depositsChartBox = echarts.init(document.getElementById('depositsChartBox'));
            var depositsOption = {
                title: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        var res = '' + params[0].name;
                        params.forEach(function (item) {
                            res += '<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>' + item.seriesName + ' : ' + item.value + ' 万元';
                        });
                        return res;
                    }
                },
                color: ['#FB758E ', '#35D0AF'],
                grid: {
                    left: '7%',
                    width: '88%'
                },
                legend: {
                    itemWidth: 16,
                    itemHeight: 16,
                    right: 50,
                    itemGap: 20,
                    icon: 'rect',
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['全行', '月日均'],
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#E2E7F9'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: [{
                    type: 'value',
                    scale: true,
                    name: '万元',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -30,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E2E7F9',
                            type: 'dotted'
                        }
                    }
                },
                {
                    type: 'value',
                    scale: true,
                    name: '(%)',
                    max: 100,
                    min: 0,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -10,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
                ],
                series: [{
                    name: '全行',
                    data: [5000, 1000, 3000, 2000, 1420, 4550, 2670, 3220, 4000, 2050, 1680, 3490],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }, {
                    name: '月日均',
                    data: [4000, 2370, 1800, 3600, 1950, 4090, 2830, 3200, 5000, 1440, 3700, 2160],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }]
            };
            depositsChartBox.setOption(depositsOption);

            //贷款余额
            var loansChartBox = echarts.init(document.getElementById('loansChartBox'));
            var loansOption = {
                title: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        var res = '' + params[0].name;
                        params.forEach(function (item) {
                            res += '<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>' + item.seriesName + ' : ' + item.value + ' 万元';
                        });
                        return res;
                    }
                },
                color: ['#5DA5FF ', '#FFA767'],
                grid: {
                    left: '7%',
                    width: '88%'
                },
                legend: {
                    itemWidth: 16,
                    itemHeight: 16,
                    right: 50,
                    itemGap: 20,
                    icon: 'rect',
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['全行', '月日均'],
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#E2E7F9'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: [{
                    type: 'value',
                    scale: true,
                    name: '万元',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -30,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E2E7F9',
                            type: 'dotted'
                        }
                    }
                },
                {
                    type: 'value',
                    scale: true,
                    name: '(%)',
                    max: 100,
                    min: 0,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -10,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
                ],
                series: [{
                    name: '全行',
                    data: [1420, 4550, 2670, 5000, 1000, 3000, 2000, 3220, 4000, 2050, 1680, 3490],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }, {
                    name: '月日均',
                    data: [4000, 2370, 1800, 3600, 1440, 3700, 2160, 1950, 4090, 2830, 3200, 5000,],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }]
            };
            loansChartBox.setOption(loansOption);


            //贷款中收
            var zShouChartBox = echarts.init(document.getElementById('zShouChartBox'));
            var zShouOption = {
                title: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        var res = '' + params[0].name;
                        params.forEach(function (item) {
                            res += '<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>' + item.seriesName + ' : ' + item.value + ' 万元';
                        });
                        return res;
                    }
                },
                color: ['#FB758E ', '#35D0AF'],
                grid: {
                    left: '7%',
                    width: '88%'
                },
                legend: {
                    itemWidth: 16,
                    itemHeight: 16,
                    right: 50,
                    itemGap: 20,
                    icon: 'rect',
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['全行', '月日均'],
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#E2E7F9'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: [{
                    type: 'value',
                    scale: true,
                    name: '万元',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -30,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E2E7F9',
                            type: 'dotted'
                        }
                    }
                },
                {
                    type: 'value',
                    scale: true,
                    name: '(%)',
                    max: 100,
                    min: 0,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -10,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
                ],
                series: [{
                    name: '全行',
                    data: [1000, 3000, 2000, 3220, 4000, 2050, 1680, 3490, 1420, 4550, 2670, 5000],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }, {
                    name: '月日均',
                    data: [4000, 1950, 4090, 2830, 3200, 5000, 2370, 1800, 3600, 1440, 3700, 2160],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }]
            };
            zShouChartBox.setOption(zShouOption);

            //营销活动
            var marketingChartBox = echarts.init(document.getElementById('marketingChartBox'));
            var marketingOption = {
                title: {
                    show: false
                },
                toolbox: {
                    show: false
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params, ticket, callback) {
                        var res = '' + params[0].name;
                        params.forEach(function (item) {
                            res += '<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>' + item.seriesName + ' : ' + item.value ;
                        });
                        return res;
                    }
                },
                color: ['#35D0AF', '#5DA5FF ', '#FFA767'],
                grid: {
                    left: '7%',
                    width: '88%'
                },
                legend: {
                    itemWidth: 16,
                    itemHeight: 16,
                    right: 50,
                    itemGap: 20,
                    icon: 'rect',
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['权益营销', '精准营销', '事件营销'],
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#E2E7F9'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: [{
                    type: 'value',
                    scale: true,
                    name: '活动数',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -30,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E2E7F9',
                            type: 'dotted'
                        }
                    }
                },
                {
                    type: 'value',
                    scale: true,
                    name: '(%)',
                    max: 100,
                    min: 0,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14
                    },
                    axisLabel: {
                        inside: true,
                        margin: -10,
                        verticalAlign: 'top',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
                ],
                series: [{
                    name: '权益营销',
                    data: [12, 13, 21, 25, 18, 31, 20, 16, 24, 32, 36, 43],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }, {
                    name: '精准营销',
                    data: [36, 14, 37, 21, 40, 23, 18, 19, 43, 28, 32, 50,],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }, {
                    name: '事件营销',
                    data: [14, 37, 21, 19, 40, 23, 18, 36, 40, 28, 32, 45,],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    lineStyle: {
                        normal: {
                            width: 3
                        }
                    }
                }]
            };
            marketingChartBox.setOption(marketingOption);

            // 待分配任务
            var assignTaskChartBox = echarts.init(document.getElementById('assignTaskChartBox'));
            var assignTaskOption = {
                tooltip: {
                    show: false
                },
                legend: {
                    left: '43%',
                    top: 15,
                    icon: 'rect',
                    itemGap: 20,
                    itemWidth: 16,
                    itemHeight: 16,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['商机数', '风险关注数']
                },
                calculable: true,
                color: ['#FFA867', '#5EA2FF'],
                series: [{
                    name: '待分配任务',
                    type: 'pie',
                    radius: ['40%', '53%'],
                    center: ['65%', '60%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            position: 'center',
                            label: {
                                show: true,
                                formatter: "{b}\n\n{d}%"
                            }
                        }
                    },
                    data: [{
                        value: 12,
                        name: '风险关注数'
                    },
                    {
                        value: 34,
                        name: '商机数'
                    }
                    ]
                }]
            };
            assignTaskChartBox.setOption(assignTaskOption);
            setPieSelected(assignTaskChartBox)

            //客户等级分布  
            var gradeDistributeChartBox = echarts.init(document.getElementById('gradeDistributeChartBox'));
            var gradeDistributeOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['贡献度', '忠诚度'],
                    padding: [15, 24, 0, 10],
                    icon: 'rect',
                    left: 'right',
                    itemWidth: 16,
                    itemHeight: 16
                },
                xAxis: {
                    type: 'category',
                    data: ['高', '中', '低'],
                    axisLine: {
                        lineStyle: {
                            color: '#E2E7F9'
                        }
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    },
                    axisTick: {
                        show: false
                    }
                },
                yAxis: {
                    show: true,
                    type: 'value',
                    name: '个',
                    nameTextStyle: {
                        color: '#5A6277',
                        fontSize: 14,
                        padding: [3, 4, 15, 45]
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#E2E7F9',
                            type: 'dotted'
                        }
                    },
                    axisLabel: {
                        inside: true,
                        margin: -10,
                        verticalAlign: 'bottom',
                        textStyle: {
                            color: '#5A6277',
                            fontSize: 14
                        }
                    }
                },
                series: [{
                    name: '贡献度',
                    type: 'bar',
                    barWidth: '16',
                    data: [60, 80, 20],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [2, 2, 0, 0],
                            color: '#5EA2FF'
                        }
                    }
                }, {
                    name: '忠诚度',
                    type: 'bar',
                    barWidth: '16',
                    data: [86, 45, 32],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [2, 2, 0, 0],
                            color: '#FEBA89'
                        }
                    }
                }]
            };
            gradeDistributeChartBox.setOption(gradeDistributeOption);

            //商机转化率
            var convertRatioChartBox = echarts.init(document.getElementById('convertRatioChartBox'));
            var convertRatioOption = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}%"
                },
                legend: {
                    orient: 'vertical',
                    left: '80%',
                    icon: 'rect',
                    top: 30,
                    icon: 'rect',
                    itemGap: 30,
                    itemWidth: 16,
                    itemHeight: 16,
                    textStyle: {
                        fontSize: '12',
                        color: '#5A6277'
                    },
                    data: ['了解商机', '确认商机', '方案论证', '商务谈判', '商机成交']
                },
                calculable: true,
                color: ['#5EA2FF', '#8191FE', '#FFA767', '#FB758E', '#2ACFAE'],
                series: [
                    {
                        name: '商机转化率',
                        type: 'funnel',
                        width: '30%',
                        height: '80%',
                        left: '25%',
                        top: '10%',
                        label: {
                            normal: {
                                position: 'right',
                                color: '#5A6277',
                                formatter: '商机数量：{@num}'
                            }
                        },
                        data: [
                            { value: 75, name: '了解商机', num: 6 },
                            { value: 60, name: '确认商机', num: 4 },
                            { value: 50, name: '方案论证', num: 2, },
                            { value: 25, name: '商务谈判', num: 1 },
                            { value: 10, name: '商机成交', num: 2 }
                        ]
                    },
                    {
                        name: '商机转化率',
                        type: 'funnel',
                        width: '30%',
                        height: '80%',
                        left: '25%',
                        top: '10%',
                        label: {
                            normal: {
                                position: 'left',
                                color: '#5A6277',
                                formatter: '转化率: {c}%',
                            }
                        },
                        data: [
                            { value: 75, name: '了解商机', num: 6 },
                            { value: 60, name: '确认商机', num: 6 },
                            { value: 50, name: '方案论证', num: 6 },
                            { value: 25, name: '商务谈判', num: 6 },
                            { value: 10, name: '商机成交', num: 6 }
                        ]
                    }
                ]
            }
            convertRatioChartBox.setOption(convertRatioOption);


            //气泡图
            //客户等级分布-对公客户  
            var publicData = [
                [[900, 89, 1228478105, "一星级", "服务等级"], [2300, 45.1, 828478105, "二星级", "服务等级"], [3400, 35.4, 658478105, "三星级", "服务等级"], [4600, 18, 328478105, "四星级", "服务等级"], [5800, 24, 128478105, "五星级", "服务等级"]],
                [[1200, 75, 1028478105, '一星级', "价值等级"], [2400, 34.1, 628478105, '二星级', "价值等级"], [3600, 56, 368478105, '三星级', "价值等级"], [4800, 50, 228478105, "四星级", "价值等级"], [6000, 6, 188478105, "五星级", "价值等级"]]
            ];

            var publicDistributeChartBox = echarts.init(document.getElementById('publicDistributeChartBox'));
            var publicDistributeOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    right: 55,
                    data: ["服务等级", "价值等级"]
                },
                xAxis: {
                    //data: ['1', '2', '3', '4', '3'],
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    // scale: true
                },
                series: [{
                    name: "服务等级",
                    data: publicData[0],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            color: '#5A6277',
                            fontSize:14,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: '#FFA767',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#FFE1CB'
                            }, {
                                offset: 1,
                                color: '#FFA767'
                            }])
                        }
                    }
                }, {
                    name: "价值等级",
                    data: publicData[1],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            color: '#5A6277',
                            fontSize:14,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(25, 100, 150, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgb(129, 227, 238)'
                            }, {
                                offset: 1,
                                color: 'rgb(25, 183, 207)'
                            }])
                        }
                    }
                }]
            };
            publicDistributeChartBox.setOption(publicDistributeOption);

            //客户等级分布-零售客户  
            var retailData = [
                [[900, 89, 1228478105, "一星级", "服务等级"], [2200, 45.1, 828478105, "二星级", "服务等级"], [3600, 35.4, 658478105, "三星级", "服务等级"], [4800, 18, 328478105, "四星级", "服务等级"], [5000, 24, 128478105, "五星级", "服务等级"], [6300, 12, 128458105, "六星级", "服务等级"], [7000, 8, 128478222, "七星级", "服务等级"]],
                [[1000, 75, 1028478105, '一星级', "价值等级"], [2200, 34.1, 628478105, '二星级', "价值等级"], [3600, 56, 368478105, '三星级', "价值等级"], [4700, 50, 228478105, "四星级", "价值等级"], [5200, 6, 188478105, "五星级", "价值等级"], [6100, 11, 138458105, "六星级", "服务等级"], [6900, 7, 118478222, "七星级", "服务等级"]]
            ];

            var retailDistributeChartBox = echarts.init(document.getElementById('retailDistributeChartBox'));
            var retailDistributeOption = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    right: 55,
                    data: ["服务等级", "价值等级"]
                },
                xAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    },
                    // scale: true
                },
                series: [{
                    name: "服务等级",
                    data: retailData[0],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            color: '#5A6277',
                            fontSize:14,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: '#FB758E ',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: '#FFDDE3'
                            }, {
                                offset: 1,
                                color: '#FC849B'
                            }])
                        }
                    }
                }, {
                    name: "价值等级",
                    data: retailData[1],
                    type: 'scatter',
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) / 5e2;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            color: '#5A6277',
                            fontSize:14,
                            formatter: function (param) {
                                return param.data[3];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(25, 100, 150, 0.5)',
                            shadowOffsetY: 5,
                            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgb(129, 227, 238)'
                            }, {
                                offset: 1,
                                color: 'rgb(25, 183, 207)'
                            }])
                        }
                    }
                }]
            };
            retailDistributeChartBox.setOption(retailDistributeOption);

        };

        setCharts();
        function setPieSelected(chartBox) {
            // 取消之前高亮的图形
            chartBox.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: 0
            });
            // 高亮当前图形
            chartBox.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        }

    };

    //消息处理
    exports.onmessage = function (type, message) {

    };

    //page销毁时触发destroy方法
    exports.destroy = function (id, cite) {

    }



});