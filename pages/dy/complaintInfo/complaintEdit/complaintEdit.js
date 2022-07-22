(function (vue, name) {
    vue.component(name, {
        template: '<div class="edit">\
        <link rel="stylesheet" type="text/css" href="./pages/dy/complaintInfo/complaintEdit/complaintEdit.css"/>\
        <yu-xform ref="applyForm" v-model="formData" label-width="100px" label-position="top">\
            <div class="title">客户基本信息</div>\
            <yu-xform-group :column="3">\
                <yu-xform-item label="工单编号" name="sheetId" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="灰名单标识" name="greyflag" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="所涉及业务" name="tsBusiness" ctype="input" disabled></yu-xform-item>\
            </yu-xform-group>\
            <yu-xform-group :column="3">\
                <yu-xform-item label="客户姓名" name="custName" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="客户类型" name="custcategory" ctype="select" disabled></yu-xform-item>\
                <yu-xform-item label="渠道" name="tsChannel" ctype="input" disabled></yu-xform-item>\
            </yu-xform-group>\
            <yu-xform-group :column="3">\
                <yu-xform-item label="卡号/帐号" name="cardnbr" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="客户性别" name="gender" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="分行投诉主任意见" name="directorOpinion" ctype="input" disabled></yu-xform-item>\
            </yu-xform-group>\
            <yu-xform-group :column="3">\
                <yu-xform-item label="预留手机号码" name="mobilephone" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="投诉所属机构" name="tsDepart" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="结案日期" name="endDate" ctype="input" disabled></yu-xform-item>\
            </yu-xform-group>\
            <yu-xform-group :column="3">\
                <yu-xform-item label="来电号码" name="callnum" ctype="input" disabled></yu-xform-item>\
                <yu-xform-item label="投诉/查询类型" name="tsType" ctype="select" disabled></yu-xform-item>\
                <yu-xform-item label="备注" name="tsNote" ctype="input" disabled></yu-xform-item>\
            </yu-xform-group>\
            <yu-xform-group :column="1">\
                <yu-xform-item label="投诉原因" name="complainReason" ctype="input" disabled></yu-xform-item>\
            </yu-xform-group>\
            <div class="title">投诉内容</div>\
            <yu-xform-item label="投诉内容" name="tsContent" ctype="textarea" disabled></yu-xform-item>\
            <div class="title">处理结果</div>\
            <yu-xform-item label="反馈结果" name="sheetResult" ctype="textarea"></yu-xform-item>\
            <div class="dialog-footer">\
                <el-button @click="close">关闭</el-button>\
                <el-button @click="save">保存</el-button>\
            </div>\
        </yu-xform>\
      </div>',
        props: {
            // sheetId: String
        },
        data: function () {
            var _this = this;
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
                newDatasj: '',
                formData: {},
                sheetId: '',
                // rules: {
                //     purPrc: [
                //         { validator: yufp.validator.moneyFormat, trigger: 'blur' },
                //         { required: true, message: '请选择项' }
                //     ],
                //     houseInfo: [{ required: true, message: '请选择项', trigger: 'change' }],
                //     purDt: [{ required: true, message: '请选择项' }]

                // },
                selectRoleCode: selectRoleCode,
            };
        },
        created: function () {
            var _this = this;
        },
        watch: {
        },
        methods: {
            getCustInfo: function (sheetId) {
                let _this = this;
                _this.sheetId = sheetId;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/complaintFeedBackResources/queryComplaintSheetInfo',
                    data: {
                        condition: JSON.stringify({ sheetId: sheetId })
                    },
                    callback: function (code, message, response) {
                        _this.$refs.applyForm.resetFields();
                        if (code === 0) {
                            yufp.util.butLogInfo(hashCode, '投诉反馈', '投诉处理');
                            let data = response.data;
                            for (let key in data) {
                                _this.formData[key] = data[key];
                            }
                        }
                    }
                });
            },
            close: function () {
                this.$emit('handleediteclose');
            },
            save: function () {
                var _this = this;
                if (!_this.formData.sheetResult) {
                    _this.$message.warning('请输入反馈结果!');
                    return;
                }
                yufp.service.request({
                    method: 'GET',
                    url: '/api/complaintFeedBackResources/saveData',
                    data: {
                        condition: JSON.stringify({
                            sheetIds: _this.sheetId,
                            sheetResult: _this.formData.sheetResult
                        })
                    },
                    callback: function (code, message, response) {
                        if (code === 0) {
                            console.log(response);
                            _this.$message(response.message);
                            _this.close();
                        }
                    }
                });
            }
        }
    });
}(Vue, 'complaint-edit'));