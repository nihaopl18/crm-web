// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}

// Find components downward
export function findComponentsDownward(context, componentName, ignoreComponentNames = []) {
  if (!Array.isArray(ignoreComponentNames)) {
    ignoreComponentNames = [ignoreComponentNames];
  }
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    if (ignoreComponentNames.indexOf(child.$options.name) < 0) {
      const foundChilds = findComponentsDownward(child, componentName);
      return components.concat(foundChilds);
    } else {
      return components;
    }
  }, []);
}

export const sharpMatcherRegx = /#([^#]+)$/;