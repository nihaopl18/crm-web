(function (vue, $, name) {
  // 日历-月份面板组件
  vue.component(name, {
    template: '<div class="schedule-calendar-month"\
                :class="{ [animationClass]: animated }"\
                @animationend="removeAnimation">\
                <date-cell v-for="(item, index) in days"\
                  :date="item.date"\
                  :type="item.type"\
                  :data="data"\
                  :index="index"\
                  :draggedIndex="draggedIndex"\
                  :itemRender="itemRender"\
                  @highlight="highlight"\
                  :key="index"\
                  :EventBus="EventBus"></date-cell>\
              </div>',
    props: {
      EventBus: Object,
      year: Number,
      month: Number,
      startWeek: Number,
      data: Array,
      itemRender: Function
    },
    data: function () {
      return {
        viewTransition: 'sc-moveTo',
        draggedIndex: -1,
        direction: 'Left',
        animated: false,
        PREV_DATE_TYPE: 'prev',
        CURRENT_DATE_TYPE: 'current',
        NEXT_DATE_TYPE: 'next'
      };
    },
    computed: {
      days: function () {
        return this.monthlyCalendar(this.year, this.month, this.startWeek);
      },
      animationClass: function () {
        return this.viewTransition + this.direction;
      },
      mDate: function () {
        return new Date(this.year, this.month, 0);
      }
    },
    methods: {
      isLeap: function (year) {
        return (year % 100 !== 0 && year % 4 === 0) || year % 400 === 0;
      },
      calcDays: function (obj) {
        var num = 31;
        switch (obj.month + 1) {
        case 2:
          num = this.isLeap(obj.year) ? 29 : 28;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          num = 30;
          break;
        }
        return num;
      },
      siblingsMonth: function (y, m, n) {
        var date = new Date(y, m, 1);
        date.setMonth(m + n);
        return {
          year: date.getFullYear(),
          month: date.getMonth()
        };
      },
      calcPrevMonth: function (year, month) {
        return this.siblingsMonth(year, month, -1);
      },
      firstWeek: function (year, month) {
        return new Date(year, month, 1).getDay();
      },
      calcNextMonth: function (year, month) {
        return this.siblingsMonth(year, month, 1);
      },
      monthlyCalendar: function (year, month, startWeek) {
        var result = [];
        var curMonth = { year: year, month: month };
        var days = this.calcDays(curMonth);
        var prevMonth = this.calcPrevMonth(year, month);
        var prevDays = this.calcDays(prevMonth);
        var prevOver = (this.firstWeek(year, month) || 7) - startWeek;
        var nextMonth = this.calcNextMonth(year, month);
        for (var p = prevDays - prevOver + 1; p <= prevDays; p++) {
          result.push({
            date: new Date(prevMonth.year, prevMonth.month, p),
            type: this.PREV_DATE_TYPE
          });
        }
        for (var c = 1; c <= days; c++) {
          result.push({
            date: new Date(curMonth.year, curMonth.month, c),
            type: this.CURRENT_DATE_TYPE
          });
        }
        for (var n = 1, nl = 42 - result.length; n <= nl; n++) {
          result.push({
            date: new Date(nextMonth.year, nextMonth.month, n),
            type: this.NEXT_DATE_TYPE
          });
        }
        return result;
      },
      removeAnimation: function () {
        this.animated = false;
      },
      addAnimation: function (val, old) {
        if (val !== old) {
          this.animated = true;
        }
      },
      highlight: function (index) {
        this.draggedIndex = index;
      }
    },
    watch: {
      mDate: function (val, old) {
        if (old) {
          if (val < old) {
            this.direction = 'Right';
          }
          if (val > old) {
            this.direction = 'Left';
          }
        }

        if (val !== old) {
          this.animated = true;
        }
      }
    }
  });
}(Vue, yufp.$, 'month'));