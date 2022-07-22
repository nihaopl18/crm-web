(function (vue, $, name) {
  // 日历-月份面板单元格组件
  vue.component(name, {
    template: '<div class="schedule-calendar-date"\
                :class="[type, { today: isToday, dragged: draggedIndex === index }, {click: clicked}]"\
                @dragover.prevent="" @dragenter.prevent="dragenter"\
                @drop="onDrop" @click="cellClick">\
                <div class="schedule-calendar-date-hd">\
                  <div class="schedule-calendar-date-label">{{date.getDate()}}</div>\
                  <button type="button" class="schedule-calendar-counter"\
                    v-if="details.length > volume"\
                    @click.stop.prevent="expandAll">共 {{details.length}} 项</button>\
                </div>\
                <div class="schedule-calendar-details" :class="{ expanded }"\
                  :style="detailsPost" ref="details">\
                  <div v-show="expanded"\
                    class="schedule-calendar-details-hd">{{ dateString }}</div>\
                  <div class="schedule-calendar-details-bd">\
                    <event-item v-if="details.length"\
                      v-for="item in displayDetails"\
                      :item="item"\
                      :date="date"\
                      :type="type"\
                      :itemRender="itemRender"\
                      @item-dragstart="dragItem"\
                      :key="item.id"\
                      :EventBus="EventBus"></event-item>\
                  </div>\
                </div>\
              </div>',
    props: {
      EventBus: Object,
      date: Date,
      type: String,
      data: Array,
      index: Number,
      draggedIndex: Number,
      itemRender: Function
    },
    data: function () {
      return {
        volume: 0,
        expanded: false,
        Store: {
          hasExpand: false
        }
      };
    },
    mounted: function () {
      this.calcVolume();
      window.addEventListener('resize', this.calcVolume);
    },
    computed: {
      isToday: function () {
        return this.isSameDay(new Date(), this.date);
      },
      details: function () {
        var _this = this;
        // return this.data.length ? this.data.filter(item => isSameDay(item.date, this.date)) : []
        return this.data.length ? this.data.filter(function (item) {
          return _this.isSameDay(item.date, _this.date);
        }) : [];
      },
      displayDetails: function () {
        return this.expanded ? this.details : this.details.slice(0, this.volume + 1);
      },
      dateString: function () {
        return this.format(this.date);
      },
      detailsPost: function () {
        var post = {};
        if (this.index >= 35) {
          post.bottom = 0;
        } else {
          post.top = 0;
        }
        if ((this.index + 1) % 7 === 0) {
          post.right = 0;
        } else {
          post.left = 0;
        }
        return post;
      },
      clicked: function () {
        var curDate = new Date(this.EventBus.curDate);
        return curDate.getFullYear() == this.date.getFullYear() &&
          curDate.getMonth() == this.date.getMonth() &&
          curDate.getDate() == this.date.getDate();
      }
    },
    methods: {
      tryParse: function (obj) {
        return typeof obj === 'string' ? new Date(obj) : obj;
      },
      isSameDay: function (one, two) {
        var oneDate = this.tryParse(one);
        var twoDate = this.tryParse(two);
        return (
          oneDate.getDate() === twoDate.getDate() &&
            oneDate.getMonth() === twoDate.getMonth() &&
            oneDate.getFullYear() === twoDate.getFullYear()
        );
      },
      fillZero: function (val) {
        return val < 10 ? '0' + val : val;
      },
      format: function (date) {
        var exp = 'yyyy年MM月dd日';
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return exp.
          replace('yyyy', y).
          replace('MM', this.fillZero(m)).
          replace('dd', this.fillZero(d));
      },
      calcVolume: function () {
        this.volume = Math.floor(this.$refs.details.clientHeight / 27);
      },
      expandAll: function () {
        this.expanded = true;
        document.addEventListener('mouseup', this.reduceAll);
      },
      reduceAll: function (e) {
        if (!this.$refs.details.contains(e.target)) {
          this.expanded = false;
          this.Store.hasExpand = true; // 设为 true，当前点击仅仅是为了收缩单元格
          document.removeEventListener('mouseup', this.reduceAll);
        }
      },
      dragenter: function (e) {
        if (this.$el.contains(e.target)) {
          this.$emit('highlight', this.index);

          if (this.$el === e.target) {
            this.EventBus.$emit('cell-dragenter', e, this.format(this.date, 'yyyy-MM-dd'), this.type, this.index);
          }
        }
      },
      dragItem: function (e, item, date, type) {
        this.$emit('highlight', this.index);
        this.EventBus.$emit('item-dragstart', e, item, this.format(date, 'yyyy-MM-dd'), type);
      },
      onDrop: function (e) {
        this.$emit('highlight', -1);
        this.EventBus.$emit('item-drop', e, this.format(this.date, 'yyyy-MM-dd'), this.type, this.index);
      },
      cellClick: function (e) {
        // 此时为收缩单页格，不触发 date-click
        if (this.Store.hasExpand) {
          // 设为 false，下次正常触发 date-click
          this.Store.hasExpand = false;
          return;
        }
        // 限制点击的dateCell在当前展示月内
        if (this.date.getFullYear() == new Date(this.EventBus.curMonthDays[0]).getFullYear() &&
          this.date.getMonth() == new Date(this.EventBus.curMonthDays[1]).getMonth()) {
          this.EventBus.$emit('date-click', e, this.date);
        }
      }
    },
    destroyed: function () {
      window.removeEventListener('resize', this.calcVolume);
    }
  });
}(Vue, yufp.$, 'date-cell'));