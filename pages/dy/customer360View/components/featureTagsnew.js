/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description: 特征标签
 */

(function(vue, name) {
    vue.component(name, {
        template: ' <div class="featureTags">\
      <p class="title">\
        <span>自定义标签</span>\
        <el-popover\
          :hidden="tagshow"\
          ref="popover"\
          popper-class="tag-prpover"\
          placement="bottom-start"\
          width="456"\
          :trigger="trigger"\
          v-model="popoverVisible">\
          <div>\
            <yu-row class="popover-topBox">\
              <yu-col :span="12" >\
                <yu-xtree ref="orgTreebq" :height="260" @node-click="treechosefn" :data-url="orgTreeUrl" data-id="tagNo" data-label="tagName" node-key="tagNo" data-pid="groupNo"  :data-params="dataParams" :default-expanded-keys="[0]" data-async="false"  data-root="0" style="margin:10px 10px 0 0;">\
                </yu-xtree >\
              </yu-col>\
              <yu-col :span="12">\
                <el-input placeholder="请输入内容" v-model="tagName" :clearable="true" @clear="searchFn">\
                  <el-button slot="append" icon="el-icon-search" @click="searchFn"></el-button>\
                </el-input>\
                <div style="margin-top:16px;height:200px" v-loading="loading">\
                  <p v-if="!tags.length" class="noData">暂无数据</p>\
                  <div v-else v-for="item in tags" :key="item.tagNo"><yu-checkbox v-model="item.checked">{{item.tagName}}</yu-checkbox><i class="el-icon-close" style="float:right;padding-right:10px;padding-top:2px" @click="deleteFn(item)"></i></div>\
                </div>\
                <yu-pagination\
                  v-if="total>10"\
                  small\
                  layout="prev, pager, next"\
                  :total="total"\
                  @current-change="pageChange">\
                </yu-pagination>\
              </yu-col>\
            </yu-row>\
            <yu-row class="popover-bottomBox">\
              <yu-col :span="12">\
                <el-input v-model="groupName"></el-input>\
                <el-button type="text" icon="el-icon-plus" @click="addGroup">添加分组</el-button>\
              </yu-col>\
              <yu-col :span="12">\
              <el-popover\
                id="childPopoverVisiableid"\
                ref="popover"\
                popper-class="tag-childPrpover"\
                placement="right"\
                trigger="manual"\
                v-model="childPopoverVisible"\
                width="456"\>\
                <el-form-x ref="refformAdd" label-position="top" :group-fields="addFields" :buttons="addButtons" :disabled="formDisabled" label-width="120px">\
                </el-form-x>\
                <el-button  slot="reference" type="text" icon="el-icon-plus" @click="addTag">新增标签</el-button>\
              </el-popover>\
                <el-button type="text" @click="confirmTags">确认</el-button>\
              </yu-col>\
            </yu-row>\
          </div>\
        <span slot="reference" class="el-icon-circle-plus-outline" @click="popoverVisible = !popoverVisible"></span>\
      </el-popover>\
      </p>\
      <div class="tags-box" >\
        <yu-tag type="gray" v-for="label in labelArr" :key="label.tagName">{{ label.tagName }}</yu-tag>\
      </div>\
    </div>',
        props: {
            custId: String
        },
        watch: {
            custId: function(val) {
                this.getCustomTags();
                this.getCustid(val);
            }
        },
        data: function() {
            var _this = this;

            // 排序校验
            var orderValidate = function(rule, value, callback) {
                var reg = /^\d{0,4}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入数字(不超过9999)'));
                    return;
                }
                callback();
            };
            return {
                tagshow: true,
                isgroupNo: '',
                dataParams: {
                    custId: ''
                },
                // dataRoot: yufp.session.org.code,
                orgTreeUrl: backend.appOcaService + '/api/cimfmmftagGrop/getTagsTree',
                popoverVisible: false,
                tagVisible: false,
                groupSelectIndex: 1,
                tagGroup: [],
                addFields: [{
                        columnCount: 2,
                        fields: [{
                                label: '标签分组',
                                field: 'groupNo',
                                rules: [{ required: true, message: '必填项', trigger: 'blur' }],
                                type: 'custom',
                                is: 'yufp-taggroup-tree',
                                param: {
                                    needDpt: true,
                                    needCheckbox: false,
                                    dataUrl: backend.adminService + '/api/cimfmmftagGrop/getCustomTree'
                                },
                                readonly: true,
                                disabled: false
                            },
                            {
                                label: '标签名称',
                                field: 'tagName',
                                rules: [
                                    { required: true, message: '必填项', trigger: 'blur' },
                                    { max: 8, message: '标签名称过长，不超过8个字符', trigger: 'blur' }
                                ],
                                type: 'input'
                            }
                        ]
                    }, {
                        columnCount: 2,
                        fields: [
                            // {
                            //   label: '排序',
                            //   field: 'tagPri',
                            //   type: 'input',
                            //   rules: [
                            //     { validator: orderValidate, trigger: 'blur' }
                            //   ]
                            // },
                            {
                                label: '标签描述',
                                field: 'tagDesc',
                                type: 'textarea',
                                rules: [
                                    { max: 100, message: '标签描述过长，不超过100个字符', trigger: 'blur' }
                                ]
                            }
                        ]
                    }
                    //  {
                    //   columnCount: 2,
                    //   fields: [
                    //     {
                    //       label: '状态',
                    //       field: 'tagStatus',
                    //       type: 'switch',
                    //       onText: '下架',
                    //       offText: '上架',
                    //       onValue: '1',
                    //       offValue: '0',
                    //       onColor: '#E30A2A',
                    //       offColor: '#C0C4CC'
                    //     }
                    //   ]
                    // }
                ],
                addButtons: [{
                        label: '取消',
                        type: 'primary',
                        icon: 'yx-undo2',
                        hidden: false,
                        click: function(model) {
                            _this.tagVisible = false;
                            _this.childPopoverVisible = false;
                        }
                    },
                    {
                        label: '保存',
                        type: 'primary',
                        icon: 'check',
                        hidden: false,
                        click: function(model) {
                            if (!model.tagName) {
                                _this.$message('请输入标签名称');
                                return;
                            }
                            if (model.groupNo == '1023' || model.groupNo == '') {
                                _this.$message('请选择标签分组');
                                return;
                            }
                            // 判断标签是否重复
                            yufp.service.request({
                                method: 'POST',
                                url: backend.adminService + '/api/cimfmmtagtagsinfo/judgetag',
                                data: model,
                                callback: function(code, message, response) {
                                    if (code == 0) {
                                        var json = response.data;
                                        var flag = true;
                                        if (json.length != 0) {
                                            _this.$message({ message: '标签已重复', type: 'warning' });
                                            flag = false;
                                        }
                                        if (flag) {
                                            // 新增标签
                                            var tagModel = {};
                                            yufp.clone(model, tagModel);
                                            tagModel.tagStatus = '1';
                                            tagModel.custId = _this.custId;
                                            if (tagModel.groupNo == '') {
                                                tagModel.groupNo = _this.groupSelectIndex;
                                            }
                                            tagModel.parentNo = '无';
                                            tagModel.timelinesType = 'ALWAYS';
                                            tagModel.processMode = 'STATISTICS';
                                            tagModel.updateFrequency = 'MONTH';
                                            tagModel.tagApply = 'MARKETING'; //
                                            tagModel.tagLifecycle = 'UNAPPROVED';
                                            tagModel.ifAvailable = '1';
                                            tagModel.tagPri = '1';
                                            tagModel.createSys = 'CRM'; //
                                            tagModel.availableDate = new Date();
                                            tagModel.disableDate = new Date(9999, 12, 0);
                                            yufp.service.request({
                                                method: 'POST',
                                                url: backend.adminService + '/api/cimfmmtagcusttag/inserttag',
                                                data: tagModel,
                                                callback: function(code, message, response) {
                                                    if (code == 0) {
                                                        _this.$message.success('新增标签成功');
                                                        this.$emit('butLog', '客户360:特征标签:' + this.custId + ':' + yufp.session.userCode, '新增标签');
                                                        _this.getTags();
                                                        _this.getCustomTags();
                                                        _this.tagVisible = false;
                                                        _this.childPopoverVisible = false;
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    _this.trigger = 'click';
                                }
                            });
                        }
                    }
                ],
                tagValue: '',
                tagName: '',
                formDisabled: false,
                tags: [],
                selectTags: [],
                groupName: '',
                parentGroup: {},
                loading: false,
                page: 1,
                total: 0,
                trigger: 'click',
                labelArr: [],
                childPopoverVisible: false
            };
        },
        mounted: function() {
            var t = this;
            var rolestag;
            var rolecur = yufp.session.roles;
            var rolestagselect = yufp.sessionStorage.get('selectRole');
            for (let i = 0; i < rolecur.length; i++) {
                if (rolecur[i].id == rolestagselect) {
                    rolestag = rolecur[i].code;
                }
            }
            if (rolestag == 'R002' || rolestag == 'R003' || rolestag == 'R006') {
                t.tagshow = false;
            }
            this.getGroups();
            document.addEventListener("click", function(e) {
                var box = document.getElementById("childPopoverVisiableid");
                if (box != null) {
                    if (!box.contains(e.target)) {
                        t.childPopoverVisible = false;
                    }
                }
            })
        },
        methods: {
            // 删除标签
            deleteFn: function(item) {
                var _this = this;
                var custId = _this.custId
                yufp.service.request({
                    method: 'GET',
                    url: '/api/cimfmmtagcusttag/removecusttag',
                    data: {
                        tagNo: item.tagNo,
                        custId: custId,
                    },
                    callback: function(code, message, response) {
                        if (code === 0) {
                            _this.$message({ message: '删除标签成功！' });
                            if (_this.isgroupNo != null) {
                                _this.getTagrefresh(_this.isgroupNo);
                                var param = {};
                                // 刷新树
                                _this.$refs.orgTreebq.remoteData(param);
                                this.$emit('butLog', '客户360:特征标签:' + this.custId + ':' + yufp.session.userCode, '删除客户标签');
                            } else {
                                _this.searchFn();
                                var param = {};
                                // 刷新树
                                _this.$refs.orgTreebq.remoteData(param);
                            }

                        }
                    }
                });
                _this.getCustomTags();

            },
            getCustid: function(val) {
                var _this = this;
                this.dataParams = {
                    custId: val
                };
            },
            getCustomTags: function() {
                var _this = this;
                var param = {
                    custId: _this.custId
                };
                yufp.service.request({
                    method: 'GET',
                    url: '/api/pcustviewheader/querylabel',
                    data: {
                        condition: JSON.stringify(param)
                    },
                    callback: function(code, message, response) {
                        if (code == 0) {
                            _this.labelArr = response.data;
                        }
                    }
                });
            },
            pageChange: function(page) {
                this.page = page;
                this.getTags();
            },
            // 获取分组
            getGroups: function() {
                var _this = this;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/cimfmmftagGrop/getCustomTree',
                    callback: function(code, message, response) {
                        if (code === 0) {
                            var datas = [];
                            _this.parentGroup = response.data[0];
                            yufp.clone(response.data, datas);
                            // datas.splice(0, 1);
                            _this.tagGroup = datas;
                            _this.groupSelectIndex = _this.tagGroup[0].groupNo;
                            _this.getTags();
                        }
                    }
                });
            },
            // 获取对应分组下的标签
            getTags: function(tagName) {
                var _this = this;
                _this.tags = [];
                _this.loading = true;
                var param = {
                    groupNo: _this.groupSelectIndex,
                    custId: _this.custId
                };
                if (tagName) {
                    param.tagName = tagName;
                }
                yufp.service.request({
                    method: 'GET',
                    url: '/api/cimfmmtagtagsinfo/customtaglist',
                    data: {
                        condition: JSON.stringify(param),
                        size: 10,
                        page: _this.page
                    },
                    callback: function(code, message, response) {
                        if (code === 0) {
                            _this.total = response.total;
                            for (var i = 0; i < response.data.length; i++) {
                                _this.$set(response.data[i], 'checked', response.data[i].display === '1');
                            }
                            setTimeout(function() {
                                _this.loading = false;
                                _this.tags = _this.selectTags = response.data;
                            }, 500);
                        } else {
                            _this.loading = false;
                        }
                    }
                });
            },
            getTagrefresh: function(groupNo) {
                var _this = this;
                _this.tags = [];
                _this.loading = true;
                var param = {
                    groupNo: groupNo,
                    custId: _this.custId
                };
                yufp.service.request({
                    method: 'GET',
                    url: '/api/cimfmmtagtagsinfo/customtaglist',
                    data: {
                        condition: JSON.stringify(param),
                        size: 10,
                        page: 1
                    },
                    callback: function(code, message, response) {
                        if (code === 0) {
                            _this.total = response.total;
                            for (var i = 0; i < response.data.length; i++) {
                                _this.$set(response.data[i], 'checked', response.data[i].display === '1');
                            }
                            setTimeout(function() {
                                _this.loading = false;
                                _this.tags = _this.selectTags = response.data;
                            }, 500);
                        } else {
                            _this.loading = false;
                        }
                    }
                });
            },
            // 选择分组
            chooseGroup: function(value) {
                this.groupSelectIndex = value.groupNo;
                this.childPopoverVisible = false;
                this.getTags();
            },
            treechosefn: function(nodeData, node, self) {
                var _this = this;
                var CustId = _this.custId;
                if (nodeData.groupNo == '1023') {
                    _this.isgroupNo = nodeData.tagNo;
                    _this.getTagrefresh(nodeData.tagNo);
                    // _this.confirmTags();
                } else if (nodeData.groupNo != '00' && nodeData.groupNo != '1023') {
                    _this.isgroupNo = node.parent.data.tagNo;
                    _this.$confirm('是否添加该标签?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true
                    }).then(function() {

                        yufp.service.request({
                            method: 'POST',
                            url: backend.appOcaService + '/api/cimfmmtagcusttag/addcusttag',
                            data: {
                                createOrg: yufp.session.org.id,
                                tagNo: nodeData.tagNo,
                                tagName: nodeData.tagName,
                                custId: CustId,
                                avalableDate: nodeData.avalableDate,
                                disableDate: nodeData.disableDate
                            },
                            callback: function(code, message, response) {
                                _this.popoverVisible = true;
                                _this.$message({ message: '添加标签成功！' });
                                this.$emit('butLog', '客户360:特征标签:' + this.custId + ':' + yufp.session.userCode, '新增客户标签');
                                var param = {};
                                // 刷新树
                                _this.$refs.orgTreebq.remoteData(param);
                                _this.getTagrefresh(node.parent.data.tagNo);
                                _this.confirmTags();
                            }
                        });
                    });
                }
            },
            // 添加分组
            addGroup: function() {
                var _this = this;
                if (_this.groupName == '') {
                    _this.$message('请输入标签组名称');
                    return;
                }
                yufp.service.request({
                    method: 'POST',
                    url: '/api/cimfmmftagGrop/saveTagGroup',
                    data: {
                        parentNo: '1023',
                        groupName: _this.groupName
                    },
                    callback: function(code, message, response) {
                        if (code === 0 && response.code == 0) {
                            _this.$message.success('添加成功');
                            _this.getGroups();
                            var param = {};
                            // 刷新树
                            _this.$refs.orgTreebq.remoteData(param);
                            this.$emit('butLog', '客户360:特征标签:' + this.custId + ':' + yufp.session.userCode, '新增标签分组');
                        } else {
                            _this.$message({ message: response.message, type: 'warning' });
                        }
                    }
                });
            },
            // 搜索标签
            searchFn: function() {
                this.getTags(this.tagName);
            },
            // 关闭标签添加弹框
            handleClose: function() {
                this.tagVisible = false;
            },
            // 打开标签弹框
            addTag: function() {
                var _this = this;
                _this.childPopoverVisible = !_this.childPopoverVisible;
                _this.$nextTick(function() {
                    _this.$refs.refformAdd.formModel = {
                        groupNo: _this.isgroupNo
                    };
                    _this.$refs.refformAdd.$refs.groupNo[0].refreshData();
                });
            },

            handleTagCheck: function(event, value, oldVal) {
                console.log(event, value);
                // for (var i = 0; i < this.selectTags.length; i++) {
                //   if (value.tagName == this.selectTags[i].tagName) {
                //     this.selectTags[i].display = value.display != '0' ? '1' : '0';
                //   }
                // }
            },
            confirmTags: function() {
                var _this = this;
                var param = {
                    customTags: [],
                    custId: ''
                };
                var tags = [];
                yufp.extend(tags, this.selectTags);
                for (var i = 0; i < tags.length; i++) {
                    param.customTags.push({
                        display: tags[i].checked ? '1' : '0',
                        tagNo: tags[i].tagNo
                    });
                };
                param.custId = _this.custId;

                yufp.service.request({
                    method: 'POST',
                    url: '/api/cimfmmtagcusttag/settagdisplay',
                    data: param,
                    callback: function(code, message, response) {
                        if (code === 0) {
                            _this.$message.success('保存成功');
                            this.$emit('butLog', '客户360:特征标签:' + this.custId + ':' + yufp.session.userCode, '客户标签显示调整');
                            // _this.$emit('update-tag');
                            _this.getCustomTags();
                        }
                    }
                });
            }
        }
    });
}(Vue, 'feature-tags'));