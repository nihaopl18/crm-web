/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-06 09:48:32
 * @update by:
 * @description: 周历
 */
(function(vue, name) {
    vue.component(name, {
        template: ' <div class="date">\
    <!-- 年份 月份 -->\
    <div class="month">\
    <p class="pre-week" @click="weekPre"><i class="el-icon-arrow-left"></i> 上一周</p>\
    <p class="next-week" @click="weekNext"> 下一周 <i class="el-icon-arrow-right"></i></p>\
    <div class="month-title">\
    <div class="title-year">\
    <el-select :clearable="false" style="width:46px" v-model="currentYear" @change="handleYearChange">\
    <el-option v-for="item in years" :key="item" :value="item" :label="item"></el-option>\
    </el-select>\
    年\
    </div>\
    <div class="title-month">\
    <el-select :clearable="false" style="width:28px" v-model="currentMonth" @change="handleMonthChange">\
    <el-option v-for="item in 12" :key="item" :value="item" :label="item"></el-option>\
    </el-select>\
    月\
    </div>\
    </div>\
    </div>\
    <!-- 星期 -->\
    <ul class="weekdays">\
    <li>一</li>\
    <li>二</li>\
    <li>三</li>\
    <li>四</li>\
    <li>五</li>\
    <li>六</li>\
    <li>日</li>\
    </ul>\
    <!-- 日期 -->\
    <ul class="days">\
    <li @click="pick(day)" v-for="(day, index) in days" :key="index">\
     <!--本月-->\
     <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>\
     <span v-else>\
     <!--今天-->\
     <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" :class="[selectDate === moment(day).format(\'YYYY-MM-DD\')? \'active\' : \'\', \'is-today\']">{{ day.getDate() }}</span>\
     <span :class="[selectDate === moment(day).format(\'YYYY-MM-DD\')? \'active\' : \'\']" v-else>{{ day.getDate() }}</span>\
     </span>\
     <p>\
      <span v-for="item in returnDotClassArr(day)" :key="item" :class="[\'dot\', item]"></span>\
     </p>\
    </li>\
    </ul>\
   </div>',
        data: function() {
            return {
                currentYear: 1970, // 年份
                currentMonth: 1, // 月份
                currentDay: 1, // 日期
                currentWeek: 1, // 星期
                days: [],
                years: [],
                months: [],
                selectDate: moment().format('YYYY-MM-DD'),
                waitTodoDayArr: [],
                reportDayArr: []
            };
        },
        created: function() {
            this.initData(null);
            this.getYears();
        },
        methods: {
            formatDate: function(year, month, day) {
                let y = year;
                let m = month;
                if (m < 10) {
                    // m = `0${m}`;
                    m = '0' + m;
                }
                let d = day;
                if (d < 10) {
                    // d = `0${d}`;
                    d = '0' + d;
                }
                // return `${y}-${m}-${d}`;
                return y + '-' + m + '-' + d;

            },

            returnDotClassArr: function(day) {
                var arr = [];
                for (var i = 0; i < this.waitTodoDayArr.length; i++) {
                    if (moment(this.waitTodoDayArr[i]).format('YYYY-MM-DD') == moment(day).format('YYYY-MM-DD')) {
                        arr.push('red');
                    }
                }
                for (var i = 0; i < this.reportDayArr.length; i++) {
                    if (moment(this.reportDayArr[i]).format('YYYY-MM-DD') == moment(day).format('YYYY-MM-DD')) {
                        arr.push('yellow');
                    }
                }
                return arr;
            },

            getNotice: function(date) {
                var _this = this;
                var date = moment(date).format('YYYY-MM-DD');
                yufp.service.request({
                    method:   'GET',
                    url:   '/api/todowork/selectDataNum',
                    data:  {
                        condition:  JSON.stringify({ userId:  yufp.session.userId,  startDate:  date  })
                    },
                    callback:   function (code,  message,  response)  {
                        if  (code  ==  0 && response.data)  {
                            _this.waitTodoDayArr = response.data.todowork;
                            _this.reportDayArr = response.data.workReport;
                        }
                    }
                });
            },

            initData: function(cur) {
                let date = '';
                if (cur) {
                    if (typeof(cur) == 'string') {
                        date = new Date(cur.replace(/(\-)/g, '/'));
                    } else {
                        date = new Date(cur);
                    }
                } else {
                    date = new Date();
                }
                this.currentDay = date.getDate(); // 今日日期 几号
                this.currentYear = date.getFullYear(); // 当前年份
                this.currentMonth = date.getMonth() + 1; // 当前月份
                this.currentWeek = date.getDay(); // 1...6,0 // 星期几
                if (this.currentWeek === 0) {
                    this.currentWeek = 7;
                }
                let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay); // 今日日期 年-月-日
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
                /* eslint-disabled */
                for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
                    let d = new Date(str);
                    d.setDate(d.getDate() - i);
                    this.days.push(d);
                }
                for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
                    let d = new Date(str);
                    d.setDate(d.getDate() + i);
                    this.days.push(d);
                }
                this.getNotice(this.days[0]);
            },

            getYears: function() {
                var myDate = new Date();
                var startYear = myDate.getFullYear() - 50; // 起始年份
                var endYear = myDate.getFullYear() + 50; // 结束年份
                for (var i = startYear; i <= endYear; i++) {
                    this.years.push(i);
                }
            },

            handleYearChange: function(year) {
                let date = year + '-' + this.currentMonth + '-' + this.currentDay;
                this.initData(date);
            },

            handleMonthChange: function(month) {
                let date = this.currentYear + '-' + month + '-' + this.currentDay;
                this.initData(date);
            },

            // 上个星期
            weekPre: function() {
                let d = this.days[0]; // 如果当期日期是7号或者小于7号
                d.setDate(d.getDate() - 7);
                this.initData(d);
            },

            // 下个星期
            weekNext: function() {
                let d = this.days[6]; // 如果当期日期是7号或者小于7号
                d.setDate(d.getDate() + 7);
                this.initData(d);
            },

            // 上一個月 传入当前年份和月份
            pickPre: function(year, month) {
                let d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },


            // 下一個月 传入当前年份和月份
            pickNext: function(year, month) {
                let d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
            },

            // 当前选择日期
            pick: function(date) {
                this.selectDate = moment(date).format('YYYY-MM-DD');
                this.$emit('handleDateClick', date);
            }
        }
    });
}(Vue, 'week-calendar'));