(function(vue, name) {
    vue.component(name, {
        template: '<div class="edit">\
        <link rel="stylesheet" type="text/css" href="./pages/dy/commonComponent/customerEdit.css" />\
        <yu-xform ref="applyForm" v-model="formData" label-width="140px" label-position="left">\
          <title-content title="客户信息">\
            <template slot="content">\
              <yu-xform-group :column="3">\
                <yu-xform-item label="微信" name="wechat" ctype="input"></yu-xform-item>\
                <yu-xform-item label="政治面貌" name="polStat" ctype="select" filterable data-code="CD0017"></yu-xform-item>\
                <yu-xform-item label="身体状态" name="hltStat" ctype="select" filterable data-code="HEALTH_STATE"></yu-xform-item>\
              </yu-xform-group>\
            </template>\
          </title-content>\
          <title-content title="教育信息">\
            <template slot="content">\
              <yu-xform-group :column="3">\
                <yu-xform-item label="最后毕业院校" name="comSch" ctype="input" ></yu-xform-item>\
                <yu-xform-item label="所学专业" name="schMajor" ctype="select" filterable data-code="MAJOR"></yu-xform-item>\
                <yu-xform-item label="毕业时间" name="endDate" ctype="datepicker" style="width: 100%"></yu-xform-item>\
              </yu-xform-group>\
            </template>\
          </title-content>\
          <title-content title="资产信息">\
            <template slot="content">\
              <yu-xform-group :column="3">\
                <yu-xform-item label="房产数量" name="houseCount" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="收入来源" name="incomeSrc" ctype="select" multiple data-code="CD0376"></yu-xform-item>\
                <yu-xform-item label="车辆情况" ctype="select" name="carFlg" data-code="YES_NO"></yu-xform-item>\
              </yu-xform-group>\
            </template>\
          </title-content>\
          <title-content title="房产信息">\
            <template slot="right">\
              <yu-button type="primary" icon="el-icon-plus" @click="newData">新增一行</yu-button>\
            </template>\
            <template slot="content">\
              <yu-xtable ref="listTable" :data="list" :rules="rules" :pageable="false" style="width: 100%">\
                <yu-xtable-column label="房产状况" prop="houseInfo" ctype="select" data-code="PROPERTY_MORTGAGE_STATUS"></yu-xtable-column>\
                <yu-xtable-column label="购置时间" prop="purDt" ctype="datepicker"></yu-xtable-column>\
                <yu-xtable-column label="购置原价" prop="purPrc" ctype="input"></yu-xtable-column>\
                <yu-xtable-column label="操作" width="80">\
                  <template slot-scope="scope">\
                    <yu-button type="text" @click="deleteRow(scope.$index)">删除</yu-button>\
                  </template>\
                </yu-xtable-column>\
              </yu-xtable>\
            </template>\
          </title-content>\
          <title-content title="状态">\
            <template slot="content">\
              <yu-xform-group :column="3">\
                <yu-xform-item label="状态" name="status" ctype="select" data-code="ASSIGN" disabled></yu-xform-item>\
            </template>\
          </title-content>\
          <!--<title-content title="管户信息">\
            <template slot="content">\
              <yu-xform-group :column="3">\
                <yu-xform-item label="客户经理所属团队" name="commentContent" ctype="select"></yu-xform-item>\
              </yu-xform-group>\
            </template>\
          </title-content>-->\
          <div class="dialog-footer">\
            <el-button @click="close">取消</el-button>\
            <el-button v-if="formData.status !=\'02\'" @click="save(01)">保存</el-button>\
            <el-button v-if="formData.status ==\'02\'" @click="withdrawfn(formData.instanceid)">撤回</el-button>\
            <el-button v-if="formData.status !=\'02\'" type="primary" @click="save(02)">提交</el-button>\
          </div>\
        </yu-xform>\
        <!-- 工作报告审批流程提交组件-->\
        <yufp-wf-init ref="yufpWfInit" @afterinit="onAfterInit" @afterclose="onAfterClose" @endrefresh="refreshfn" :common-params="wfCommonParams">\
        </yufp-wf-init>\
      </div>',
        props: {
            orgIdAuth: String
        },
        data: function() {
            var roles = yufp.session.roles;
            var selectRoleId = yufp.sessionStorage.get('selectRole');
            var selectRoleCode = '';
            var selectRoleName = '';
            for (let index = 0; index < roles.length; index++) {
                const element = roles[index];
                if (element.id == selectRoleId) {
                    selectRoleCode = element.code;
                    selectRoleName = element.name;
                }
            };
            return {
                custIdx: '',
                newDatasj: '',
                formData: {},
                list: [],
                rules: {
                    purPrc: [
                        { validator: yufp.validator.moneyFormat, trigger: 'blur' },
                        { required: true, message: '请选择项' }
                    ],
                    houseInfo: [{ required: true, message: '请选择项', trigger: 'change' }],
                    purDt: [{ required: true, message: '请选择项' }]

                },
                isTeam: '',
                selectRoleCode: selectRoleCode,
                wfCommonParams: {
                    sessionInstuCde: yufp.session.instu.code,
                    sessionOrgCode: yufp.session.org.code,
                    sessionLoginCode: yufp.session.user.loginCode
                }
            };
        },
        created: function() {
            var _this = this;
            _this.getIsItem();
        },
        watch: {
            list (val) {
                if(val){
                    this.formData.houseCount = this.list.length;
                }
            }
        },
        methods: {
            // 撤回
            withdrawfn: function(instanceId) {
                var _this = this;
                params = {
                    'instanceId': instanceId
                }
                this.$confirm('确定要执行撤回操作吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(function() {
                    _this.$refs.yufpWfInit.withdraw(params);
                    _this.close('update');
                })
            },
            refreshfn: function() {
                this.$refs.stylesheet.remoteData();
            },
            getIsItem: function() {
                var _this = this;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/ocrmfciadmitbelong/isatTeam',
                    callback: function(code, message, response) {
                        if (code == 0 && response.code === 0) {
                            _this.isTeam = response.data;
                        }
                    }
                })
            },
            getCustInfo: function(custId) {
                let _this = this;
                _this.custIdx = custId;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/pcustbaseinfo/queryCustlist',
                    data: {
                        condition: JSON.stringify({ custId: custId, type: '02' }) // 进入修改页面添加type为02或者空
                    },
                    callback: function(code, message, response) {
                        _this.$refs.applyForm.resetFields();
                        if (code === 0) {
                            let data = response.data;
                            for (let key in data) {
                                _this.formData[key] = data[key];
                            }
                            if (data.crmFCiUserInformation) {
                                for (let key in data.crmFCiUserInformation) {
                                    _this.formData[key] = data.crmFCiUserInformation[key];
                                }
                            }
                            if (!_this.formData.carFlg) {
                                _this.formData.carFlg = data.carFlg || '';
                            }
                            if (!_this.formData.incomeSrc) {
                                _this.formData.incomeSrc = data.incomeSrc || '';
                            }
                            _this.list = data.ciUserAssetsDTOlist || [];
                            _this.formData.incomeSrc = _this.formData.incomeSrc ? _this.formData.incomeSrc.split(',') : [];
                        }
                    }
                });
            },
            close: function(val) {
                this.$emit('handleediteclose', val === 'update');
            },
            setFormData: function(data) {
                this.$refs.applyForm.setFormData(data);
                this.list = data.list;
            },
            save: function(type) {
                var _this = this;
                var flag = true;
                if (_this.list[0]) {
                    var purPrcval = _this.list[0].purPrc;
                    var regPos = /^\d+(\.\d+)?$/;
                    var isNum = regPos.test(purPrcval);
                    if (!isNum) {
                        _this.$message({
                            type: 'warning',
                            message: '置购原价格式不对'
                        });
                        return;
                    }
                    _this.$refs.listTable.validate(function(fields) {
                        if (fields) {
                            flag = false
                        }
                    });
                    if (!flag) {
                        return;
                    }
                }
                if (_this.formData.seqno != null && _this.formData.seqno.length != 0 && _this.formData.status != '04') {
                    _this.newDatasj = _this.formData.seqno;
                } else {
                    _this.newDatasj = String(new Date().getTime()); // 随机时间戳
                }
                // if (_this.newDatasj == null || _this.newDatasj.length == 0) {
                //     _this.newDatasj = String(new Date().getTime()); // 随机时间戳
                // }
                var form = {
                    carFlg: _this.formData.carFlg,
                    comSch: _this.formData.comSch,
                    createDate: _this.formData.createDate,
                    createUser: _this.formData.createUser,
                    custId: _this.custIdx,
                    endDate: _this.formData.endDate,
                    incomeSrc: _this.formData.incomeSrc.join(),
                    list: _this.list,
                    physicalState: _this.formData.hltStat,
                    politicalOutlook: _this.formData.polStat,
                    schMajor: _this.formData.schMajor,
                    // seqno: _this.formData.seqno,
                    wechat: _this.formData.wechat,
                    seqno: _this.newDatasj,
                    houseCount: _this.formData.num,
                    status: type == '01' ? '01' : '02',
                    instanceId: _this.formData.instanceid
                };

                var roles = yufp.session.roles;
                var roleCodes = '';
                for (let index = 0; index < roles.length; index++) {
                    const element = roles[index];
                    roleCodes += element.code;
                }
                var flagzh = (roleCodes.indexOf('R017') != -1);
                if (flagzh) {
                    form.status = '04';
                    type = '04';
                };
                yufp.service.request({
                    method: 'POST',
                    data: form,
                    url: '/api/pcustbaseinfo/updateCust',
                    callback: function(code, message, response) {
                        if (code === 0 && response.code === 0) {
                            if (type == '02') {
                                // 提交事件再走组件
                                var commitData = {};
                                commitData.instanceId = form.instanceId || '';
                                commitData.bizSeqNo = _this.newDatasj || ''; // 关联业务编号
                                commitData.applType = 'WFCFE'; // 工作报告审批流程
                                commitData.custName = yufp.session.userName; // 展示主题名称
                                commitData.custId = yufp.session.userId;
                                commitData.paramMap = {
                                    selectRole: _this.selectRoleCode, // 当前用户角色
                                    atItem: _this.isTeam // 当前属于哪个团队
                                };
                                // 申请上架
                                var load = _this.$loading();
                                if (commitData.instanceId && commitData.instanceId.length != 0) {
                                    _this.$refs.yufpWfInit.wfSave(commitData, load);
                                } else {
                                    _this.$refs.yufpWfInit.wfInit(commitData, load);
                                }
                            }
                            _this.$message.success('编辑成功');
                            _this.close('update');
                        } else {
                            _this.$message.warning(response.message);
                        }
                    }
                });
            },
            newData: function() {
                var row = {
                    houseInfo: '',
                    purDt: '',
                    purPrc: '',
                    custId: this.formData.custId
                };
                var flag = false;
                // 校验表格数据
                this.$refs.listTable.validate(function(fields) {
                    if (!fields) {
                        flag = true;
                    }
                });
                // 校验通过添加数据
                if (flag) {
                    this.list.push(row);
                    this.$refs.listTable.setCurrentRow(row);
                }
            },
            deleteRow: function(index) {
                this.list.splice(index, 1);
            },
            onAfterInit: function(data) {},
            // 审批页面关闭后
            onAfterClose: function() {
                var _this = this;
                _this.$refs.listTable.remoteData();
            },
        }
    });
}(Vue, 'customer-edit'));