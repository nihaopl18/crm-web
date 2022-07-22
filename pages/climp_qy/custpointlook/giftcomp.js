/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-09 09:36:44
 * @update by:
 * @description:订单信息
 */

(function(vue, name) {
    vue.component(name, {
        template: '  <div>\
        <yu-row>\
            <h2 class="titleo">订单信息</h2>\
            <yu-xform label-width="140px" ref="refForm" v-model="formdatadd" :disabled="formDisabled">\
                <yu-xform-group>\
                    <yu-xform-item label="订单编码" name="commodityName" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单状态" name="commodityLValue" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="兑换渠道" name="commodityMValue" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单审批状态" name="commodityStgNum" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单审批人" name="stgAlarm" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="审批时间" name="commodityName" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单消耗积分" name="commodityLValue" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单日期" name="commodityMValue" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="订单详情" name="commodityStgNum" rules="required" ctype="textarea" :rows="2"></yu-xform-item>\
                </yu-xform-group>\
            </yu-xform>\
        </yu-row>\
        <yu-row>\
            <h2 class="titleo">客户基本信息</h2>\
            <yu-xform label-width="140px" ref="refForm" v-model="formdatakh" :disabled="formDisabled">\
                <yu-xform-group>\
                    <yu-xform-item label="客户编号" name="commodityName" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="客户中文名称" name="commodityLValue" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="客户英文名称" name="commodityMValue" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="客户贡献度评级" name="commodityStgNum" rules="required" ctype="input"></yu-xform-item>\
                    <yu-xform-item label="客户AUM评级" name="stgAlarm" ctype="input"></yu-xform-item>\
                </yu-xform-group>\
            </yu-xform>\
        </yu-row>\
        <yu-row>\
            <h2 class="titleo">礼品信息</h2>\
            <yu-xform label-width="140px" ref="refForm" v-model="formdatalp"disabled="formDisabled" >\
                <yu-xform-group>\
                    <yu-xform-item label="礼品编码" name="commodityName" rules="required" ctype="input" disable></yu-xform-item>\
                    <yu-xform-item label="礼品信息"  ctype="custom">\
                        <el-link :underline="false" style="color: red;margin-right: 16px;" @click="searchListCust">{{formdatalp.commodityLValue}}</el-link>\
                </yu-xform-item>\
                    <yu-xform-item label="礼品兑换方式" name="commodityMValue" rules="required" ctype="input" disable></yu-xform-item>\
                    <yu-xform-item label="礼品说明" name="commodityStgNum" rules="required" ctype="textarea" :rows="2" disable></yu-xform-item>\
                </yu-xform-group>\
            </yu-xform>\
            </yu-row>\
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
                fastSearchValue: ''
            };
        },
        mounted: function() {
            var _this = this;
            console.log(_this.perInfo);
            var data = _this.perInfo;
            for (let key in data) {
                _this.formdatadd[key] = data[key];
                _this.formdatakh[key] = data[key];
                _this.formdatalp[key] = data[key];
            }
        },
        methods: {
            fn: function() {
                console.log('22212');
            },
            searchListCust: function() {
                console.log('11');
            }
        }
    });
}(Vue, 'gift-comp'));