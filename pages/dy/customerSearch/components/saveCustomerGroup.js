/*
 * @create by: yangding@yusys.com.cn
 * @Date: 2021-09-03 09:36:44
 * @update by:
 * @description: 客户查询编辑
 */

(function(vue, name) {
    vue.component(name, {
        template: '  <div class="bankAccount">\
      <link rel="stylesheet" type="text/css" href="./pages/dy/customerSearch/components/saveCustomerGroup.css"/>\
      <div class="edit" v-if="showList">\
      <div v-for="(item,index) in options" :key="index" class="groupItem">\
       <div style="cursor:pointer" @click="getCurrent(index)" :class="{ active : activeIndex === index }">\
        <p>客群：{{ item.custGroupName }}</p>\
        <p>描述：{{item.custGroupDescribe}}</p>\
       </div>\
      </div>\
      <div class="groupItem addGroup">\
      <el-link :underline="false" @click="showList = false">添加客群</el-link>\
      </div>\
      <div slot="footer" class="dialog-footer" style="text-align: center">\
        <el-button @click="close">取消</el-button>\
        <el-button type="primary" id="saveOne" @click="saveNewGroup">保存</el-button>\
      </div>\
    </div>\
    <div v-else >\
        <div class="add-group-layout">\
            <p class="add-group-title">客群名称</p>\
            <yu-input v-model="formPayloadData.custGroupName" maxlength="10"/>\
            <p class="add-group-title">客群描述</p>\
            <yu-input  type="textarea" v-model="formPayloadData.custGroupDescribe"\
            :autosize="{ minRows: 4, maxRows: 8}" maxlength="100" />\
            <p class="add-group-title">添加到我关注的客群</p>\
            <yu-switch v-model="formPayloadData.isFocus" on-value="01" off-value="02"></yu-switch>\
            <p style="margin-top: 24px;color:#909399">可以稍后在群组详情中添加成员</p>\
        </div>\
      <div slot="footer" class="dialog-footer" style="text-align: center">\
        <el-button @click="showList = true">取消</el-button>\
        <el-button type="primary" id="saveTwo" @click="saveNewGroup">保存</el-button>\
      </div>\
    </div>\
      </div>',
        props: {
            title: {
                type: String,
                default: ''
            },
            filterData: Object,
            orgIdAuth: String
        },
        data: function() {
            return {
                activeIndex: 0,
                showList: true,
                options: [],
                formPayloadData: {
                    custGroupDescribe: '',
                    custGroupName: '',
                    isFocus: ''
                }
            };
        },
        methods: {
            getCurrent: function(index) {
                this.activeIndex = index;
            },
            addGroup: function() {
                this.close();
                this.$message('保存成功');
            },
            saveNewGroup: function() {
                // 选择已有还是新增的客户群数据
                var _this = this;
                $("#saveOne").addClass("yu-disable");
                $("#saveTwo").addClass("yu-disable");
                let obj = this.showList ? this.options[this.activeIndex] : this.formPayloadData;
                var param = {
                    crmCustomerDTO: _this.filterData,
                    fCgPreparationList: _this.$parent.$parent.selectRows,
                    fCissCgBase: {
                        custGroupId: obj.custGroupId
                    },
                    orgIdAuth: _this.orgIdAuth
                };
                if (this.showList) {
                    param.fCissCgBase = {
                        custGroupId: obj.custGroupId
                    };
                } else {
                    param.fCissCgBase = obj;
                }
                if(!_this.showList){
                    if(!_this.formPayloadData.custGroupName){
                        _this.$message.warning('请输入客群名称');
                        return;
                    }
                    if(!_this.formPayloadData.custGroupDescribe){
                        _this.$message.warning('请输入客群描述');
                        return;
                    }
                }
                yufp.service.request({
                    method: 'POST',
                    data: param,
                    url: '/api/ocrmfcicgbase/insertBase',
                    callback: function(code, message, response) {
                        $("#saveOne").removeClass("yu-disable");
                        $("#saveTwo").removeClass("yu-disable");
                        if (code === 0 && response.data == '0') {
                            _this.$message.success('保存成功');
                            _this.close();
                        } else {
                            _this.$message.warning(response.message);
                        }
                    }
                });
            },
            close: function() {
                this.showList = true;
                // this.$parent.$parent.saveCustomerDialogVisible = false;
                this.$emit('close-add');
            }
        },
        created: function() {
            let _this = this;
            let data = {
                userCode: yufp.session.userCode,
                org: yufp.session.org.code,
                orgIdAuth: this.$parent.$parent.orgIdAuth,
                isFocus: '',
                page: 1,
                size: 5
            };
            yufp.service.request({
                method: 'GET',
                data: data,
                url: '/api/ocrmfcicgbase/queryBaselist',
                callback: function(code, message, response) {
                    if (response.code == '0') {
                        _this.options = response.data;
                    }
                }
            });
        }
    });
}(Vue, 'save-customer-group'));