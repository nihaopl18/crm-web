(function (vue, $, name) {
  // 日历-事件项目组件
  vue.component(name, {
    template: '',
    props: {
      EventBus: Object,
      item: Object,
      date: Date,
      type: String,
      itemRender: Function
    },
    methods: {
      onDrag: function (e) {
        this.$emit('item-dragstart', e, this.item, this.date, this.type);
      },
      onClick: function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.EventBus.$emit('item-click', e, this.item);
      },
      getStatusClass: function () {
        return 'schedule-calendar-status_' + this.item.status;
      }
    },
    render: function (h) {
      return h('div', {
        class: ['schedule-calendar-detail-item', this.getStatusClass()],
        attrs: {
          draggable: true
        },
        on: {
          dragstart: this.onDrag,
          click: this.onClick
        }
      }, this.itemRender ? [this.itemRender(this.item)] : [h('span', this.item.text)]);
    }
  });
}(Vue, yufp.$, 'event-item'));