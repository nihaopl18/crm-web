/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:订单信息
 */

(function(vue, name) {
    yufp.lookup.reg('UP_DOWN_STATE,COMMODITY_TYPE,PUBLISH_STATUS,COMMODITY_TYPE,UP_DOWN_STATE,WF_APP_STATUS,USE_FLAG,PICTURE_TYPE,ATTR_TYPE,IF_CANCEL,COMM_STATUS,EXCG_CHANNEL,EXCG_TYPE,COMM_CLASS,RGET_TYPE,EXCG_FEQ,SUIT_OBJ_TYPE,LIMIT');
    vue.component(name, {
        template: '  <div id="ordercom">\
        <yu-row>\
            <h3 class="titleo">订单信息</h3>\
            <yu-xform label-width="140px" ref="refForm" v-model="formdatadd" :disabled="formDisabled">\
                <yu-xform-group class="ordercalss">\
                    <yu-xform-item label="订单ID" name="orderId"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单编号" name="orderNo"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="客户号" name="custNo"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单日期" name="orderDt"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="兑换渠道" name="orderChannel" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单消耗积分" name="sumScore"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单成本" name="sumCharge"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单状态" name="orderStatus"  ctype="input" ></yu-xform-item>\
                    <yu-xform-item label="订单审批状态" name="appStatus" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="积分明细ID" name="scdId"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="兑换用户编号" name="operatorCode"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="审批用户编号" name="appAccount"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="审批时间" name="appDt"  ctype="input" ></yu-xform-item>\
                </yu-xform-group>\
            </yu-xform>\
        </yu-row>\
        <yu-row>\
            <h3 class="titleo">客户基本信息</h3>\
            <yu-xform label-width="140px" ref="refForm" v-model="formdatakh" :disabled="formDisabled">\
                <yu-xform-group class="ordercalss">\
                    <yu-xform-item label="客户号" name="custId"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="中文名" name="custName"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="英文名" name="englishName"  ctype="input"></yu-xform-item>\
                    <yu-xform-item label="客户等级" name="aumGrade"  ctype="input"></yu-xform-item>\
                </yu-xform-group>\
            </yu-xform>\
        </yu-row>\
        <yu-row>\
            <h3 class="titleo">礼品信息</h3>\
            <yu-xform label-width="140px" ref="refForm" v-model="formdatalp"disabled="formDisabled" >\
                <yu-xform-group class="ordercalss">\
                    <yu-xform-item label="商品编号" name="commodityCode"  ctype="input" disable></yu-xform-item>\
                    <yu-xform-item label="商品名称"  ctype="custom">\
                        <el-link :underline="false" style="color: red;margin-right: 16px;" @click="searchListCust">{{formdatalp.commodityName}}</el-link>\
                </yu-xform-item>\
                    <yu-xform-item label="商品说明" name="commodityDesc"  ctype="input" disable></yu-xform-item>\
                    <yu-xform-item label="兑换方式" name="commodityVFlag"  ctype="input" disable></yu-xform-item>\
                </yu-xform-group>\
            </yu-xform>\
            </yu-row>\
            <yu-row>\
            <h3 class="titleo">扩展属性</h3>\
            <div v-for="(item,index) in attrlist" :key="index">\
            <el-form label-width="140px" ref="attrformone" :model="item.attrDesc" disabled>\
                <el-col :span="8">\
                    <el-form-item :label="item.attrName"  >\
                        <yu-input v-model="item.attrDesc" disabled></yu-input>\
                    </el-form-item>\
                </el-col>\
            </el-form>\
            </div>\
            </yu-row>\
            <yu-xdialog title="" :visible.sync="orderdetailable" width="1250px" @close="orderdetailcancel">\
            <div id="pointExch">\
            <yu-row>\
                <h3 class="titleo">礼品照片</h3>\
                <div id="container" v-for="(item, index) in sysmineInfo">\
                    <div class="lablename">图{{item.pictureName}}：</div>\
                    <img class="lable" :src="item.picturePath" />\
                </div>\
            </yu-row>\
            <yu-row>\
                <h3 class="titleo">礼品基本信息</h3>\
                <yu-xform label-width="180px" ref="refForm" v-model="formdata" :disabled="formDisabledx">\
                    <yu-xform-group class="ordercalss">\
                    <yu-xform-item label="商品编号" name="commodityCode" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="商品名称" name="commodityName" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="是否推荐兑换" name="ifRcd" rules="required" ctype="select" data-code="IF_CANCEL"></yu-xform-item>\
                    <yu-xform-item label="商品状态" name="upDownState" rules="required" ctype="select" data-code="COMM_STATUS"></yu-xform-item>\
                    <yu-xform-item label="商品可供兑换渠道" name="excgChannel" rules="required" ctype="select" data-code="EXCG_CHANNEL" :multiple="true"></yu-xform-item>\
                    <yu-xform-item label="商品兑换方式" name="commodityVFlag" rules="required" ctype="select" data-code="EXCG_TYPE"></yu-xform-item>\
                    <yu-xform-item label="商品种类" name="commodityType" rules="required" ctype="select" data-code="COMM_CLASS"></yu-xform-item>\
                    <yu-xform-item label="实物商品提取类型" name="commodityRGetType" rules="required" ctype="select" data-code="RGET_TYPE"></yu-xform-item>\
                    <yu-xform-item label="同一客户可兑换频率" name="changeFeq" rules="required" ctype="select" data-code="EXCG_FEQ"></yu-xform-item>\
                    <yu-xform-item label="适用客户评级类型" name="suitObjType" rules="required" ctype="select" data-code="SUIT_OBJ_TYPE"></yu-xform-item>\
                    <yu-xform-item label="适用客户评级级别" name="suitCustGrade" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="限制内容" name="limitContent" ctype="select" data-code="LIMIT"></yu-xform-item>\
                    <yu-xform-item label="有效期-起期" name="onShelfBegin" rules="required" ctype="datepicker"></yu-xform-item>\
                    <yu-xform-item label="有效期-止期" name="onShelfEnd" rules="required" ctype="datepicker"></yu-xform-item>\
                    <yu-xform-item label="是否可撤销订单" name="ifCancel" ctype="select" data-code="IF_CANCEL"></yu-xform-item>\
                    <yu-xform-item label="兑换所需积分" name="commodityLValue" rules="required" ctype="num"></yu-xform-item>\
                    <yu-xform-item label="单次成本费用" name="commodityMValue" rules="required" ctype="num"></yu-xform-item>\
                    <yu-xform-item label="客户单次可兑换数量" name="changeTimes" rules="required" ctype="num"></yu-xform-item>\
                    <yu-xform-item label="合作商户" name="belongMerchant" rules="required" ctype="yufp-merchant"></yu-xform-item>\
                    <yu-xform-item label="封面简介" name="coverSummary" :rows="3" :colspan="24" ctype="textarea"></yu-xform-item>\
                    <yu-xform-item label="商品备注" name="commodityRemark" :rows="3" :colspan="24" ctype="textarea"></yu-xform-item>\
                    <yu-xform-item label="商品说明" name="commodityDesc" :rows="3" :colspan="24" ctype="textarea"></yu-xform-item>\
                    <yu-xform-item label="商品使用说明模板" name="commodityDescTemp" :rows="3" :colspan="24" ctype="textarea"></yu-xform-item>\
                    </yu-xform-group>\
                </yu-xform>\
            </yu-row>\
            <yu-row>\
                <h3 class="titleo">扩展属性</h3>\
                <yu-xtable style="padding-left: 20px;" :borde="false" ref="multipleTable" reserve-selection row-key="attrId" :data="sectionTableData" selection-type="checkbox" :pageable="false">\
                <yu-xtable-column prop="attrName" label="扩展属性名称" width="160px"></yu-xtable-column>></yu-xtable-column>\
                <yu-xtable-column prop="attrDesc" label="属性详情" width="160px"></yu-xtable-column>\
                <yu-xtable-column prop="attrType" label="扩展属性类别" width="160px" data-code="ATTR_TYPE"></yu-xtable-column>\
                <yu-xtable-column prop="attrCode" label="扩展属性编号" width="160px"></yu-xtable-column>\
                <yu-xtable-column prop="attrLength" label="属性长度" width="160px"></yu-xtable-column>\
                <yu-xtable-column prop="attrKind" label="属性类型" width="160px"></yu-xtable-column>\
                <yu-xtable-column prop="attrRemark" label="备注" width="160px"></yu-xtable-column>\
            </yu-xtable>\
            </yu-row>\
            <div class="yu-grpButton">\
            <yu-button type="primary" @click="orderdetailcancel">关闭</yu-button>\
        </div>\
        </div>\
                </yu-xdialog>\
  </div>',
        props: {
            perInfo: Object
        },
        data: function() {
            return {
                formDisabled: true,
                formdatadd: {},
                formdatakh: {},
                formdatalp: {},
                fastSearchValue: '',
                // 商品详情
                sysmineInfo: [],
                formDisabledx: true,
                formdata: {},
                tableUrl: '/api/acrmfpdprodinfo/productcustfitinfoquery',
                initFilesParams: {
                    condition: JSON.stringify({
                        busNo: '6565'
                    })
                },
                reportUpLoadBusNo: { busNo: '1122' },
                uploadVisible: true,
                pic: false,
                orderdetailable: false,
                sectionTableData: [],
                attrlist: [
                    // { attrId: '1', attrName: 'a' },
                    // { attrId: '13', attrName: 'b' },
                    // { attrId: '12', attrName: 'c' },
                    // { attrId: '14', attrName: 'd' },

                ]
            };
        },
        mounted: function() {
            var _this = this;
            var model = {};
            model.orderId = _this.perInfo.orderId || '';
            yufp.service.request({
                method: 'GET',
                url: backend.productService + '/api/loyacorderlist/detail',
                data: model,
                async: false,
                callback: function(code, message, response) {
                    if (code == '0') {
                        let data = response.data;
                        let ooderDetail = data.ooderDetail;
                        let cust = data.cust;
                        let comm = data.comm;
                        for (let i in ooderDetail) {
                            _this.formdatadd[i] = ooderDetail[i];
                        }
                        for (let i in cust) {
                            _this.formdatakh[i] = cust[i];
                        }
                        for (let i in comm) {
                            _this.formdatalp[i] = comm[i];
                        }
                        if (response.data.attr && response.data.attr.length > 0) {
                            _this.attrlist = response.data.attr;
                        }
                    }
                }
            });

        },
        methods: {
            searchListCust: function() {
                var _this = this;
                var param = { id: _this.formdatalp.id || '' };
                yufp.service.request({
                    method: 'GET',
                    url: backend.productService + '/api/loyqycommodityinfo/detail',
                    data: param,
                    async: false,
                    callback: function(code, message, response) {
                        if (code == '0') {
                            if (response.data.attr && response.data.attr.length != 0) {
                                _this.sectionTableData = response.data.attr
                            }
                            if (response.data.pic && response.data.pic.length != 0) {
                                _this.sysmineInfo = response.data.pic;
                                for (let i = 0; i < _this.sysmineInfo.length; i++) {
                                    _this.sysmineInfo[i].picturePath = _this.fileIdToURL(_this.sysmineInfo[i].picturePath);
                                }
                            }
                            _this.$nextTick(function() {
                                let comm = response.data.comm;
                                for (let i in comm) {
                                    _this.formdata[i] = comm[i];
                                }
                                if (response.data.mer[0] && response.data.mer[0].merchantId && response.data.mer[0].merchantId.length > 0) {
                                    _this.formdata.belongMerchant = response.data.mer[0].merchantId;
                                }
                            });
                        }
                    }
                });
                this.orderdetailable = true;

            },
            picfn: function() {
                this.pic = !this.pic;
            },
            fileIdToURL: function(fileId) {
                var url = yufp.settings.ssl ? 'https://' : 'http://';
                url += yufp.settings.url;
                url += backend.fileService;
                url += '/api/file/provider/download?fileId=comm/' + fileId;
                return yufp.util.addTokenInfo(url);
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
            // 订单详情关闭
            orderdetailcancel: function() {
                this.orderdetailable = false;
            }
        }
    });
}(Vue, 'order-comp'));