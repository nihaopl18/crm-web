
(function (vue, $, name) {
    vue.component(name, {
        template: '<div>\
        <el-form :model="ruleForm" v-model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">\
        <el-form-item class="timep" prop="timerVal" label-width="140px"label="日期：">\
            <el-date-picker\
            id="timep"\
            name="dateTime"\
            v-model="ruleForm.timerVal"\
            type="date"\
            align="left"\
            :picker-options="pickerOptions"\
            placeholder="选择日期">\
            </el-date-picker>\
        <el-form-item>\
        </el-form>\
      </div > ',
        props: {
            quarParams: String
        },
        data: function () {
            let _this = this;
            return {
                ruleForm: {
                    timerVal: '',
                },
                rules: {
                    timerVal: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                },
                pickerOptions: {
                    disabledDate(time) {
                        let thisMonth = _this.quarParams == '4' ? 338400000 : 86400000;
                        let lastMonth = _this.quarParams == '4' ? 2936700000 : 2678400000
                        let curSelectTime = new Date().getTime();
                        let before = curSelectTime - thisMonth
                        let after = curSelectTime - lastMonth
                        if (time.getTime() > after) {
                            return time.getTime() < after || time.getTime() > before;
                        } else {
                            return new Date(time.getTime() + 86400000).getDate() - 1 != 0
                        }
                    },
                },
            };
        },
        methods: {
            resetFn: function () {
                let _this = this;
                _this.$refs.ruleForm.resetFields()
            },
            getParamsTime: function (val) {
                let timeA = this.ruleForm.timerVal
                let timeB = this.getStandertTime(timeA)
                return timeB
            },
            getStandertTime: function (val) {
                if (val) {
                    var date = val
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    return y + '-' + m + '-' + d;
                }
            },
            getInputValue: function () {
                let _this = this;
                let flag = null;
                _this.$refs.ruleForm.validate(function (valid) {
                    flag = valid
                })
                return flag;
            }
        },
    });
}(Vue, yufp.$, 'yu-quarter'));