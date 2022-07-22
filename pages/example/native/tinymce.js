/* 
* Created by zhangkun on 2017/12/06
*/
yufp.require.require("libs/tinymce/tinymce.min.js");
define([
	'./custom/widgets/js/ElTinymceX.js'
	],
		function(require, exports) {
    //page加载完成后调用ready方法
    exports.ready = function(hashCode, data, cite){
        //创建virtual model
        var vm = yufp.custom.vue({
          el: "#template_tinymce",
          //以m_开头的属性为ui数据不作为业务数据,否则为业务数据
          data: function() {
            return {
              id: 'Tinymce',
              busNo: '01',
              height: 160,
              content: 'Tinymce',
              action: '/api/file/provider/uploadfile'
            }
          },
          methods: {
            saveFn: function(){
              var content  = this.content
              this.$refs.tinymce.disabled = false;
              this.$alert(content, '富文本信息:',  {
                confirmButtonText: '确定'
              })
            },
            setFn: function(){
              // window.tinymce.get('Tinymce').getBody().setAttribute('contenteditable', false);  
              this.$refs.tinymce.disabled = true;
              this.$refs.tinymce.hasChange = false
              this.content = '<p>123456789</p>'
              this.$alert(this.content,  {
                confirmButtonText: '确定'
              })
            }
          },
        });
    }
});