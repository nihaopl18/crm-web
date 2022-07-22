"use strict";

exports.__esModule = true;
exports.scrollTop = scrollTop;
exports.findComponentsDownward = findComponentsDownward;
// scrollTop animation
function scrollTop(el) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var to = arguments[2];
  var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 500;
  var endCallback = arguments[4];

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }
  var difference = Math.abs(from - to);
  var step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    var d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(function () {
      return scroll(d, end, step);
    });
  }
  scroll(from, to, step);
}

// Find components downward
function findComponentsDownward(context, componentName) {
  var ignoreComponentNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (!Array.isArray(ignoreComponentNames)) {
    ignoreComponentNames = [ignoreComponentNames];
  }
  return context.$children.reduce(function (components, child) {
    if (child.$options.name === componentName) components.push(child);
    if (ignoreComponentNames.indexOf(child.$options.name) < 0) {
      var foundChilds = findComponentsDownward(child, componentName);
      return components.concat(foundChilds);
    } else {
      return components;
    }
  }, []);
}

var sharpMatcherRegx = exports.sharpMatcherRegx = /#([^#]+)$/;