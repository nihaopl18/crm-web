/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:
 */

(function(vue, name) {
    vue.component(name, {
        template: ' <div ref="baseInfoBox" class="baseInfoBox">\
    <div ref="detailForm" class="group-form group-detail-form">\
      <div class="anchor-group-wrap">\
        <transition name="anchor">\
          <div class="link-wrapper" v-if="isAnchor">\
            <div class="link-container">\
              <i class="el-icon-arrow-right" @click="clickFn(false)" title="收起"></i>\
              <!--<ul class="customerAnchor">\
                <li v-for="anchor in anchorMenu" :key="anchor.id" :class="anchor.id === selectId ? \'active\' : \'\'"><a @click="anchorJump(anchor.id)">{{anchor.name}}</a></li>\
              </ul>-->\
              <yu-anchor :affix="false" :container="container" active-route="#baseInfo">\
                <yu-anchor-link v-for="anchor in anchorMenu" :key="anchor.id" :route="anchor.id" :title="anchor.name"></yu-anchor-link>\
              </yu-anchor>\
            </div>\
          </div>\
        </transition>\
        <transition name="anchor-box">\
          <div class="anchor-box" v-if="!isAnchor" @click="clickFn(true)">\
            <span class="anchor-icon el-icon-menu"></span>\
            <span class="anchor-tit">导航</span>\
          </div>\
        </transition>\
      </div>\
      <div class="titleBox">\
        <span>基础信息</span>\
        <div v-if="formType === \'edite\'">\
          <yu-button plain size="mini" @click="cancelEdite">取消</yu-button>\
          <yu-button size="mini" type="primary" @click="saveEdite">保存</yu-button>\
        </div>\
        <yu-button type="primary" @click="handleFormEdit" v-else :disabled="isEdit">修改</yu-button>\
        <!--<i v-else class="el-icon-edit-outline" @click="handleFormEdit"></i>-->\
      </div>\
      <el-scrollbar style="height: 650px" ref="jumpContainer" >\
      <div class="jumpContainer">\
        <yu-xform ref="refForm" :class="formType===\'details\' ? \'marginB0\' : \'\'" label-width="220px" label-position="left" v-model="tableFormdata" :hide-required-asterisk="true" :show-message="true" :status-icon="true" :form-type="formType">\
          <yu-panel class="scrollItem" title="基本信息" is-collapse id="baseInfo" :collapse-icon="[\'yu-icon-arr-up\']" panel-type="simple">\
            <yu-row>\
              <yu-col :span="12">\
                <yu-xform-item label="姓名" name="custName"></yu-xform-item>\
                <yu-xform-item label="英文名" name="englishName"></yu-xform-item>\
                <yu-xform-item label="性别" name="sex" ctype="select" filterable data-code="SEX_TYPE"></yu-xform-item>\
                <yu-xform-item label="出生日期" name="birthDt" ctype="datepicker" @change="handleBirthChange" style="width: 100%"></yu-xform-item>\
                <yu-xform-item label="年龄" name="age"></yu-xform-item>\
                <yu-xform-item label="星座" name="constellation" ctype="select" filterable data-code="CONSTELLATIONS"></yu-xform-item>\
                <!--<yu-xform-item label="籍贯" name="job" ctype="select" filterable></yu-xform-item>-->\
                <!--<yu-xform-item label="户口所在地" name="regPlace" ctype="select" filterable></yu-xform-item>-->\
                <yu-xform-item label="政治面貌" name="polStat" ctype="select" filterable data-code="CD0017"></yu-xform-item>\
                <yu-xform-item label="民族" name="nation" ctype="select" filterable data-code="CD0004"></yu-xform-item>\
                <yu-xform-item label="地区" name="countryCd" ctype="select" filterable data-code="CD0069"></yu-xform-item>\
              </yu-col>\
              <yu-col :span="12">\
                <!--<yu-xform-item label="客户号" name="custId"></yu-xform-item>-->\
                <yu-xform-item label="ECIF客户号" name="ecifCustId"></yu-xform-item>\
                <yu-xform-item label="NDS客户号" name="ndsCustId"></yu-xform-item>\
                <yu-xform-item label="是否两地通客户" name="twoPlacesCustFlag" ctype="select" data-code="YES_NO"></yu-xform-item>\
                <yu-xform-item label="是否美籍客户" name="usacustFlag" ctype="select" data-code="YES_NO"></yu-xform-item>\
                <yu-xform-item label="手机号" name="phoneNo" :rules="phoneNoRules"></yu-xform-item>\
                <yu-xform-item label="座机" name="telPhoneNo" :rules="telPhoneNoRules"></yu-xform-item>\
                <yu-xform-item label="邮箱" name="contMeth" :rules="emailRule"></yu-xform-item>\
                <yu-xform-item label="身体状态" name="hltStat" ctype="select" filterable data-code="HEALTH_STATE"></yu-xform-item>\
                <yu-xform-item label="微信" name="wechat"></yu-xform-item>\
              </yu-col>\
              <yu-col :span="24">\
                <yu-xform-item label="常用地址" name="fullAddr"></yu-xform-item>\
                <!-- <yu-xform-item label="街道地址" name="streetName"></yu-xform-item>-->\
                <yu-xform-item label="家庭地址" name="townName"></yu-xform-item>\
                <yu-xform-item label="单位地址" name="unitAddr"></yu-xform-item>\
              </yu-col>\
            </yu-row>\
          </yu-panel>\
          <yu-panel class="scrollItem" title="证件信息" is-collapse id="IDcardInfo" panel-type="simple">\
            <template slot="right" v-if="formType === \'edite\'">\
              <i class="el-icon-plus" style="font-size: 14px;" @click="addCertInfo"></i>\
            </template>\
            <yu-xtable ref="certTable" v-if="formType === \'edite\'" :data="certInfo" style="width: 100%" :pageable="false" :render-custom-content="renderCustomContent">\
              <yu-xtable-column prop="certType" name="certType" label="证件类型" ctype="select" filterable data-code="CD0348"></yu-xtable-column>\
              <yu-xtable-column prop="certNo" name="certNo" ctype="input" label="证件号码" :rules="certNoRules"></yu-xtable-column>\
              <yu-xtable-column prop="issCountry" name="issCountry" label="发证国家" ctype="select" filterable data-code="CD0069"></yu-xtable-column>\
              <yu-xtable-column prop="expiredDate" name="expiredDate" label="到期日期" ctype="datepicker" style="width: 100%"></yu-xtable-column>\
            </yu-xtable>\
            <yu-xtable v-else :data="certInfo" style="width: 100%" :pageable="false">\
              <yu-xtable-column prop="certType" data-code="CD0348" label="证件类型"></yu-xtable-column>\
              <yu-xtable-column prop="certNo" label="证件号码"></yu-xtable-column>\
              <yu-xtable-column prop="issCountry" data-code="CD0069" label="发证国家"></yu-xtable-column>\
              <yu-xtable-column prop="expiredDate" label="到期日期" style="width: 100%"></yu-xtable-column>\
            </yu-xtable>\
          </yu-panel>\
          <yu-panel class="scrollItem" title="教育信息" is-collapse id="educationInfo" panel-type="simple">\
            <yu-row>\
              <yu-col :span="12">\
                <yu-xform-item label="最高学位" name="higEduDgr" ctype="select" filterable data-code="CD0049"></yu-xform-item>\
                <!--<yu-xform-item label="所学专业" name="schMajor" ctype="select" filterable data-code="MAJOR"></yu-xform-item>-->\
                <yu-xform-item label="最后毕业院校" name="comSch"></yu-xform-item>\
              </yu-col>\
              <yu-col :span="12">\
                <yu-xform-item label="毕业时间" name="endDate" ctype="datepicker" style="width: 100%"></yu-xform-item>\
              </yu-col>\
            </yu-row>\
          </yu-panel>\
          <yu-panel class="scrollItem family-info" title="职业信息" is-collapse id="careerInfo" panel-type="simple">\
            <yu-row>\
              <yu-col :span="12">\
                <yu-xform-item label="职业" name="engInPro" ctype="select" filterable data-code="CD0033"></yu-xform-item>\
                <!-- <yu-xform-item label="单位性质" name="unitNat" ctype="select" filterable data-code="CD0418"></yu-xform-item>-->\
                <yu-xform-item label="行业" name="indOwnUnit" ctype="select" filterable data-code="CD0070"></yu-xform-item>\
              </yu-col>\
              <yu-col :span="12">\
                <yu-xform-item label="工作单位名称" name="curWorkUnit"></yu-xform-item>\
                <!-- <yu-xform-item label="行业" name="indOwnUnit" ctype="select" filterable data-code="CD0070"></yu-xform-item>-->\
              </yu-col>\
            </yu-row>\
          </yu-panel>\
          <yu-panel class="scrollItem house-info" title="资产信息" is-collapse id="assetsInfo" panel-type="simple">\
            <yu-row>\
              <yu-col :span="12">\
                <yu-xform-item label="房产数量" ctype="num" name="houseCount"></yu-xform-item>\
                <yu-xform-item label="收入来源" name="incomeSrc"  data-code="CD0376"></yu-xform-item>\
                <yu-xform-item label="投资偏好" name="invCd" ctype="select" data-code="INV_CD"></yu-xform-item>\
                </yu-col>\
                <yu-col :span="12">\
                <yu-xform-item label="年收入" name="incomeY"></yu-xform-item>\
                <yu-xform-item label="投资周期" name="unvCyc"></yu-xform-item>\
                <yu-xform-item label="车辆情况" ctype="select" name="carFlg" data-code="YES_NO"></yu-xform-item>\
                <!--<yu-xform-item label="" name=""></yu-xform-item>-->\
              </yu-col>\
            </yu-row>\
          </yu-panel>\
          <yu-panel class="scrollItem house-info" title="房产信息" is-collapse id="houseInfo" panel-type="simple">\
            <yu-xtable ref="listTable" :data="list" :pageable="false" style="width: 100%">\
              <yu-xtable-column label="房产状况" prop="houseInfo" data-code="PROPERTY_MORTGAGE_STATUS"></yu-xtable-column>\
              <yu-xtable-column label="购置时间" prop="purDt"></yu-xtable-column>\
              <yu-xtable-column label="购置原价" prop="purPrc"></yu-xtable-column>\
            </yu-xtable>\
          </yu-panel>\
          <yu-panel class="scrollItem" title="管户信息" is-collapse id="publicans" panel-type="simple">\
            <yu-row>\
              <yu-col :span="12">\
                <yu-xform-item label="开户机构" name="custManagerOrg"></yu-xform-item>\
                <yu-xform-item label="归属客户经理" name="mgrName"></yu-xform-item>\
                <yu-xform-item label="客户经理所属团队" name="mktTeamName"></yu-xform-item>\
              </yu-col>\
              <yu-col :span="12">\
                <!--<yu-xform-item label="开户位置" name="opAccPlc"></yu-xform-item>-->\
                <yu-xform-item label="归属机构" name="orgName"></yu-xform-item>\
                <yu-xform-item label="分配时间" name="joinDate"></yu-xform-item>\
              </yu-col>\
            </yu-row>\
          </yu-panel>\
          <yu-panel class="scrollItem" title="客群信息" is-collapse id="custGroups" panel-type="simple">\
            <yu-xtable ref="listTable" :data-url="dataUrl" :pageable="false" :base-params="baseParam" style="width: 100%">\
              <yu-xtable-column label="客群类型" prop="custGroupType">\
                <template slot-scope="scope">\
                  <span>{{scope.row.custGroupType === \'01\' ? \'动态客群\' : \'静态客群\'}}</span>\
                </template>\
              </yu-xtable-column>\
              <yu-xtable-column label="客群名称" prop="custGroupName"></yu-xtable-column>\
              <yu-xtable-column label="创建时间" prop="createDate"></yu-xtable-column>\
              <yu-xtable-column label="创建人" prop="createUser"></yu-xtable-column>\
            </yu-xtable>\
          </yu-panel>\
          <yu-panel class="scrollItem" title="家庭信息" is-collapse id="familyInfo" panel-type="simple">\
            <yu-row>\
              <yu-col :span="12">\
                <yu-xform-item label="婚姻状况" name="marriStat" ctype="select" data-code="CD0005"></yu-xform-item>\
              </yu-col>\
              <yu-col :span="12">\
                <yu-xform-item label="家庭人口数" name="familyMember"></yu-xform-item>\
              </yu-col>\
            </yu-row>\
          </yu-panel>\
        </yu-xform>\
        </div>\
        </el-scrollbar>\
        <yu-dialog title="信息编辑" :visible.sync="editeDialogVisible">\
          <customer-edit ref="customerEdite" :org-id-auth="orgIdAuth" @handleediteclose="closeEditeBox" />\
        </yu-dialog>\
    </div>\
  </div>',
        data: function() {
            yufp.lookup.reg('SEX_TYPE,TWO_PLACES_FLAG,USA_CUST_FLAG,MAJOR,INV_CD,CONSTELLATIONS,HEALTH_STATE,YES_NO,PROPERTY_MORTGAGE_STATUS,CD0017,CD0069,CD0348,CD0004,CD0049,CD0033,CD0418,CD0070,CD0376,CD0005');
            return {
                container: '',
                tableFormdata: {},
                list: [],
                certInfo: [],
                backupData: {}, // 备份数据
                isAnchor: true,
                formType: 'details',
                orgIdAuth: '',
                editeDialogVisible: false,
                emailRule: [
                    { type: 'email', message: '请输入正确的邮箱格式' },
                    { required: true, message: '请输入邮箱' }
                ],
                phoneNoRules: [
                    { required: true, message: '请输入手机号' },
                    { validator: yufp.validator.mobile, message: '请输入正确的手机号' }
                ],
                telPhoneNoRules: [
                    { required: true, message: '请输入座机号' },
                    { validator: yufp.validator.phone, message: '请输入正确的座机号' }
                ],
                certNoRules: [
                    { required: true, message: '请输入证件号码' }
                ],
                selectId: '#baseInfo',
                anchorMenu: [
                    { id: '#baseInfo', name: '基础信息' },
                    { id: '#IDcardInfo', name: '证件信息' },
                    { id: '#educationInfo', name: '教育信息' },
                    { id: '#careerInfo', name: '职业信息' },
                    { id: '#assetsInfo', name: '资产信息' },
                    { id: '#houseInfo', name: '房产信息' },
                    { id: '#publicans', name: '管户信息' },
                    { id: '#custGroups', name: '客群信息' },
                    { id: '#familyInfo', name: '家庭信息' }
                ],
                dataUrl: '/api/ocrmfcicgbase/querycust',
                baseParam: { custId: yufp.localStorage.get('custInfo').custId },
                isEdit: false,
                isEditArr: ['R002', 'R003']
            };
        },
        created: function() {
            // 查询条线
            let _this = this;
            yufp.service.request({
                method: 'GET',
                url: backend.custpubService + '/api/governedcust/getbusitype',
                data: {
                    condition: JSON.stringify({ userId: yufp.session.userId })
                },
                callback: function(code, message, response) {
                    if (code == 0 && response.code === 0) {
                        if (response.data) {
                            _this.orgIdAuth = response.data.orgIdAuth;
                        }
                    } else {
                        _this.$message.error('查询失败');
                    }
                }
            });
        },
        mounted: function() {
            var _this = this;
            _this.isEditFn();
            _this.container = this.$refs.jumpContainer.wrap;
            _this.getBaseInfoData();
            // _this.getCustInfoDataFirst();
            // this.$nextTick(
            //   function () {
            //     // 监听页面滚动事件
            //     if (_this.container.wrap) {
            //       _this.container.wrap.addEventListener('scroll', _this.scroll);
            //     }
            //   }
            // );
        },

        beforeDestroy: function() {
            // this.container.wrap.removeEventListener('scroll', this.scroll);
        },

        methods: {
            isEditFn: function() {
                var _this = this;
                var selectRole = yufp.sessionStorage.get('selectRole');
                var rolesArr = yufp.session.roles;
                for (var i = 0; i < rolesArr.length; i++) {
                    if (selectRole == rolesArr[i].id) {
                        if (_this.isEditArr.indexOf(rolesArr[i].code) != -1) {
                            _this.isEdit = false; // 包含
                        } else {
                            _this.isEdit = true;
                        }
                    }
                }
            },
            // 页面滚动时触发
            scroll: function() {
                var _this = this;
                // scrollTop为this.container.wrap顶部与整个文档顶部间的距离
                var scrollTop = _this.container.wrap.scrollTop;

                // 获取含样式类 class="scrollItem" 的所有元素，得到一个数组（列表）
                var titleList = document.querySelectorAll('.scrollItem');
                // 将每个目标元素顶部与整个文档顶部的距离，以及显示屏顶部与整个文档顶部间的距离都存入到一个数组中
                var offsetTopList = [scrollTop];
                // titleList.forEach(item => {
                //     var dis = item.offsetTop + item.clientHeight - 30;
                //     if (dis > 0) {
                //         offsetTopList.push(dis);
                //     }
                // });

                titleList.forEach(function(item) {
                    var dis = item.offsetTop + item.clientHeight - 30;
                    if (dis > 0) {
                        offsetTopList.push(dis);
                    }
                });

                // 对数组进行排序（默认从小到大）
                // offsetTopList.sort((a, b) => {
                //     return a - b;
                // });
                // ie优化
                offsetTopList.sort(function(a, b) { return a - b });

                // 当第一个目标元素滚入屏幕后，查询当前滚动的位置在数组中的下标，对应的便是需高亮显示的锚点下标
                if (scrollTop >= offsetTopList[0]) {
                    var index = offsetTopList.indexOf(scrollTop);
                    _this.selectId = _this.anchorMenu[index] ? _this.anchorMenu[index].id : '#baseInfo';
                }
            },
            clickFn: function(flag) {
                this.isAnchor = flag;
            },

            anchorJump: function(id) {
                this.selectId = id;
                this.$nextTick(function() {
                    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
                });
            },

            getCustInfoDataFirst: function() {
                let _this = this;
                let custId = yufp.localStorage.get('custInfo').custId;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/pcustbaseinfo/queryCustlist', // 点击修改后，优先赋值这个接口的字段
                    data: {
                        condition: JSON.stringify({ custId: custId, type: '01' })
                            // condition: JSON.stringify({userId: 1070515349})
                    },
                    callback: function(code, message, response) {
                        if (code === 0) {
                            let data = response.data;
                            if (data.crmFCiUserInformation && data.crmFCiUserInformation.status === '04') {
                                for (let key in data) {
                                    _this.tableFormdata[key] = data[key];
                                }
                                for (let key in data.crmFCiUserInformation) {
                                    _this.tableFormdata[key] = data.crmFCiUserInformation[key];
                                }
                            }
                            _this.list = data.ciUserAssetsDTOlist || [];
                            yufp.clone(data, _this.tableFormdata);
                            // _this.getBaseInfoData();
                            if(!_this.tableFormdata.incomeSrc) {
                              _this.tableFormdata.incomeSrc = data.incomeSrc || '';
                            }
                            _this.tableFormdata.incomeSrc = _this.tableFormdata.incomeSrc ? _this.tableFormdata.incomeSrc.split(',') : [];
                            var newArr = '';
                            for(let i = 0;i < _this.tableFormdata.incomeSrc.length;i++) {
                              if(_this.tableFormdata.incomeSrc[i] == '-1'){
                                newArr += '未知 '
                              }
                              if(_this.tableFormdata.incomeSrc[i] == '1'){
                                newArr += '工薪收入 '
                              }
                              if(_this.tableFormdata.incomeSrc[i] == '2'){
                                newArr += '财产性收入 '
                              }
                              if(_this.tableFormdata.incomeSrc[i] == '3'){
                                newArr += '经营净收入 '
                              }
                              if(_this.tableFormdata.incomeSrc[i] == '4'){
                                newArr += '转移性收入 '
                              }
                            }
                            _this.tableFormdata.incomeSrc = newArr;
                        }
                    }
                });
            },

            getBaseInfoData: function() {
                let _this = this;
                let custId = yufp.localStorage.get('custInfo').custId;
                yufp.service.request({
                    method: 'GET',
                    url: '/api/pcustbaseinfo/querylist',
                    data: {
                        condition: JSON.stringify({ custId: custId })
                            // condition: JSON.stringify({userId: 1070515349})
                    },
                    callback: function(code, message, response) {
                        if (code === 0) {
                            let data = response.data;
                            let ret = {};
                            for (let key1 in data) {
                                for (let key2 in data[key1]) {
                                    ret[key2] = data[key1][key2] || '-';
                                }
                            }
                            for (let key in ret) {
                                if (_this.tableFormdata[key] || typeof _this.tableFormdata[key] === 'number') {
                                    _this.$set(ret, key, _this.tableFormdata[key]);
                                }
                            }
                            yufp.clone(ret, _this.tableFormdata);
                            _this.certInfo = data.certInfo;
                            _this.getCustInfoDataFirst();
                        }
                    }
                });
            },

            // 编辑表单
            handleFormEdit: function() {
                // this.formType = 'edite';
                var _this = this;
                if (_this.tableFormdata.status === '02') {
                    _this.$message.warning('抱歉，暂时不能被修改');
                    return false;
                }
                _this.editeDialogVisible = true;
                _this.$nextTick(function() {
                    let custId = yufp.localStorage.get('custInfo').custId;
                    // yufp.clone(_this.tableFormdata, _this.backupData);
                    // _this.backupData.list = _this.tableFormdata.list || [];
                    // _this.backupData.incomeSrcs = _this.tableFormdata.incomeSrc.split(',');
                    _this.$refs.customerEdite.getCustInfo(custId);
                });
            },
            closeEditeBox: function(isUpdate) {
                if (isUpdate) {
                    // this.getCustInfoDataFirst();
                    this.getBaseInfoData();
                }
                this.editeDialogVisible = false;
            },
            // 取消编辑
            cancelEdite: function() {
                this.formType = 'details';
                yufp.clone(this.backupData, this.tableFormdata);
            },
            saveEdite: function() {
                var _this = this;
                _this.$refs.refForm.validate(function(valid) {

                });
            },

            // 新增表格
            renderCustomContent: function(h, obj) {
                var _this = this,
                    data = obj.data,
                    store = obj.store,
                    node = obj.node;
                var btnArray = [{
                        name: '新增',
                        callback: function(e) {
                            console.log(store, data);
                            e.stopPropagation();
                        }
                    },
                    {
                        name: '删除',
                        callback: function(e) {
                            console.log(store, data);
                            e.stopPropagation();
                        }
                    }
                ];
                return h('div', { class: 'table-btn' }, btnArray.map(function(item) {
                    return h('span', { on: { click: item.callback } }, item.name);
                }));
            },
            addCertInfo: function() {
                var row = {
                    certType: '',
                    certNo: '',
                    countryCd: '',
                    expiredDate: ''
                };
                var flag = false;
                // 校验表格数据
                this.$refs.certTable.validate(function(fields) {
                    if (!fields) {
                        flag = true;
                    }
                });
                // 校验通过添加数据
                if (flag) {
                    this.certInfo.push(row);
                    this.$refs.certTable.setCurrentRow(row);
                }
            },

            /**
             * 提交表单信息
             */
            submitFormFn: function() {
                var _this = this;

                var validate = false;

                _this.$refs.refForm.validate(function(valid) {
                    validate = valid;
                });
            },

            /**
             * 重置所有表单内容
             */
            resetFormFn: function() {},

            // 设置出生年月日,根据日期推算年龄
            handleBirthChange: function(date) {
                if (date) {
                    // let birth = moment(date).format('YYYY-MM-DD');
                    // let age = moment().diff(birth, 'years');
                    // this.tableFormdata.age = age;
                }
            }
        }
    });
}(Vue, 'base-info'));