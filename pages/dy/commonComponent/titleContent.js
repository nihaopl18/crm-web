
(function (vue, name) {
  vue.component(name, {
    template: ' <div>\
    <link rel="stylesheet" type="text/css" href="./pages/dy/commonComponent/titleContent.css"/>\
    <div class="header">\
      <div class="front-box"></div>\
      <span class="title">{{ title }}</span>\
      <div style="flex: 1;text-align:right"><slot name="right"></slot>\</div>\
    </div>\
    <slot name="content"></slot>\
  </div>',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  });
}(Vue, 'title-content'));