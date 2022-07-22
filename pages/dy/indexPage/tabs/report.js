/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-06 14:59:47
 * @update by:
 * @description:
 */

define(function(require, exports) {
    /**
     * 页面加载完成时触发
     * @param hashCode 路由ID
     * @param data 传递数据对象
     * @param cite 页面站点信息
     */
    exports.ready = function(hashCode, data, cite) {
        yufp.custom.vue({
            el: cite.el,
            data: function() {
                yufp.lookup.reg('DY0003,DY0004,DY0005,DY0006,CRUD_TYPE,DY0002');
                return {
                    circleUrl: 'https://dev-file.iviewui.com/BbnuuEiM0QXNPHVCvb3E2AFrawIjCkqW/avatar',
                    list: [],
                    hashCode: JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')).filter(function(menu) {
                        return menu.menuName === '首页';
                    })[0].funcId,
                    workSummery: yufp.lookup.find('DY0003', false),
                    workReportTypes: yufp.lookup.find('WORKREPORT_TYPES', false),
                    createDate: moment().format('YYYY-MM-DD'),
                    dialogVisible: false,
                    rule: {
                        workReportBusiType: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        workSummary: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        workContent: [
                            { max: 200, message: '最大长度不超过200个字符', trigger: 'blur' }
                        ],
                        workReportDate: 'required',
                        contactType: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        contactGoal: [
                            { required: true, message: '请选择项', trigger: 'change' }
                        ],
                        customer: 'required'
                    },
                    formdata: {},
                    dateDisabled: true,
                    formDisabled: false,
                    viewType: 'DETAIL',
                    viewTitle: yufp.lookup.find('CRUD_TYPE', false),
                    isCustContact: false,
                    newBut: false,
                    customerContactData: [],
                    finishedWorkSdata: [],
                    isSave: true,
                    isAdd: true,
                    // 初始化附件列表查询时，传入为空
                    initFilesParams: {
                        condition: JSON.stringify({
                            busNo: ''
                        })
                    },
                    reportUpLoadBusNo: {},
                    // 附件列表按钮
                    uploadVisible: true,
                    downloadVisible: true,
                    deleteVisible: true,
                    selectCustParams: { // 客户 放大镜 参数
                        user: {
                            dataParams: {
                                belongOrg: yufp.session.org.code,
                                belongMgr: yufp.session.user.loginCode
                            },
                            checkbox: false // 是否支持多选
                        }
                    },
                    workType: { // 设置不同类型报告的字段
                        isDay: false,
                        isWeek: false,
                        isMonth: false
                    },
                    workReportFormData: {},
                    isDetail: false,
                    detailCustomerContactData: [],
                    workSummary: {
                        second: false,
                        three: false,
                        fouth: false,
                        five: false
                    },
                    todoDataUrl: '/api/todowork/queryFinished',
                    pickerOptions: {
                        disabledDate(time) {
                            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
                        }
                    },
                };
            },
            created: function() {
                this.getWorkReportList();
            },
            methods: {
                getWorkReportList: function() {
                    let _this = this;
                    yufp.service.request({
                        method: 'GET',
                        url: '/api/infoworkreport/querylist',
                        data: {
                            condition: JSON.stringify({ creatorId: yufp.session.userId, createDate: _this.createDate, isDraft: 'N', workReportBusiType: '1,2' }),
                            page: 1,
                            size: 5
                        },
                        callback: function(code, message, response) {
                            if (code === 0) {
                                let data = response.data;
                                if (data && data.length) {
                                    for (let i = 0; i < data.length; i++) {
                                        data[i].startDate = yufp.util.dateFormat(data[i].startDate, '{y}-{m}-{d}');
                                        if (data[i].workSummary) {
                                            data[i].workSummaryList = data[i].workSummary.split(',');
                                        }
                                    }
                                }
                                _this.list = data;
                            }
                        }
                    });
                },
                handleClose: function(isUpdate) {
                    this.dialogVisible = false;
                    isUpdate === 1 && this.getWorkReportList();
                },
                /**
                 * 公共方法：时区控制
                 */
                formJE: function(row, column, cellValue) {
                    if (cellValue) {
                        cellValue = yufp.util.dateFormat(cellValue, '{y}-{m}-{d}');
                    }
                    return cellValue;
                },
                /* 清空 */
                clearObj: function(obj) {
                    for (var key in obj) {
                        obj[key] = null;
                    }
                    return obj;
                },

                // 当操作打开时暂存当前行数据
                handleOptionVisibleChange: function(data, type) {
                    if (data) {
                        yufp.clone(data, this.workReportFormData);
                        if (this.workReportFormData.workReportBusiType == '1') {
                            var item = this.workReportFormData.workContent;
                            if (item != null && item != '' && item != undefined) {
                                var content = item.split(';');
                                for (let index = 0; index < content.length; index++) {
                                    var element = content[index];
                                    var d = element.split(':');
                                    this.$set(this.workReportFormData, 'workContent' + d[0], d[1] || '');
                                }
                            }
                        }
                    }
                    if (type) {
                        this.detailFn();
                    }
                },

                // table 选项操作点击
                handleOptionSelect: function(command) {
                    let _this = this;
                    switch (command) {
                        case 'edit':
                            _this.modifyFn();
                            break;
                        case 'delete':
                            _this.handleDelte();
                            break;
                        case 'detail':
                            _this.detailFn();
                            break;
                    }
                },
                switchStatus: function(viewTitle, formDisabled, isDetail, isAdd, isSave) {
                    var _this = this;
                    _this.viewTitle = viewTitle;
                    _this.dialogVisible = true;
                    _this.formDisabled = formDisabled;
                    _this.isDetail = isDetail;
                    _this.isAdd = isAdd;
                    _this.isSave = isSave;
                },
                // 设置报告字段
                setWorkType: function(isDay, isWeek, isMonth) {
                    var _this = this;
                    _this.workType.isDay = isDay;
                    _this.workType.isWeek = isWeek;
                    _this.workType.isMonth = isMonth;
                },
                /**
                 * 工作报告->编辑操作
                 */
                // 对话框->更改报告类型
                chgReportType: function(val) {
                    // var startDate = new Date();
                    var startDate = new Date(this.formdata.startDate);
                    this.formdata.startDate = '';
                    if (val == '1') {
                        this.setWorkType(true, false, false);
                        this.formdata.startDate = startDate;
                    } else if (val == '2') {
                        this.setWorkType(false, true, false);
                        var dateOfWeek = startDate.getDay(); // 返回当前日期的在当前周的某一天（0～6--周日到周一）
                        var dateOfWeekInt = parseInt(dateOfWeek, 10); // 转换为整型
                        if (dateOfWeekInt == 0) { // 如果是周日
                            dateOfWeekInt = 7;
                        }
                        var aa = 7 - dateOfWeekInt; // 当前于周末相差的天数
                        var temp2 = parseInt(startDate.getDate(), 10); // 按10进制转换，以免遇到08和09的时候转换成0
                        var monDay = temp2 + aa - 6; // 当前日期的周一的日期
                        this.formdata.startDate = new Date(startDate.getFullYear(), startDate.getMonth(), monDay);
                    } else if (val == '3') {
                        this.setWorkType(false, false, true);
                        var selYear = startDate.getFullYear();
                        var selMonth = startDate.getMonth();
                        this.formdata.startDate = new Date(selYear, selMonth, 1);
                    }
                },
                // 对话框->更改工作日期
                chgCreateDate: function(time) {
                    var _this = this;
                    _this.finishedWorkSdata = [];
                    var model = {
                        finisher: yufp.session.userId
                    };
                    time = time instanceof Date ? time : new Date(time);
                    var reportType = _this.formdata.workReportBusiType;
                    if (reportType == '1') {
                        model.startDate = time;
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), time.getDate());
                        _this.formdata.endDate = time;
                    } else if (reportType == '2') {
                        model.startDate = time;
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), time.getDate() + 4);
                        _this.formdata.endDate = model.endDate;
                    } else if (reportType == '3') {
                        model.startDate = time;
                        var endDay = (new Date(time.getFullYear(), time.getMonth() + 1, 1) - time) / (1000 * 60 * 60 * 24);
                        model.endDate = new Date(time.getFullYear(), time.getMonth(), endDay);
                        _this.formdata.endDate = model.endDate;
                    }
                    // yufp.service.request({
                    //   url: '/api/todowork/queryMainlist',
                    //   method: 'GET',
                    //   data: {
                    //     condition: JSON.stringify(model)
                    //   },
                    //   callback: function (code, message, response) {
                    //     if (code == '0') {
                    //       _this.finishedWorkSdata = response.data;
                    //     }
                    //   }
                    // });
                    _this.$refs.finishedWork.remoteData({
                        condition: JSON.stringify(model)
                    });
                },
                modifyFn: function() {
                    var _this = this;
                    _this.switchStatus('编辑日程-工作报告', false, false, false, true);
                    _this.uploadVisible = true;
                    _this.downloadVisible = true;
                    _this.deleteVisible = true;
                    _this.customerContactData = [];
                    _this.detailCustomerContactData = [];
                    _this.finishedWorkSdata = [];
                    var model = {};
                    model.workReportId = _this.workReportFormData.workReportId;
                    if (_this.workReportFormData.workReportBusiType == '1' && _this.workReportFormData.workSummary.indexOf('1') != -1) {
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/infoworkreport/querydetail',
                            data: model,
                            callback: function(code, data, message, response) {
                                if (code == 0) {
                                    _this.customerContactData = message.data;
                                }
                            }
                        });
                    }
                    _this.$nextTick(function() {
                        _this.clearObj(_this.formdata);
                        _this.formdata.workSummary = [];
                        _this.$refs.refForm.resetFields();
                        _this.$refs.customerContactTable.setCurrentRow();
                        yufp.clone(_this.workReportFormData, _this.formdata);
                        // 初始化附件列表查询时，传入workReportId
                        var files = {
                            condition: JSON.stringify({
                                busNo: model.workReportId
                            })
                        };
                        yufp.extend(_this.initFilesParams, files);
                        if (document.getElementsByClassName('el-upload-list__item is-success')[0] != null && document.getElementsByClassName('el-upload-list__item is-success')[0] != undefined) {
                            document.getElementsByClassName('el-upload-list__item is-success')[0].innerHTML = '';
                        }
                        // 获取附件列表
                        _this.$refs.filesTable.queryFn(files);

                        // 设置附件列表组件传入workReportId
                        _this.reportUpLoadBusNo = {
                            busNo: model.workReportId
                        };
                    });
                },
                /**
                 * 工作报告->详情操作
                 */
                detailFn: function() {
                    var _this = this;
                    _this.switchStatus('查看日程-工作报告', true, true, false, false);
                    _this.uploadVisible = false;
                    _this.downloadVisible = false;
                    _this.deleteVisible = false;
                    _this.customerContactData = [];
                    _this.detailCustomerContactData = [];
                    var model = {};
                    model.workReportId = _this.workReportFormData.workReportId;
                    if (_this.workReportFormData.workReportBusiType == '1' && _this.workReportFormData.workSummary.indexOf('1') != -1) {
                        yufp.service.request({
                            method: 'GET',
                            url: '/api/infoworkreport/querydetail',
                            data: model,
                            callback: function(code, data, message, response) {
                                if (code == 0) {
                                    _this.detailCustomerContactData = message.data;
                                }
                            }
                        });
                    }

                    _this.$nextTick(function() {
                        _this.clearObj(_this.formdata);
                        _this.formdata.workSummary = [];
                        _this.$refs.refForm.resetFields();
                        yufp.clone(_this.workReportFormData, _this.formdata);
                        _this.chgWorkSummary(_this.formdata.workSummary);
                        _this.chgReportType(_this.formdata.workReportBusiType);
                        // 初始化附件列表查询时，传入noticeId
                        var files = {
                            condition: JSON.stringify({
                                busNo: _this.workReportFormData.workReportId
                            })
                        };
                        yufp.extend(_this.initFilesParams, files);
                        // 获取附件列表
                        _this.$refs.filesTable.queryFn(files);

                        // 设置附件列表组件传入NOTICEID
                        _this.reportUpLoadBusNo = {
                            busNo: _this.workReportFormData.workReportId
                        };
                    });
                    _this.setWorkType(false, false, false);
                },
                /**
                 * 弹出框->报告标题 更改
                 */
                chgWorkSummary: function(val) {
                    var _this = this;
                    console.log(val);
                    if (val != null && val != '') {
                        if (val.indexOf('2') != -1) {
                            _this.$set(_this.workSummary, 'second', true);
                            _this.workSummary.second = true;
                        } else {
                            _this.workSummary.second = false;
                            _this.formdata.workContent2 = '';
                        }
                        if (val.indexOf('3') != -1) {
                            _this.workSummary.three = true;
                        } else {
                            _this.workSummary.three = false;
                            _this.formdata.workContent3 = '';
                        }
                        if (val.indexOf('4') != -1) {
                            _this.workSummary.fouth = true;
                        } else {
                            _this.workSummary.fouth = false;
                            _this.formdata.workContent4 = '';
                        }
                        if (val.indexOf('5') != -1) {
                            _this.workSummary.five = true;
                        } else {
                            _this.workSummary.five = false;
                            _this.formdata.workContent5 = '';
                        }
                        if (val.indexOf('1') != -1) {
                            _this.isCustContact = true;
                            if (_this.viewType == 'DETAIL') {
                                _this.newBut = false;
                            } else {
                                _this.newBut = true;
                            }
                        } else {
                            _this.isCustContact = false;
                            _this.newBut = false;
                            _this.customerContactData = [];
                        }
                    } else {
                        _this.isCustContact = false;
                        _this.newBut = false;
                        _this.customerContactData = [];
                        _this.formdata.workContent2 = '';
                        _this.formdata.workContent3 = '';
                        _this.formdata.workContent4 = '';
                        _this.formdata.workContent5 = '';
                        _this.workSummary.second = false;
                        _this.workSummary.three = false;
                        _this.workSummary.fouth = false;
                        _this.workSummary.five = false;
                    }
                },
                /**
                 * 弹出框->取消按钮
                 */
                cancelFn: function() {
                    var _this = this;
                    // _this.dialogVisible = false;
                    _this.handleClose();
                },
                /**
                 * 弹出框->保存和新增按钮
                 */
                saveFn: function(operate) {
                    var _this = this;
                    var model = {};
                    yufp.clone(_this.formdata, model);
                    var validate = false;
                    _this.$refs.refForm.validate(function(valid) {
                        validate = valid;
                    });
                    var flag = false;
                    // 校验表格数据
                    _this.$refs.customerContactTable.validate(function(fields) {
                        if (!fields) {
                            flag = true;
                        }
                    });
                    if (!validate || !flag) {
                        return;
                    }
                    // 修改请求
                    if (model.workReportBusiType == '1') {
                        var d = '2:' + _this.formdata.workContent2 + ';' + '3:' + _this.formdata.workContent3 + ';' + '4:' + _this.formdata.workContent4 + ';' + '5:' + _this.formdata.workContent5;
                        _this.$set(model, 'workContent', d);
                        model.workSummary = typeof model.workSummary == 'string' ? model.workSummary : model.workSummary.join(',');
                    }
                    _this.$delete(model, 'workContent2');
                    _this.$delete(model, 'workContent3');
                    _this.$delete(model, 'workContent4');
                    _this.$delete(model, 'workContent5');
                    _this.$delete(model, 'createDate');
                    _this.$delete(model, 'lastChgDate');
                    var map = {};
                    if (model.workReportBusiType == '1' && model.workSummary.indexOf('1') != -1) {
                        var list = _this.$refs.customerContactTable.tabledata;
                        for (var key in list) {
                            if (list[key].customerContactId == null || list[key].customerContactId == '') {
                                list[key].workReportId = model.workReportId;
                            }
                            _this.$delete(list[key], '__height');
                            _this.$delete(list[key], '__selected');
                            _this.$delete(list[key], '__translateY');
                            _this.$delete(list[key], '__vkey');
                            _this.$delete(list[key], 'createDate');
                            _this.$delete(list[key], 'lastChgDate');
                            list[key] = JSON.stringify(list[key]);
                        }
                        if (list.length < 1) {
                            _this.$message('工作内容为客户接触时，请输入至少一条客户接触数据');
                            return;
                        }
                        map.customerContact = list;
                    }
                    map.workReport = JSON.stringify(model);
                    yufp.service.request({
                        method: 'POST',
                        url: '/api/infoworkreport/updateWorkReport',
                        data: map,
                        callback: function(code, message, response) {
                            if (code == 0) {
                                _this.$message('操作成功');
                                yufp.util.butLogInfo(_this.hashCode, '工作报告', '保存');
                                _this.handleClose(1);
                            }
                        }
                    });
                },
                /**
                 * 客户放大镜 回调
                 */
                custSelFn: function(data) {
                    var _this = this;
                    if (!data || data.length != 1) {
                        return;
                    }
                    _this.$refs.customerContactTable.selections[0].contactCustId = data[0].custId;
                    _this.$refs.customerContactTable.selections[0].contactCustName = data[0].custName;
                },
                /**
                 * 客户接触->新增按钮
                 */
                newData: function() {
                    var row = {};
                    var flag = false;
                    // 校验表格数据
                    this.$refs.customerContactTable.validate(function(fields) {
                        if (!fields) {
                            flag = true;
                        }
                    });
                    // 校验通过添加数据
                    if (flag) {
                        this.customerContactData.push(row);
                        this.$refs.customerContactTable.setCurrentRow(row);
                    }
                },
                /**
                 * 附件上传->检查上传文件大小和类型
                 */
                beforeAvatarUpload: function(file) {
                    var isLt10M = file.size / 1024 / 1024 < 50;
                    if (!isLt10M) {
                        this.$message.error('上传文件大小不能超过 50MB!');
                    }
                    var index = file.name.lastIndexOf('.');
                    var ext = file.name.substr(index + 1);
                    var fileType = ['image/jpeg', 'image/gif', 'image/png', 'image/bmp', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/pdf', 'application/zip', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/x-rar', 'application/x-zip-compressed', 'application/java-archive', 'image/gif', 'image/bmp', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/x-tar', 'application/octet-stream', 'application/x-rar-compressed'];
                    var count = 0;
                    var fileCheck = true;
                    for (var i in fileType) {
                        if (file.type == fileType[i] || ext == 'rar') {
                            count++;
                        }
                    }
                    if (count == 0) {
                        fileCheck = false;
                        this.$message.error('上传文件应为图片、文本、表格、压缩包格式！');
                    }
                    return fileCheck && isLt10M;
                },

                handleDelte: function() {
                    let _this = this;
                    _this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        callback: function(action) {
                            if (action === 'confirm') {
                                var model = {};
                                model.workReportId = _this.workReportFormData.workReportId;
                                yufp.service.request({
                                    method: 'POST',
                                    url: '/api/infoworkreport/delete',
                                    data: model,
                                    callback: function(code, message, response) {
                                        if (code == 0) {
                                            _this.$message.success('删除成功');
                                            yufp.util.butLogInfo(_this.hashCode, '工作报告', '单个删除');
                                            _this.getWorkReportList();
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


    /**
     * 页面传递消息处理
     * @param type 消息类型
     * @param message 消息内容
     */
    exports.onmessage = function(type, message, cite, vm) {
        vm.createDate = message.date;
        vm.getWorkReportList();
    };

    /**
     * 页面销毁时触发destroy方法
     * @param id 路由ID
     * @param cite 页面站点信息
     */
    exports.destroy = function(id, cite) {};
});