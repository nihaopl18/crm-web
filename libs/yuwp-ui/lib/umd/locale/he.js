(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('@/locale/he', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.YUFPWP.lang = global.YUFPWP.lang || {}; 
    global.YUFPWP.lang.he = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    el: {
      colorpicker: {
        confirm: 'אישור',
        clear: 'נקה'
      },
      datepicker: {
        now: 'כעת',
        today: 'היום',
        cancel: 'בטל',
        clear: 'נקה',
        confirm: 'אישור',
        selectDate: 'בחר תאריך',
        selectTime: 'בחר זמן',
        startDate: 'תאריך התחלה',
        startTime: 'זמן התחלה',
        endDate: 'תאריך סיום',
        endTime: 'זמן סיום',
        year: '',
        month1: 'ינואר',
        month2: 'פברואר',
        month3: 'מרץ',
        month4: 'אפריל',
        month5: 'מאי',
        month6: 'יוני',
        month7: 'יולי',
        month8: 'אוגוסט',
        month9: 'ספטמבר',
        month10: 'אוקטובר',
        month11: 'נובמבר',
        month12: 'דצמבר',
        // week: 'week',
        weeks: {
          sun: 'א׳',
          mon: 'ב׳',
          tue: 'ג׳',
          wed: 'ד׳',
          thu: 'ה׳',
          fri: 'ו׳',
          sat: 'שבת'
        },
        months: {
          jan: 'ינואר',
          feb: 'פברואר',
          mar: 'מרץ',
          apr: 'אפריל',
          may: 'מאי',
          jun: 'יוני',
          jul: 'יולי',
          aug: 'אוגוסט',
          sep: 'ספטמבר',
          oct: 'אוקטובר',
          nov: 'נובמבר',
          dec: 'דצמבר'
        }
      },
      select: {
        loading: 'טוען',
        noMatch: 'לא נמצאו נתונים',
        noData: 'ללא נתונים',
        placeholder: 'בחר'
      },
      cascader: {
        noMatch: 'ללא נתונים מתאימים',
        loading: 'טוען',
        placeholder: 'בחר'
      },
      pagination: {
        goto: 'עבור ל',
        pagesize: '/page',
        total: 'כולל {total}',
        pageClassifier: ''
      },
      messagebox: {
        title: 'הודעה',
        confirm: 'אישור',
        cancel: 'בטל',
        error: 'קלט לא תקין'
      },
      upload: {
        delete: 'מחק',
        preview: 'תצוגה מקדימה',
        continue: 'המשך'
      },
      table: {
        emptyText: 'אין נתונים',
        confirmFilter: 'אישור',
        resetFilter: 'נקה',
        clearFilter: 'הכל',
        sumText: 'סך'
      },
      tree: {
        emptyText: 'אין נתונים'
      },
      transfer: {
        noMatch: 'אין נתונים מתאימים',
        noData: 'ללא נתונים',
        titles: ['רשימה 1', 'רשימה 2'],
        filterPlaceholder: 'הקלד',
        noCheckedFormat: 'פריטים {total}',
        hasCheckedFormat: ' אישור {checked}/{total}'
      }
    }
  };
  module.exports = exports['default'];
});