import { once, on, off} from '@/src/utils/dom';

export default {
  bind(el, binding, vnode) {
    let interval = null;
    let startTime;
    const handler = () => vnode.context[binding.expression].apply();
    const clear = () => {
      if (Date.now() - startTime < 100) {
        handler();
      }
      clearInterval(interval);
      interval = null;
    };
    el.unbindEventListener = () => {
      off(el, 'mousedown', clear);
    };
    on(el, 'mousedown', (e) => {
      if (e.button !== 0) return;
      startTime = Date.now();
      once(document, 'mouseup', clear);
      clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  },
  unbind(el) {
    if (el.unbindEventListener) {
      el.unbindEventListener();
    }
  }
};
