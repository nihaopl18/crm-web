/**
 * 树节点编辑按钮 tree-edit-btn
 * @description 阻止btn点击冒泡
 * @author lixt1
 * @date    2019-02-28 13:40:41
 * @version $1.0$
 */
(function (vue, $, name) {
  // 树节点编辑按钮
  vue.component(name, {
    template: '<el-button :type="type" :icon="icon" @click.stop="btnClick"></el-button>',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      icon: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
      };
    },
    methods: {
      btnClick: function () {
        this.$emit('btnClick');
      }
    }
  });
}(Vue, yufp.$, 'tree-edit-btn'));