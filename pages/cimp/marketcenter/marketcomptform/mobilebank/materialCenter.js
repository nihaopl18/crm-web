(function (vue, $, name) {
    vue.component(name, {
        template: `
            <div>\
            <div style="display: flex">\
                <yu-input v-model="fieldData.materialName" placeholder="素材名称" style="margin-right: 10px; width: 300px"></yu-input>\
                <yu-button type="primary" @click="searchFn">搜索</yu-button>\
                <yu-button @click="resetFn">重置</yu-button>\
            </div>
                <yu-row>\
                    <yu-col :span="6" v-for="index in items" :key="index.id" :offset="index > 0 ? 2 : 0">\
                        <yu-lazy>\
                            <div @click="handleSelect(index.id, index)">
                                <yu-card :class="['material', index.id === selectId? 'is-select' : '']" :body-style="{ padding: '0px' }">\
                                    <div class="material-image">\
                                        <img v-if="index.materialType == '1' || index.materialType == '4' || index.materialType == '6'"
                                            :src="index.imgThumbNail" class="material-image">\
                                        <img v-else-if="index.materialType == '4'"
                                            src="pages/context/materialmanager/materailManager/video_icon.png" class="material-image">\
                                        <img v-else-if="index.materialType == '5'"
                                            src="pages/context/materialmanager/materailManager/audio_icon.png" class="material-image">\
                                        <img v-else src="pages/context/materialmanager/materailManager/word_icon.png" class="material-image">\
                                    </div>\
                                    <span class="material-span">{{ index.materialName }}</span>\
                                </yu-card>\
                            </div>
                        </yu-lazy>\
                    </yu-col>\
                </yu-row>\
            </div>\
        `,
        props: {
            modelkey: String,
            modelkey1: String
        },

        data() {
            return {
                fieldData: {
                    applyDpt: '',
                    applyOrg: '',
                    materialName: '',
                    materialType: '',
                    applyPort: '',
                    applyField: '',
                    applySize: '',
                    naturalSize1: '',
                    naturalSize2: ''
                },
                items: [],
                selectId: ''
            }
        },
        methods: {
            resetSelectId: function () {
                this.selectId = '';
            },
            handleSelect: function (id, data) {
                this.selectId = id;
                var param = yufp.clone(data, {})
                if (param.materialType == '5') {
                    param.imgThumbNailId = 'pages/context/materialmanager/materailManager/audio_icon.png'
                }
                if (param.materialType == '2') {
                    param.imgThumbNailId = 'pages/context/materialmanager/materailManager/word_icon.png'
                }
                this.$emit('send-data', param)
            },
            /**
           * 刷新素材列表
           */
            remoteMaterial: function () {
                var _this = this;
                _this.fieldData.applyField = _this.modelkey;

                _this.fieldData.materialType = _this.modelkey1;

                _this.fieldData.applyOrg = yufp.session.org.id;
                _this.fieldData.applyDpt = yufp.session.dpt;
                if (_this.fieldData.naturalSize1 && _this.fieldData.naturalSize2) {
                    _this.fieldData.naturalSize = _this.fieldData.naturalSize1 + '*' + _this.fieldData.naturalSize2;
                } else {
                    _this.fieldData.naturalSize = ''
                }

                var param = {
                    condition: JSON.stringify(_this.fieldData)
                };
                _this.items.splice(0, _this.items.length);
                yufp.service.request({
                    method: 'GET',
                    url: '/api/material/query',
                    data: param,
                    callback: function (code, message, response) {
                        if (response.code == 0) {
                            _this.setItems(response, _this.items);
                        }
                    }
                });
            },
            /**
           * 搜索素材列表
           */
            searchFn: function () {
                var _this = this;
                _this.remoteMaterial();
            },
            /**
             * 重置素材列表
             */
            resetFn: function () {
                var _this = this;
                _this.fieldData.materialName = '';
                _this.remoteMaterial();
            },
            /**
             * 设置items
             * @param {*} response 
             * @param {*} items 
             */
            setItems: function (response, items) {
                var _this = this;
                var materialData = response.data;
                for (var i = 0; i < materialData.length; i++) {
                    // 图片背景展示缩略图
                    if (materialData[i].materialType == '1' || materialData[i].materialType == '4' || materialData[i].materialType == '6') {
                        materialData[i].imgThumbNail = _this.fileIdToURL(materialData[i].imgThumbNailId);
                        materialData[i].uploadFile = _this.fileIdToURL(materialData[i].uploadFileId);
                    }
                    items.push(materialData[i]);
                }
            },
            /**
   * 获取图片URL
   */
            fileIdToURL: function (fileId) {
                var url = yufp.settings.ssl ? 'https://' : 'http://';
                url += yufp.settings.url;
                url += backend.fileService;
                url += '/api/file/provider/download?fileId=' + fileId;
                return yufp.util.addTokenInfo(url);
                // return url;
            },
        }
    })
})(Vue, yufp.$, 'material-center')