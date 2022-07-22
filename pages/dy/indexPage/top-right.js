/*
 * @create by: ranxun@yusys.com.cn
 * @Date: 2021-08-06 09:48:32
 * @update by:
 * @description:
 */
(function (vue, name) {
  vue.component(name, {
    template: ' <div class="right-container">\
    <div class="calendar">\
      <week-calendar @handleDateClick="handleDateClick"></week-calendar>\
    </div>\
    <div class="tab-box">\
      <div class="tab-btns">\
        <ul>\
          <li v-for="tab in tabBtns" :key="tab.key" :class="{\'active\': tab.key === activeKey}" @click="handleTabCilck(tab.key)">{{ tab.name }}</li>\
        </ul>\
        <div class="colorRed" style="cursor: pointer;" @click="handleItemAdd">\
          <i class="el-icon-plus"></i>\
          <span>新增</span>\
        </div>\
      </div>\
      <div class="content-box" id="tab-content"></div>\
      <div class="seemore" @click="seemore">查看更多\
        <i class="el-icon-arrow-right"></i>\
      </div>\
    </div>\
    <wait2do-add  ref="wait2Add" :waitdo-visible="waitdoVisible" :selectDate="selectDate" @closeAdd="closeAdd"></wait2do-add>\
    <!--<report-add :report-visible="reportVisible" :selectDate="selectDate" @closeAdd="closeAdd"></report-add>-->\
    <report-add ref="reportAdd" :dialogVisible="dialogVisible" :selectDate="selectDate" @closeAdd="closeAdd"></report-add>\
  </div>',
    data: function () {
      return {
        menu: JSON.parse(yufp.sessionStorage.get('YUFP-SESSION-MENUS-OG')),
        tabBtns: [
          {
            name: '待办事项',
            key: 'wait2do'
          },
          {
            name: '工作报告',
            key: 'workReport'
          }
        ],
        activeKey: 'wait2do',
        dateRange: [],
        currentWeek: 0,
        componentName: 'wait2do',
        waitdoVisible: false,
        dialogVisible: false,
        reportVisible: false,
        selectDate: moment().format('YYYY-MM-DD'),
        calendarDate: ''
      };
    },
    mounted: function () {
      yufp.router.to('wait2do', null, 'tab-content');
    },
    methods: {
      onPreWeek: function () {
        this.currentWeek = this.currentWeek - 1;
        this.dateRange = this.returnDateRange(this.currentWeek);
      },
      onNextWeek: function () {
        this.currentWeek = this.currentWeek + 1;
        this.dateRange = this.returnDateRange(this.currentWeek);
      },

      // 切换选项卡
      handleTabCilck: function (key) {
        this.componentName = key;
        this.activeKey = key;
        let route = this.activeKey;
        yufp.router.to(route, {}, 'tab-content');
        let _this = this;
        setTimeout(function () {
          yufp.router.sendMessage(route, '01', { date: _this.selectDate });
        }, 500);
      },

      // 日期点击
      handleDateClick: function (date) {
        this.selectDate = date; // 暂存选择的日期
        let route = this.activeKey;
        yufp.router.sendMessage(route, '01', { date: this.selectDate });
      },

      handleItemAdd: function () {
        if (this.activeKey === 'wait2do') {
          this.waitdoVisible = true;
          this.$refs.wait2Add.addFn();
        } else {
          // this.reportVisible = true;
          this.dialogVisible = true;
          this.$refs.reportAdd.addFn();
        }
      },

      closeAdd: function (isUpdate) {
        this.waitdoVisible = false;
        // this.reportVisible = false;
        this.dialogVisible = false;
        if (isUpdate) {
          let route = this.activeKey;
          yufp.router.sendMessage(route, '01', { date: this.selectDate });
        }
      },

      // 查看更多
      seemore: function () {
        if (this.activeKey === 'wait2do') {
          // 跳转到代办事项
          var menu_tab = this.menu.filter(function (menu) {
            return menu.menuName === '待办事项';
          })[0];
          yufp.frame.addTab({
            id: menu_tab.funcId,
            key: menu_tab.menuId,
            title: '待办事项', // 页签名称
            data: ''
          });
        } else {
          // 跳转到工作报告
          var menu_tab = this.menu.filter(function (menu) {
            return menu.menuName === '工作报告';
          })[0];
          yufp.frame.addTab({
            id: menu_tab.funcId,
            key: menu_tab.menuId,
            title: '工作报告', // 页签名称
            data: ''
          });
        }
      }
    }
  });
}(Vue, 'top-right'));