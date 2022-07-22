define([
  './custom/plugins/echain.calendar.js'
], function (require, exports) {
  exports.ready = function (hashCode, data, cite) {
    yufp.custom.vue({
      el: '#echainfreedate',
      data: function () {
        return {
          freeDays: [],
          initYear: ''
        };
      },
      methods: {
        initFreeDate: function () {
          var me = this;
          var initYear = me.initYear;
          if (initYear && initYear.length == 4) {
            yufp.service.request({
              method: 'POST',
              data: { year: initYear, month: '01', day: '01' },
              async: false,
              url: backend.echainService + '/api/joincore/wfFreeDateInit',
              callback: function (code, message, response) {
                me.$refs.Calendar.ChoseMonth(initYear + '-01-01');
                yufp.util.butLogInfo(hashCode, '工作日历', '初始化');
              }
            });
          }
        },
        changeMonth: function (date) {
          var calendar = this.getCalendar(new Date(date));
          this.updateFreeDays(calendar.year, calendar.month);
        },
        selectDay: function (date) {
          var me = this;
          var url = backend.echainService;
          var calendar = this.getCalendar(new Date(date));
          var isFreeDay = false;
          for (var i = 0; i < me.freeDays.length; i++) {
            var freeDay = me.freeDays[i];
            if (freeDay == calendar.day) {
              isFreeDay = true;
              break;
            }
          }
          if (isFreeDay) {
            url += '/api/joincore/wfFreeDateSetWorkDate';
          } else {
            url += '/api/joincore/wfFreeDateSetFreeDate';
          }

          yufp.service.request({
            method: 'POST',
            data: { year: calendar.year, month: calendar.month, day: calendar.day },
            async: false,
            url: url,
            callback: function (code, message, response) {
              me.freeDays = response.data;
            }
          });
        },
        updateFreeDays: function (uyear, umonth) {
          var me = this;
          yufp.service.request({
            method: 'GET',
            data: { year: uyear, month: umonth },
            async: false,
            url: backend.echainService + '/api/joincore/wfGetFreeDays',
            callback: function (code, message, response) {
              me.freeDays = response.data;
            }
          });
        },
        getCalendar: function (date) {
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          if (month >= 1 && month <= 9) {
            month = '0' + month;
          }
          if (day >= 0 && day <= 9) {
            day = '0' + day;
          }
          return {
            year: '' + year,
            month: '' + month,
            day: '' + day
          };
        }
      },
      mounted: function () {
        var calendar = this.getCalendar(new Date());
        this.updateFreeDays(calendar.year, calendar.month);
      }
    });
  };
});