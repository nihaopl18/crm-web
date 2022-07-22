import { isString } from '@/src/utils/types';
const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {};

/**
 * 有无自身属性
 * @param {*} obj 待检查对象
 * @param {*} key 待检查key
 */
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};
/**
 * 快速对象检查-主要用于当我们知道原始值是符合JSON的类型。
 * @param {*} obj 检查值
 * @returns {Boolean}
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * private
 * 浅复制,没有export，请不要在外部使用
 * @param {*} to 目标对象
 * @param {*} _from 源对象
 */
function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

/**
 * 将数组对象转换为对象
 * @param {*} arr 待转换数组
 */
export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

/**
 * 从指定对象获取指定路径的值
 * @param {*} object 对象
 * @param {*} prop 路径
 */
export const getValueByPath = function(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

/**
 * 数组转换为树结构
 * @param {*} obj object
 * data: '数组数据',
 * id: 'id字段名',
 * pid: '父id字段名',
 * label: '文本字段名',
 * root: '根id值/或根对象'
 */
export const array2tree = function(obj) {
  var data = obj.data;
  var idField = obj.id;
  var pidField = obj.pid;
  var labelField = obj.label;
  var root = {};
  var iconStr = obj.icon;
  data.forEach(node => {
    if (node[iconStr]) {
      node.icon = node[iconStr];
    }
  });
  if (typeof obj.root === 'object') {
    root = obj.root;
  } else {
    var tempObj = {};
    tempObj[idField] = obj.root;
    root = tempObj;
  }
  var children = [];
  var rId = '' + root[idField];
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    if (rId === '' + d[idField]) {
      root = d;
    } else if (rId === '' + d[pidField]) {
      children.push(d);
    }
  }
  // root.id = root[idField];
  root.label = root[labelField];
  root.children = children;
  for (var j = 0; j < root.children.length; j++) {
    root.children[j] = array2tree({
      data: data,
      id: idField,
      pid: pidField,
      label: labelField,
      root: root.children[j]
    });
  }
  return root;
};

const nodeChildren = function(setting, node, newChildren) {
  if (!node) {
    return null;
  }
  // var key = 'children' || setting.children;
  var key = 'children';
  if (typeof newChildren !== 'undefined') {
    node[key] = newChildren;
  }
  return node[key];
};

export const transformTozTreeFormat = function(setting, sNodes) {
  var i;
  var l;
  var key = setting.id;
  var parentKey = setting.pid;
  if (!key || key === '' || !sNodes) return [];

  if (Array.isArray(sNodes)) {
    var r = [];
    var tmpMap = {};
    for (i = 0, l = sNodes.length; i < l; i++) {
      sNodes[i].label = sNodes[i][setting.label];
      sNodes[i].id = sNodes[i][setting.id];
      sNodes[i].pid = sNodes[i][setting.pid];
      tmpMap[sNodes[i][key]] = sNodes[i];
    }
    for (i = 0, l = sNodes.length; i < l; i++) {
      var p = tmpMap[sNodes[i][parentKey]];
      if (p && sNodes[i][key] !== sNodes[i][parentKey]) {
        var children = nodeChildren(setting, p);
        if (!children) {
          children = nodeChildren(setting, p, []);
        }
        children.push(sNodes[i]);
      } else {
        r.push(sNodes[i]);
      }
    }
    return r;
  } else {
    return [sNodes];
  }
};

/**
 * private
 * 对象转字符串，支持function转源码
 */
export const obj2str = function(obj) {
  var str = JSON.stringify(obj, function(k, v) {
    if (typeof v === 'function') {
      return v.toString();
    }
    return v;
  });
  return str.replace(/\\n\s+/g, '\\n ');
};
/**
 * private
 * 字符串转对象，支持源码转function
 */
export const str2obj = function(str) {
  if (str.indexOf && str.indexOf('function') > -1) {
    return eval('(function(){return ' + str + ' })()');
  } else {
    return eval(str);
  }
};
export const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i;
    }
  }
  return -1;
};

export const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};
/**
 * 检查两个值是否松散相等-即，如果它们是普通对象，是否有相同的属性值
 * @param {*} a 比较值a
 * @param {*} b 比较值b
 */
export function looseEqual(a, b) {
  if (a === b) { return true; }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
};
/**
 * Formats the number according to the format string.
 * examples (123456.789):
 * 0 - (123456) show only digits, no precision<br>
 * 0.00 - (123456.78) show only digits, 2 precision<br>
 * 0.0000 - (123456.7890) show only digits, 4 precision<br>
 * 0,000 - (123,456) show comma and digits, no precision<br>
 * 0,000.00 - (123,456.78) show comma and digits, 2 precision<br>
 * 0,0.00 - (123,456.78) shortcut method, show comma and digits, 2 precision<br>
 * To reverse the grouping (,) and decimal (.) for international numbers, add /i to the end.
 * For example: 0.000,00/i
 * @param {Number} v The number to format.
 * @param {String} format The way you would like to format this text.
 * @return {String} The formatted number.
 */
export function numberFormatter(v, format) {
  if (!format) {
    return v;
  }
  if (isNaN(v)) {
    return '';
  }
  let comma = ',';
  let dec = '.';
  let i18n = false;
  let neg = v < 0;

  v = Math.abs(v);
  if (format.substr(format.length - 2) === '/i') {
    format = format.substr(0, format.length - 2);
    i18n = true;
    comma = '.';
    dec = ',';
  }

  let hasComma = format.indexOf(comma) !== -1;
  let psplit = (i18n ? format.replace(/[^\d,]/g, '') : format.replace(/[^\d.]/g, '')).split(dec);

  if (psplit.length > 1) {
    v = v.toFixed(psplit[1].length);
  } else if (psplit.length > 2) {
    throw new Error('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
  } else {
    v = v.toFixed(0);
  }

  let fnum = v.toString();

  psplit = fnum.split('.');

  if (hasComma) {
    let cnum = psplit[0];
    let parr = [];
    let j = cnum.length;
    let m = Math.floor(j / 3);
    let n = cnum.length % 3 || 3;
    let i;

    for (i = 0; i < j; i += n) {
      if (i !== 0) {
        n = 3;
      }
      parr[parr.length] = cnum.substr(i, n);
      m = m - 1;
    }
    fnum = parr.join(comma);
    if (psplit[1]) {
      fnum += dec + psplit[1];
    }
  } else {
    if (psplit[1]) {
      fnum = psplit[0] + dec + psplit[1];
    }
  }

  return (neg ? '-' : '') + format.replace(/[\d,?.?]+/, fnum);
};

export function rafThrottle(fn) {
  let locked = false;
  return function(...args) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
}

// coerce truthy value to array
export const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val;
  } else if (val) {
    return [val];
  } else {
    return [];
  }
};

export const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g;
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase();
};

export const autoprefixer = function(style) {
  if (typeof style !== 'object') return style;
  const rules = ['transform', 'transition', 'animation'];
  const prefixes = ['ms-', 'webkit-'];
  rules.forEach(rule => {
    const value = style[rule];
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value;
      });
    }
  });
  return style;
};

export const arrayEquals = function(arrayA, arrayB) {
  arrayA = arrayA || [];
  arrayB = arrayB || [];

  if (arrayA.length !== arrayB.length) {
    return false;
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false;
    }
  }

  return true;
};

export const capitalize = function(str) {
  if (!isString(str)) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateId = function() {
  return Math.floor(Math.random() * 10000);
};

export const isEmpty = function(val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
};

export const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2);
  }
  return looseEqual(value1, value2);
};

export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
/**
 * 生成随机数
 * @param {Number} len 生成随机长度
 */
export const getRandomID = len => Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
