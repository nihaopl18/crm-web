(function (vue, $, name) {
  // 日历-年份/月份选择组件
  vue.component(name, {
    template: '<div class="schedule-calendar-picker-list" v-if="visible">\
                <div class="schedule-calendar-picker-col" style="width: 60%">\
                  <ul ref="yearList">\
                    <li v-for="n in endYear - beginYear"\
                      :class="{ active: beginYear + n === year}"\
                      @click="selectYear(beginYear + n)">{{beginYear + n}}</li>\
                  </ul>\
                </div>\
                <div class="schedule-calendar-picker-col" style="width: 40%">\
                  <ul ref="monthList">\
                    <li v-for="n in 12" :class="{active: n === month + 1}"\
                      @click="selectMonth(n - 1)">{{n}}</li>\
                  </ul>\
                </div>\
              </div>',
    props: {
      beginYear: {
        type: Number,
        default: 1900
      },
      endYear: {
        type: Number,
        default: 2100
      },
      year: Number,
      month: Number,
      visible: Boolean
    },
    methods: {
      selectYear: function (year) {
        this.$parent.updateValue(year);
      },
      selectMonth: function (month) {
        this.$parent.updateValue(this.year, month);
      }
    },
    watch: {
      visible: function (val) {
        var _this = this;
        if (!val) {
          return;
        };
        _this.$nextTick(function () {
          _this.$refs.yearList.querySelector('li.active').scrollIntoView();
          _this.$refs.monthList.querySelector('li.active').scrollIntoView();
        });
      }
    }
  });
}(Vue, yufp.$, 'picker'));