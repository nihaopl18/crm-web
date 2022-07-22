/**
 * 标签列表yufp-tag-list
 * @disabled 是否禁用输入框
 * @authors yangding
 * @date    2021/09/03
 */
(function (vue, $, name) {
  // 注册机构树组件
  vue.component(name, {
    template: '<div style="line-height: 22px;display: flex;flex-wrap: wrap;">\
                  <p class="cust-tag-no" :style="getStyle()" v-for="item in tags" :key="item.value" \
                    @click="chooseTag(event,item)">{{ item.value }} </p>\
             </div>',
    props: {
      // // 输入框属性
      // disabled: Boolean,
      // size: String,
      // rawValue: String,
      // value: {
      //   required: true
      // },
      // params: Object,
      // readonly: {
      //   type: Boolean,
      //   default: true
      // }
    },
    data: function () {
      return {
        tags: yufp.lookup.find('CUSTOMER_TAG_LIST')
      };
    },
    methods: {
      getStyle: function () {
        return ' height: 22px;border-radius: 10px; color: #606266; text-align: center;background: #f0f2f5;border: 1px solid #dddfe6;        padding: 0 8px;margin-right: 8px;margin-top: 8px;cursor: pointer;';
      },
      // 选择点击标签项
      chooseTag: function (e, tagItem) {
        this.$set(tagItem, 'isCheck', !tagItem.isCheck);
        this.$emit('tag-change', this.tags);
        if (tagItem.isCheck) {
          e.target.style.backgroundColor = '#ffe3e1';
          e.target.style.border = '1px solid #e77f87';
          e.target.style.color = '#e6392e';
          return;
        }
        e.target.style.backgroundColor = '#f0f2f5';
        e.target.style.border = '1px solid #dddfe6';
        e.target.style.color = '#606266';
      },

      clearTag: function () {
        for (var i = 0; i < this.tags.length; i++) {
          this.$delete(this.tags[i], 'isCheck');
        }
        var pNode = document.getElementsByClassName('cust-tag-no');
        for (var i = 0; i < pNode.length; i++) {
          pNode[i].style.backgroundColor = '#f0f2f5';
          pNode[i].style.border = '1px solid #dddfe6';
          pNode[i].style.color = '#606266';
        }
      }
    }
  });
}(Vue, yufp.$, 'yufp-tag-list'));