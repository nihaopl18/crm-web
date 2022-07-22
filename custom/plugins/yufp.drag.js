/**
 * 拖拽api
 * created by zhangkun6 2019-01-19
 */

var _on = function (dom, eventType, handle) {
  dom.addEventListener(eventType, handle);
};
var _off = function (dom, eventType, handle) {
  dom.removeEventListener(eventType, handle);
};
function Drag (options, context) {
  // 最新的模版数据
  this.domSet = document.getElementsByClassName('drag-item');
  this.context = context;
  this.newTemplate = yufp.clone(this.context.$refs.screen.template, []);
  this.options = options;
  this.allowDrag = false;
  this.init(this.domSet);
};
Drag.prototype.init = function () {
  // 距离屏幕左边距离，上边距离
  var _toClientLeft = this.getOffSetLeft(document.getElementsByClassName('el-carousel')[0]);
  var _toClientTop = this.getOffSetTop(document.getElementsByClassName('el-carousel')[0]) + 50;
  var _this = this;
  var handleStart = function (event) {
    var activeIndex = _this.context.$refs.screen.$children[0].activeIndex - 1;
    var parent = document.getElementsByClassName('drag-container')[activeIndex];
    var left, top;
    if (event.target.nodeName === 'I') {
      return;
    } else {
      _this.allowDrag = true;
      var target = event.currentTarget;
      var startX = event.clientX;
      var startY = event.clientY;
      if (target.nodeName === 'DIV') {
        if (parent.children.length < 2) {
          return;
        }
        left = target.offsetLeft;
        top = target.offsetTop;
        target.style.left = left + 'px';
        target.style.top = top + 'px';
        target.style.position = 'absolute';
        target.addEventListener('mousemove', handleDrag);
        target.addEventListener('mouseup', handleEnd);
        _this.creatDom(target);
      } else if (target.nodeName === 'LI') {
        _this.context.visible = false;
        left = startX - _toClientLeft - 120;
        top = startY - _toClientTop - 120;
        var title = target.innerText;
        var vdom = document.createElement('div');
        _this._index = _this.getIndex(target);
        vdom.addEventListener('mousemove', handleDrag);
        vdom.addEventListener('mouseup', handleEnd);
        parent.appendChild(vdom);
        vdom.innerText = title;
        vdom.style.position = 'absolute';
        vdom.style.left = left + 'px';
        vdom.style.top = top + 'px';
        vdom.setAttribute('class', 'drag');
      }
      _this.record = function () {
        return {startX: startX, startY: startY, left: left, top: top};
      };
    }
  };
  _this.handleStart = handleStart;
  var handleDrag = function (event) {
    if (_this.allowDrag) {
      var record = _this.record();
      var target = event.currentTarget;
      var dragX = event.clientX;
      var dragY = event.clientY;
      var distanceX = dragX - record.startX;
      var distanceY = dragY - record.startY;
      target.style.left = (record.left + distanceX) + 'px';
      target.style.top = (record.top + distanceY) + 'px';
      target.style.userSelect = 'none';
      target.style.zIndex = 99;
      target.style.opacity = 0.7;
      _this.dragDom = function () {
        return target;
      };
      event.stopPropagation();
      event.preventDefault();
    }
  };
  var handleEnd = function (event) {
    _this.allowDrag = false;
    var target = event.currentTarget;
    var parent = _this.findParent(target, 'drag-container');
    var extra = parent.getElementsByClassName('extra')[0];
    var children = parent.querySelectorAll('div.drag-item');
    var width = parent.offsetWidth;
    var height = parent.offsetHeight;
    var left = parseFloat(target.style.left);
    var top = parseFloat(target.style.top);
    var leftRate = left / width;
    var topRate = top / height;
    var column;
    var index;
    if (leftRate < 0.2) {
      column = 0;
    } else if (leftRate > 0.2 && leftRate < 0.5) {
      column = 1;
    } else if (leftRate > 0.5) {
      column = 2;
    }
    if (topRate < 0.45) {
      index = column + 0;
    } else if (topRate > 0.45) {
      index = column + 3;
    }
    if (target.getAttribute('class') === 'drag-item') {
      var _startIndex = _this.getIndex(target);
      var _endIndex = index;
      _this.recordPosition(_startIndex, _endIndex);
      if (target.nextElementSibling.nextElementSibling === children[index + 1]) {
        parent.insertBefore(target, children[index + 2]);
      } else if (_startIndex > _endIndex) {
        parent.insertBefore(target, children[index]);
      } else if (_startIndex < _endIndex) {
        parent.insertBefore(target, children[index + 1]);
      }
      target.style.left = 'auto';
      target.style.top = 'auto';
      target.style.position = 'static';
      target.style.opacity = 1;
      parent.removeChild(extra);
    } else if (target.getAttribute('class') === 'drag') {
      var vdom = parent.querySelectorAll('div.drag')[0];
      if (children.length < 6) {
        var cloneTemplate = [];
        var targetIndex = index;
        var data = _this.context.list[_this._index];
        var template = _this.context.$refs.screen.template;
        var activeIndex = _this.context.$refs.screen.$children[0].activeIndex - 1;
        data.orders = targetIndex + 1;
        data.pageNo = activeIndex;
        var field = template[activeIndex].data;
        for (var i = 0, l = field.length; i < l; i++) {
          if (i > targetIndex - 1) {
            field[i].orders++;
          }
        }
        field.push(data);
        yufp.clone(template, cloneTemplate);
        _this.context.$refs.screen.handDropEnd(_this.orderTemplateData(cloneTemplate));
        _this.context.$refs.screen.template = _this.orderTemplateData(cloneTemplate);
        _this.newTemplate = _this.orderTemplateData(cloneTemplate);
        _this.context.$nextTick(function () {
          _this.domSet = document.getElementsByClassName('drag-item');
          for (var i = 0, l = _this.domSet.length; i < l; i++) {
            var element = _this.domSet[i];
            element.addEventListener('mousedown', handleStart);
          }
        });
      } else {
        _this.context.$confirm('此屏已满，是否进入下一屏?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: function (action) {
            if (action === 'confirm') {
              _this.context.$refs.screen.template.push({data: [], pageNo: activeIndex++});
              _this.context.$nextTick(function () {
                _this.context.$refs.screen.$children[0].activeIndex++;
              });
            } else {
              return false;
            }
          }
        });
      }
      parent.removeChild(vdom);
    }
    _this.context.$nextTick(function () {
      _this.resetEvent('mousedown');
    });
  };
  _this.resetEvent('mousedown');
};
Drag.prototype.resetEvent = function (eventType, handle) {
  handle = handle || this.handleStart;
  eventType = eventType || 'mousedown';
  var domSet = document.getElementsByClassName('drag-item');
  for (var i = 0, l = domSet.length; i < l; i++) {
    var element = domSet[i];
    if (element.getAttribute('class').indexOf('exist') < 0) {
      _on(element, eventType, handle);
    } else {
      _off(element, eventType, handle);
    }
  }
};
// 通过class属性查找父元素
Drag.prototype.getOffSetLeft = function (dom) {
  var offLeft = 0;
  while (dom.nodeName !== 'BODY') {
    dom = dom.offsetParent;
    offLeft += dom.offsetLeft;
  }
  return offLeft;
};
// 通过class属性查找父元素
Drag.prototype.getOffSetTop = function (dom) {
  var offTop = 0;
  while (dom.nodeName !== 'BODY') {
    dom = dom.offsetParent;
    offTop += dom.offsetTop;
  }
  return offTop;
};
// 通过class属性查找父元素
Drag.prototype.findParent = function (dom, attr) {
  var attrs = dom.getAttribute('class');
  while (!attrs || attrs.indexOf(attr) < 0) {
    dom = dom.parentNode;
    attrs = dom.getAttribute('class');
  }
  return dom;
};
// 获取dom元素索引，提供插入元素，删除元素时使用
Drag.prototype.getIndex = function (dom) {
  var parent = dom.parentNode;
  var children = parent.children;
  for (var i = 0, l = children.length; i < l; i++) {
    var element = children[i];
    if (dom === element) {
      return i;
    }
  }
};
// 创建空元素占据拖动元素的位置
Drag.prototype.creatDom = function (dom) {
  var nodeName = dom.nodeName;
  var index = this.getIndex(dom);
  var attr = dom.getAttribute('class');
  var vdom = document.createElement(nodeName);
  vdom.setAttribute('class', attr + ' extra');
  var width = this.getStyle(dom, 'width');
  var height = this.getStyle(dom, 'height');
  vdom.style.width = width;
  vdom.style.height = height;
  // vdom.setAttribute('draggable', true);
  var parent = this.findParent(dom, 'drag-container');
  var children = parent.children;
  if (parent.lastChild === dom) {
    parent.appendChild(vdom);
  } else {
    parent.insertBefore(vdom, children[index + 1]);
  }
};
// 获取元素特定样式方法
Drag.prototype.getStyle = function (dom, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(dom, null)[attr];
  }
  return dom.currentStyle[attr];
};
// 记录位置信息
Drag.prototype.recordPosition = function (start, end) {
  var cloneTemplate = [];
  var template = this.newTemplate;
  var activeIndex = this.context.$refs.screen.$children[0].activeIndex - 1;
  var data = template[activeIndex].data;
  if (start < end) {
    if (start + 1 === end) {
      var startIndex = data[start].orders;
      var endIndex = data[end].orders;
      data[start].orders = endIndex;
      data[end].orders = startIndex;
    } else {
      data[start].orders = data[end - 1].orders;
      for (var i = 0, l = data.length; i < l; i++) {
        if (i > start && i < end) {
          data[i].orders--;
        }
      }
    }
  } else {
    data[start].orders = data[end].orders;
    for (var i = 0, l = data.length; i < l; i++) {
      if (i > end - 1 && i < start) {
        data[i].orders++;
      }
    }
  }
  yufp.clone(template, cloneTemplate);
  cloneTemplate = this.orderTemplateData(cloneTemplate);
  this.context.$refs.screen.handDropEnd(cloneTemplate);
  yufp.clone(cloneTemplate, this.newTemplate);
};

// 对模版数据进行排序
Drag.prototype.orderTemplateData = function (template) {
  template.sort(this.compare('pageNo'));
  for (var i = 0, l = template.length; i < l; i++) {
    template[i].data.sort(this.compare('orders'));
  }
  return template;
};
// 用于数组排序的方法
Drag.prototype.compare = function (prop) {
  return function (obj1, obj2) {
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  };
};