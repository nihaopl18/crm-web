/**
 * yufp-governed-cust-selector
 * 所辖客户放大镜
 * Created by taoting1 on 2019/02/15.
 */
// yufp.require.require('./custom/widgets/js/yufpOrgTree.js');
(function(vue, $, name) {
    // 注册用户组件
    vue.component(name, {
        template: '<div>\
      <slot name="trigerEl">\
       <div @click="handleInputFocus" class="yufp-governed-cust-selector_sel" style="position:relative;">\
        <div class="yu-select__tags" style="width:100%;">\
          <span style="display:contents">\
            <span v-for="(item,index) in selectedList" class="yu-tag yu-tag--info yu-tag--small">\
              <span>{{item.custName}}</span>\
              <i class="el-icon-close yu-tag__close" @click.self.stop="tagCloseClick(index)"></i>\
            </span>\
          </span>\
        </div>\
        <el-input ref="sel-input" :size="size" :icon="icon" :placeholder="placeholderSelf" :disabled="disabled"\
        @focus="onIconClickFn" :on-icon-click="onIconClickFn" readonly name="用户" :style="{height: inputBoxHeight + \'px\'}"></el-input>\
       </div>\
       </slot>\
       <el-dialog-x :title="selectTit" :visible.sync= "dialogVisible" :height="height" :width = "width" :top="top">\
       <el-form-q ref="queryCondition"\
       :fieldData="user.fieldData" :buttons="user.buttons" :columns="user.fieldColumns" :labelWidth="labelWidth" ></el-form-q>\
       <div class="test">\
       <el-table-x ref="usertable" :table-data="user.tableData" :checkbox="user.checkbox" :max-height="user.maxHeight"\
       :data-url="user.dataUrl" :base-params="user.dataParams" :row-index="rowIndex" :table-columns="user.majTableColumns" :default-load="user.load"></el-table-x>\
       <div slot="footer" class="dialog-footer"  align="center">\
       <el-button type="primary" @click="confirmFn">确 定</el-button>\
       </div>\
       </div>\
       </el-dialog-x>\
       </div>',
        props: {
            value: String,
            rawValue: String,
            size: String,
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '添加客户'
            },
            icon: {
                type: String,
                default: 'search'
            },
            params: Object
        },
        data: function() {
            return this.createData();
        },
        // created: function () {
        //   this.selectedVal = this.rawValue ? this.rawValue : this.value.custGroupNames;
        // },
        mounted: function() {
            var _this = this;
            // 查询条线信息
            yufp.service.request({
                method: 'GET',
                url: backend.custpubService + '/api/governedcust/getbusitype',
                data: {
                    condition: JSON.stringify({ userId: yufp.session.userId })
                },
                callback: function(code, message, response) {
                    if (code == 0 && response.code === 0) {
                        if (response.data) {
                            var data = response.data;
                            _this.paramorgIdAuth = data.orgIdAuth;
                            _this.parambusiType = data.busiType;
                            _this.userCustType = data.userCustType;
                            // if (data.userCustType == '2') {
                            //   _this.user.fieldData[0].value = '2';
                            // } else {
                            //   _this.user.fieldData[0].value = '1';
                            // }
                        }
                    } else {
                        _this.$message.error('查询失败');
                    }
                }
            });
            yufp.extend(_this.placeholderSelf, _this.placeholder);
        },
        methods: {

            createData: function() {
                var me = this;
                var temp = me.getDefaultData();
                yufp.extend(true, temp, me.params);
                // if (temp.user.dataParams.roleId == '') {
                //   temp.user.fieldData.push({
                //     placeholder: '角色',
                //     field: 'roleId',
                //     type: 'select',
                //     options: []
                //   });
                //   me.setOptionsByUrl(2, backend.appOcaService + '/api/util/getrolebyuser');
                // }

                // if (temp.user.dataParams.dutyId == '') {
                //   temp.user.fieldData.push({
                //     placeholder: '岗位',
                //     field: 'dutyId',
                //     type: 'select',
                //     options: []
                //   });
                //   me.setOptionsByUrl(temp.user.fieldData.length - 1, backend.appOcaService + '/api/util/getdutybyuser');
                // }
                // temp.user.dataParams.searchType = temp.org.searchType;
                return temp;
            },
            getDefaultData: function() {
                var me = this;
                var maxHeight;
                // 证件类型field的下拉选项，全部证件类型
                yufp.lookup.bind('CD0011', function(lookup) {
                    optionCert = lookup;
                });
                // 价值等级field的下拉选项，全部客户价值等级
                var optionVal, optionCert;
                yufp.lookup.bind('CD0243', function(lookup) {
                    optionVal = lookup;
                });
                return {
                    selectedList: [],
                    placeholderSelf: '',
                    inputBoxHeight: 30,
                    parambusiType: '',
                    paramorgIdAuth: '',
                    labelWidth: '100px',
                    height: '700px',
                    top: '1%',
                    width: '1000px',
                    selectedVal: '',
                    custgroupid: '',
                    custgroupdata: [],
                    dialogVisible: false,
                    selectTit: '客户筛选',
                    // 表格是否展示序号
                    rowIndex: true,
                    user: {
                        checkbox: true,
                        maxHeight: maxHeight,
                        fieldColumns: 3,
                        tableData: [],
                        fieldData: [
                            //{ label: '客户类型',
                            // field: 'custType',
                            //type: 'select',
                            //value: '2',
                            // dataCode: 'CD0016',
                            //  rules: {required: true, message: '字段不能为空', trigger: 'blur' },
                            // change: function (type, model) {
                            //    model.certType = '';
                            //    model.valueLev = '';
                            //     // 个人
                            //        if (type == '1') {
                            // 修改证件类型field的下拉选项
                            //          yufp.lookup.bind('CD0348', function (lookup) {
                            //          me.user.fieldData[4].options = lookup;
                            //       })};},
                            //       // 修改价值等级field的下拉选项
                            //       yufp.lookup.bind('CD0350', function (lookup) {
                            //         me.user.fieldData[6].options = lookup;
                            //       });
                            //     } else if (type == '2') {
                            //       // 对公
                            //       // 修改证件类型field的下拉选项
                            //       yufp.lookup.bind('CD0349', function (lookup) {
                            //         me.user.fieldData[4].options = lookup;
                            //       });
                            //       // 修改价值等级field的下拉选项
                            //       yufp.lookup.bind('CD0351', function (lookup) {
                            //         me.user.fieldData[6].options = lookup;
                            //       });
                            //     } else if (type == '') {
                            //       me.user.fieldData[4].options = optionCert;
                            //       me.user.fieldData[6].options = optionVal;
                            //     }
                            //   }},
                            // { label: '客户状态', field: 'custStatus', type: 'select', dataCode: 'CD0019'},
                            //{ label: '是否准入', field: 'isAdmitEnter', type: 'select', value: '1', rules: {required: true, message: '字段不能为空', trigger: 'blur' }, dataCode: 'YES_NO_ADMIT' },

                            { label: 'ECIF号', field: 'custId', type: 'input', clearable: true },
                            { label: '客户名称', field: 'custName', type: 'input', clearable: true },
                            { label: '证件类型', field: 'certType', type: 'select', dataCode: 'CD0348' },
                            { label: '证件号码', field: 'certNo', type: 'input', clearable: true },
                            // 客户等级
                            { label: '客户等级', field: 'custGrade', type: 'select', dataCode: 'CUST_GRADE' },
                            //nds号
                            { label: 'NDS号', field: 'ndsCustNo', type: 'input', clearable: true },
                            //手机号
                            { label: '手机号', field: 'custPhoneNo', type: 'input', clearable: true },
                            //对公价值等级
                            // { label: '客户价值等级', field: 'valueLev', type: 'select', dataCode: 'CD0351'},
                            //{ label: '客户价值等级', field: 'valueLev', type: 'select', options: optionVal},
                            //{ label: '客户服务等级', field: 'servLev', type: 'select', dataCode: 'CD0032'},
                            // { label: '是否涉农客户', field: 'famFlg', type: 'select', dataCode: 'CD0238'},
                            // { label: '客户分配状态', field: 'custAssignStat', type: 'select', dataCode: 'CD0342'},
                            { label: '所属机构', field: 'belongBrch', type: 'custom', is: 'yufp-org-tree' },
                            { label: '所属客户经理', field: 'belongMgr', type: 'custom', is: 'yufp-mgr-selector' }
                        ],
                        // 查询表单按钮配置
                        buttons: [{
                                label: '搜索',
                                op: 'submit',
                                type: 'primary',
                                icon: 'search',
                                /**
                                 * @param model {Object} 查询表单的表单数据
                                 */
                                click: function(model, valid) {
                                    if (valid) {
                                        var ld1 = me.$loading({
                                            // 'div .el-dialog-x .el-dialog-x--x .test', target: '.el-table--border .el-table--enable-row-hover .el-table--enable-row-transition',.el-table__body-wrapper
                                            target: '.test',
                                            body: true,
                                            text: '拼命加载中'
                                        });
                                        var obj = {};
                                        yufp.clone(model, obj);
                                        obj.userId = yufp.session.userId;
                                        obj.orgCode = yufp.session.org.code;
                                        obj.busiType = me.parambusiType;
                                        obj.orgIdAuth = me.paramorgIdAuth;
                                        obj.custType = '1';
                                        obj.isAdmitEnter = '1';
                                        var param = {
                                            condition: JSON.stringify(obj)
                                        };
                                        // 零售
                                        // if (model.custType == '1') {
                                        me.user.dataUrl = backend.custpubService + '/api/governedcust/listper';
                                        // } else if (model.custType == '2') {
                                        //   // 对公
                                        //   me.user.dataUrl = backend.custpubService + '/api/governedcust/listorg';
                                        // }
                                        yufp.service.request({
                                            method: 'GET',
                                            url: me.user.dataUrl,
                                            data: param,
                                            callback: function(code, message, response) {
                                                ld1.close();
                                            }
                                        });
                                        me.$refs.usertable.remoteData(param);
                                        //  me.$refs.usertable.remoteData(param);
                                        // me.$nextTick(function () {
                                        //  me.$refs.usertable.remoteData(param);
                                        // });
                                    }
                                }
                            },
                            { label: '重置', op: 'reset', type: 'primary', icon: 'yx-loop2' }
                        ],
                        dataParams: {
                            condition: JSON.stringify({
                                custType: '1',
                                // userId
                                userId: yufp.session.userId,
                                // orgCode
                                orgCode: yufp.session.org.code,
                                // 条线信息
                                busiType: me.parambusiType,
                                // 授权机构
                                orgIdAuth: me.paramorgIdAuth
                            })
                        },
                        // 默认请零售客户数据
                        dataUrl: backend.custpubService + '/api/governedcust/listper',
                        // 默认不加载
                        load: false,
                        majTableColumns: [
                            //{ label: '客户类型', prop: 'custType', width: '90', resizable: true, dataCode: 'CD0016' },
                            // { label: '客户状态', prop: 'custStatus', width: '150', resizable: true, dataCode: 'CD0019' },
                            { label: '客户编号', prop: 'custId', width: '100', resizable: true },
                            { label: '客户名称', prop: 'custName', width: '120', resizable: true },
                            { label: '证件类型', prop: 'certType', width: '100', resizable: true, dataCode: 'CD0011' },
                            { label: '证件号码', prop: 'certNo', resizable: true },
                            { label: '客户等级', prop: 'custGrade', width: '100', resizable: true, dataCode: 'CUST_GRADE' },
                            { label: 'NDS号', prop: 'ndsCustNo', width: '100', resizable: true },
                            { label: '手机号', prop: 'custPhoneNo', width: '100', resizable: true },
                            // { label: '价值等级', prop: 'valueLev', width: '100', resizable: true, dataCode: 'CD0243' },
                            //{ label: '服务等级', prop: 'servLev', width: '80', resizable: true, dataCode: 'CD0032' },
                            { label: '归属机构', prop: 'orgName', width: '120', resizable: true }
                        ]
                    },
                    majInfoTableColumns: [
                        { label: '客户群编号', prop: 'custGroupId', width: '120', resizable: true },
                        { label: '客户群名称', prop: 'custGroupName', width: '150', resizable: true },
                        { label: '客户号', prop: 'custOrigin', width: '100', resizable: true, dataCode: 'CLIENT_ORIGIN' },
                        { label: '客户名称', prop: 'groupMemberType', width: '120', resizable: true, dataCode: 'CUST_GROUP_TYPE' },
                        { label: '成员数', prop: 'custNum', resizable: true },
                        { label: '创建人', prop: 'creatorId', resizable: true },
                        {
                            label: '创建日期',
                            prop: 'createDate',
                            formatter: function(row, cloumn) {
                                return yufp.util.dateFormat(row.createDate, '{y}-{m}-{d}');
                            },
                            resizable: true
                        },
                        { label: '创建机构', prop: 'createOrgan', resizable: true },
                        {
                            label: '最近更新日期',
                            prop: 'lastChgDt',
                            formatter: function(row, cloumn) {
                                return yufp.util.dateFormat(row.lastChgDt, '{y}-{m}-{d}');
                            },
                            resizable: true
                        }
                    ]
                };
            },
            handleInputFocus: function() {
                this.$refs['sel-input'].focus();
                this.placeholderSelf = '';
            },
            tagCloseClick: function(index) {
                this.selectedList.splice(index, 1);
                this.$emit('select-fn', this.selectedList);
                if (this.selectedList.length === 0) {
                    yufp.extend(this.placeholderSelf, this.placeholder);
                }
            },
            getValueByKey: function(array, k) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i].id == k) {
                        return array[i].label;
                    }
                }
            },
            // setOptionsByUrl: function (order, url) {
            //   var me = this;
            //   yufp.service.request({
            //     url: url + '?userId=' + yufp.session.userId,
            //     method: 'get',
            //     callback: function (code, message, response) {
            //       if (response != null && response.data != null) {
            //         me.user.fieldData[order].options = response.data;
            //       }
            //     }
            //   });
            // },
            onIconClickFn: function(val) {
                this.dialogVisible = true;
                this.$nextTick(function() {
                    this.$refs.queryCondition.$children[0].resetFields();
                    this.$refs.usertable.clearSelection();
                    // var params = this.params.user.dataParams;
                    // this.$refs.usertable.remoteData(params);
                });
                this.$emit('click-fn');
            },
            queryFn: function(params) {
                var temp = params;
                // temp.roleId = temp.roleId == '' || temp.roleId == undefined ? this.user.dataParams.roleId : temp.roleId;
                // temp.roleId = (temp.roleId == '' || temp.roleId == undefined) ? this.user.dataParams.roleId : temp.roleId;
                temp.custGroupName = temp.custGroupName == '' || temp.custGroupName == undefined ? this.user.dataParams.custGroupName : temp.custGroupName;
                temp.custOrigin = temp.custOrigin == '' || temp.custOrigin == undefined ? this.user.dataParams.custOrigin : temp.custOrigin;
                temp.clientNO = temp.clientNO == '' || temp.clientNO == undefined ? this.user.dataParams.clientNO : temp.clientNO;
                temp.clientName = temp.clientName == '' || temp.clientName == undefined ? this.user.dataParams.clientName : temp.clientName;
                temp.idType = temp.idType == '' || temp.idType == undefined ? this.user.dataParams.idType : temp.idType;
                temp.idNO = temp.idNO == '' || temp.idNO == undefined ? this.user.dataParams.idNO : temp.idNO;
                temp.customerManager = temp.customerManager == '' || temp.customerManager == undefined ? this.user.dataParams.customerManager : temp.customerManager;
                temp.createOrgan = temp.createOrgan == '' || temp.createOrgan == undefined ? this.user.dataParams.createOrgan : temp.createOrgan;
                temp.createDate = temp.createDate == '' || temp.createDate == undefined ? this.user.dataParams.createDate : temp.createDate;
                temp.endDate = temp.endDate == '' || temp.endDate == undefined ? this.user.dataParams.endDate : temp.endDate;
                this.$refs.usertable.remoteData(temp);
            },
            getCondition: function() {
                return this.$refs.queryCondition.fm;
            },
            // currentChangeFn: function (nodeData, node, self) {
            //   // 仅用于复选框
            //   if (this.treeCheckbox) {
            //     var params = this.getCondition();
            //     var code = this.$refs.orgtree.getCheckedKeys().toString();
            //     params.orgCode = code;
            //     this.queryFn(params);
            //   }
            // },
            getInputBoxHeight: function() {
                var _this = this;
                _this.$nextTick(function() {
                    _this.inputBoxHeight = document.getElementsByClassName('yu-select__tags')[0].offsetHeight || 30;
                });
            },
            confirmFn: function() {
                var me = this;
                var data;
                if (this.$refs.usertable.selections.length != 0) {
                    data = this.$refs.usertable.selections;
                } else {
                    data = me.custgroupid;
                }
                if (data.length == 0) {
                    this.$message('请至少选择一条数据!', '提示');
                    return false;
                }
                if (!this.user.checkbox && data.length > 1) {
                    this.$message('你只能选择一条数据!', '提示');
                    return;
                }
                this.$emit('input', this.array2String(data).custId);
                this.$emit('select-fn', data);
                this.$nextTick(function() {
                    me.selectedVal = me.array2String(data).custName;
                    me.selectedList = data;
                    // me.getInputBoxHeight();
                });
                this.dialogVisible = false;
            },
            // 对外提供选择器显示值
            getRawValue: function() {
                return this.selectedVal;
            },
            array2String: function(array) {
                    var custGroups = {};
                    var custId = '';
                    var custName = '';
                    // var s = '';
                    for (var i = 0; i < array.length; i++) {
                        if (i == 0) {
                            custId = array[i].custId;
                            custName = array[i].custName;
                        } else {
                            custId += ',' + array[i].custId;
                            custName += ',' + array[i].custName;
                        }
                    }
                    custGroups.custId = custId;
                    custGroups.custName = custName;
                    return custGroups;
                }
                // array2String: function (array, label) {
                //   var s = '';
                //   for (var i = 0; i < array.length; i++) {
                //     if (i == 0) {
                //       s += array[i][label];
                //     } else {
                //       s += ',' + array[i][label];
                //     }
                //   }
                //   return s;
                // }
        },
        watch: {
            value: function(val) {
                this.selectedVal = val;
                var arr = [];
                var tempVal = val.split(';');
                for (var i = 0; i < tempVal.length; i++) {
                    var data = tempVal[i].split('/');
                    arr.push({ custName: data[0], custId: data[1] });
                }
                this.selectedList = arr;
                this.getInputBoxHeight();
            },
            rawValue: function(val) {
                this.selectedVal = val;
                var arr = [];
                var tempVal = val.split(';');
                for (var i = 0; i < tempVal.length; i++) {
                    var data = tempVal[i].split('/');
                    arr.push({ custName: data[0], custId: data[1] });
                }
                this.selectedList = arr;
            },
            params: {
                handler: function(val) {
                    yufp.extend(true, this, val);
                },
                deep: true
            },
            custgroupdata: function(val) {
                if (val) {
                    var groupname = '';
                    if (val.length == 1) {
                        groupname += val[i].custGroupName;
                    } else {
                        for (var i = 0; i < val.length; i++) {
                            groupname += val[i].custGroupName + ',';
                            if (i == val.length - 1) {
                                groupname += val[i].custGroupName;
                            }
                        }
                    }
                    this.selectedVal = groupname;
                }
            }
        }
    });
}(Vue, yufp.$, 'yufp-governed-cust-selector'));