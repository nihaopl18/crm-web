(function (vue, $, name) {
  // 日历-星期展示组件
  vue.component(name, {
    template: '<div class="schedule-calendar-week">\
                <span v-for="wk in weeks"\
                  class="schedule-calendar-week-item">{{wk}}</span>\
              </div>',
    props: {
      startWeek: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        cn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      };
    },
    computed: {
      weeks: function () {
        return this.startWeek === 0 ? this.cn : this.cn.concat(this.cn.splice(0, this.startWeek));
      }
    }
  });
}(Vue, yufp.$, 'week'));