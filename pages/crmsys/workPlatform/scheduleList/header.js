(function (vue, $, name) {
  // 日历-按钮操作头组件
  vue.component(name, {
    template: '<header class="schedule-calendar-hd">\
                    <el-button class="schedule-calendar-pleft schedule-calendar-arrow" style="margin-left:10px"\
                      v-if="todayBtnIf" @click="gotoToday">今日</el-button>\
                    <el-button type="text"\
                      class="schedule-calendar-pcenter schedule-calendar-arrow double-arrow"\
                      @click="prevYear">&lt;&lt;</el-button>\
                    <el-button type="text"\
                      class="schedule-calendar-pcenter schedule-calendar-arrow"\
                      @click="prevMonth">&lt;</el-button>\
                    <div class="schedule-calendar-pcenter schedule-calendar-picker" ref="picker">\
                      <div role="button" class="schedule-calendar-display"\
                        @click="pickerVisible = !pickerVisible">{{year}} 年 {{month + 1}} 月</div>\
                      <picker :visible="pickerVisible" :year="year" :month="month"></picker>\
                    </div>\
                    <el-button type="text" class="schedule-calendar-pcenter schedule-calendar-arrow"\
                      @click="nextMonth">&gt;</el-button>\
                    <el-button type="text" class="schedule-calendar-pcenter schedule-calendar-arrow double-arrow"\
                      @click="nextYear">&gt;&gt;</el-button>\
              </header>',
    props: {
      year: Number,
      month: Number,
      todayBtnIf: Boolean
    },
    data: function () {
      return {
        pickerVisible: false
      };
    },
    methods: {
      siblingsMonth: function (y, m, n) {
        var date = new Date(y, m, 1);
        date.setMonth(m + n);
        return {
          year: date.getFullYear(),
          month: date.getMonth()
        };
      },
      updateValue: function (year, month) {
        this.$emit('updateValue', year, month == null ? this.month : month);
      },
      prevYear: function () {
        this.updateValue(this.year - 1);
      },
      nextYear: function () {
        this.updateValue(this.year + 1);
      },
      prevMonth: function () {
        var result = this.siblingsMonth(this.year, this.month, -1);
        this.updateValue(result.year, result.month);
      },
      nextMonth: function () {
        var result = this.siblingsMonth(this.year, this.month, 1);
        this.updateValue(result.year, result.month);
      },
      clickOutSide: function (e) {
        if (this.pickerVisible && !this.$refs.picker.contains(e.target)) {
          this.pickerVisible = false;
        }
      },
      gotoToday: function () {
        this.$emit('gotoToday');
      }
    }
  });
}(Vue, yufp.$, 'header-bar'));