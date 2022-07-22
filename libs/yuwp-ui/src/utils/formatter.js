/**
 * Created by zhangkun on 2018/09/17.
 */
import { getValueByPath } from './util';

export const formatters = {

  'moneyFormatter': function(money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * num：保留几位小数
      * */
    num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(num) + '';
    var l = money.split('.')[0].split('').reverse();
    var r = money.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
  },

  'toPercent': function(money, num) {
    /*
      * 参数说明：
      * money：要格式化的数字
      * */
    //      num = num > 0 && num <= 20 ? num : 2;
    money = parseFloat((money + '')) + '%';
    return money;
  },

  // 表格格式化单元格使用
  'dateFormatter': function(row, column, time) {
    var format;
    if (column.ctype === 'timeselect' || column.ctype === 'timepicker') {
      format = '{h}:{i}:{s}';
    } else {
      format = '{y}-{m}-{d}';
    }
    var date;
    if (!time || time === '') {
      return time;
    }
    if (typeof time === 'object') {
      date = time;
    } else if (typeof time === 'string') {
      return time;
    } else {
      if (('' + time).length === 10) {
        time = parseInt(time, 10) * 1000;
      }
      date = new Date(time);
    }
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, function(result, key) {
      var value = formatObj[key];
      if (key === 'a') {
        return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value;
      }
      return value || 0;
    });
    return time_str;
  },

  // 表格格式化单元格使用
  'keytoValue': function(row, column, val) {
    var arr = [].concat(val);
    var returnValue = '';
    if (column.dataCode) {
      var value = getValueByPath(row, column.property) || val;
      if (value instanceof Array) {
        value = yufp.lookup.convertMultiKey(column.dataCode, value.join(','));
      } else if (typeof value === 'string' && value.indexOf(column.separator) > -1) {
        value = yufp.lookup.convertMultiKey(column.dataCode, value, column.separator);
      } else {
        value = yufp.lookup.convertKey(column.dataCode, value);
      }
      if (column.attrs['allow-create'] !== false && value === '') {
        return val;
      } else {
        return value;
      }
    } else if (column.options) {
      var options = column.options;
      for (var i = 0, l = options.length; i < l; i++) {
        for (var j = 0, lh = arr.length; j < lh; j++) {
          // 当有设置props时也进行转换 liujie1 20191028
          if (column.props && options[i][column.props.key] === arr[j]) {
            returnValue = returnValue + options[i][column.props.value] + '，';
          } else
          if (options[i].key === arr[j]) {
            returnValue = returnValue + options[i].value + '，';
          }
        }
      }
      if (column.attrs['allow-create'] !== false && returnValue === '') {
        return val;
      } else {
        return returnValue.slice(0, -1);
      }
    } else {
      return val;
    }
  }
};
