(function (vue, $, name) {
  // 日历组件
  vue.component(name, {
    template: '<div class="schedule-calendar">\
                <header-bar :year="year"\
                  :month="month"\
                  @updateValue="updateView"\
                  @gotoToday="gotoToday"\
                  :today-btn-if="todayBtnIf"></header-bar>\
                <div class="schedule-calendar-body">\
                  <week :startWeek="startWeek"></week>\
                  <month :year="year" :month="month"\
                    :startWeek="startWeek"\
                    :data="events"\
                    :itemRender="dateItemRender"\
                    :EventBus="EventBus"></month>\
                </div>\
              </div>',
    props: {
      EventBus: Object,
      startMonth: String,
      startWeek: {
        type: Number,
        default: 0
      },
      events: {
        type: Array,
        default: []
      },
      dateItemRender: Function
    },
    data: function () {
      return {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        dragItem: null,
        todayBtnIf: false,
        nowDate: new Date()
      };
    },
    methods: {
      updateView: function (year, month) {
        this.year = year;
        this.month = month;
        var nowYear = this.nowDate.getFullYear();
        var nowMonth = this.nowDate.getMonth();
        if (nowYear == year && nowMonth == month) {
          this.todayBtnIf = false;
        } else {
          this.todayBtnIf = true;
        }
        this.EventBus.$emit('change-date', year, month);
      },
      cellDragenter: function (e, date, type, index) {
        this.$emit('event-dragenter', e, this.dragItem, date);
      },
      itemDragstart: function (e, item, date, type) {
        this.dragItem = item;
        this.$emit('event-dragstart', e, item, date);
      },
      itemDrop: function (e, date, type, index) {
        if (!this.dragItem) {
          return;
        };
        // console.log('[event-dragend]:', this.dragItem, date);
        this.$emit('event-dragend', e, this.dragItem, date);
      },
      itemClick: function (e, item) {
        // console.log('[event-click]:', item);
        // this.$emit('event-click', e, item);
      },
      dateClick: function (e, date) {
        // console.log('[date-click]:', date);
        // this.$emit('date-click', e, date);
      },
      gotoToday: function () {
        this.updateView(this.nowDate.getFullYear(), this.nowDate.getMonth());
      }
    },
    created: function () {
      this.EventBus.$on('cell-dragenter', this.cellDragenter);
      this.EventBus.$on('item-dragstart', this.itemDragstart);
      this.EventBus.$on('item-drop', this.itemDrop);
      this.EventBus.$on('item-click', this.itemClick);
      this.EventBus.$on('date-click', this.dateClick);
    },
    destoryed: function () {
      this.EventBus.$off();
    }
  });
}(Vue, yufp.$, 'schedule-calendar'));