<template>
  <!-- 基于element-upload再封装上传媒体文件组件 -->
  <div class="upload-media-list-container">
    <!-- 借用element的upload组件样式 -->
    <ul class="el-upload-list el-upload-list--picture-card">
      <!-- 使用vuedraggable实现拖拽排序 -->
      <vuedraggable v-model="currentValue" class="draggable-container" @change="handleSortChange">
        <li
          v-for="(file, index) in currentValue"
          :key="index"
          class="el-upload-list__item is-success"
        >
          <img
            v-if="file.type === 'image'"
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            alt=""
          >
          <video
            v-if="file.type === 'video'"
            class="el-upload-list__item-thumbnail"
            :src="file.url"
          />
          <span class="el-upload-list__item-actions">
            <!-- 预览 -->
            <span class="el-upload-list__item-preview" @click="handleMediaCardPreview(file)">
              <i class="el-icon-zoom-in" />
            </span>
            <!-- 删除 -->
            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete" />
            </span>
            <!-- 拖拽排序 -->
            <el-tooltip class="item" effect="light" :content="$t('upload.common.dragSortTip')" placement="top">
              <span class="el-upload-list__item-draggable">
                <i class="el-icon-rank" />
              </span>
            </el-tooltip>
          </span>
        </li>
      </vuedraggable>
    </ul>
    <el-upload
      drag
      action="#"
      class="uploader"
      :multiple="multiple"
      :file-list="currentValue"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="(file) => customUpload(file)"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text" style="margin-bottom: 2em">{{ $t('upload.common.uploadTip') }}</div>
      <!-- 上传提示 -->
      <div slot="tip" class="el-upload__tip" v-html="tip" />
    </el-upload>
    <!-- 预览弹窗 -->
    <el-dialog :visible.sync="dialog.visible" append-to-body>
      <div v-if="dialog.mediaType === 'image'" class="image-preview">
        <img :src="dialog.mediaUrl" alt="" width="100%">
      </div>
      <div v-if="dialog.mediaType === 'video'" class="video-preview">
        <video width="100%" controls="controls" :src="dialog.mediaUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { common as commonUpload } from '@/api/upload'
import vuedraggable from 'vuedraggable'

export default {
  name: 'UploadMediaList',
  components: {
    vuedraggable
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    // 允许上传媒体文件类型
    media: {
      type: Array,
      default: () => ['image', 'video']
    },
    // 大小限制（Mb）
    imageSizeLimit: {
      type: Number,
      default: 5
    },
    videoSizeLimit: {
      type: Number,
      default: 50
    },
    // 最佳尺寸（x * y）
    imageRecommendSize: {
      type: String,
      default: ''
    },
    videoRecommendSize: {
      type: String,
      default: ''
    },
    // el-upload: 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listObj: {},
      dialog: {
        visible: false,
        mediaType: '',
        mediaUrl: ''
      }
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.list
      },
      set(val) {
        this.$emit('update:list', val)
      }
    },
    tip() {
      let tip = ''
      // image
      if (this.checkMediaType('image')) {
        tip += this.$i18n.t('upload.image.sizeLimit') + this.imageSizeLimit + 'Mb. '
        if (this.imageRecommendSize !== '') {
          tip += this.$i18n.t('upload.image.recommendSize') + ': ' + this.imageRecommendSize
        }
      }

      if (tip !== '') tip += '<br>'
      // video
      if (this.checkMediaType('video')) {
        tip += this.$i18n.t('upload.video.sizeLimit') + this.videoSizeLimit + 'Mb. '
        if (this.videoRecommendSize !== '') {
          tip += this.$i18n.t('upload.video.recommendSize') + ': ' + this.videoRecommendSize
        }
      }

      return tip
    }
  },
  methods: {
    // 文件类型校验
    checkMediaType(type) {
      return this.media.indexOf(type) !== -1
    },
    // 上传校验
    beforeUpload(file) {
      let mediaType = ''
      if (this.checkMediaType('image') && file.type.includes('image')) {
        mediaType = 'image'
        if (file.size / 1024 / 1024 > this.imageSizeLimit) {
          this.$message.error(this.$i18n.t('upload.image.sizeError') + this.sizeLimit + 'Mb!')
          return false
        }
      } else if (this.checkMediaType('video') && file.type.includes('video')) {
        mediaType = 'video'
        if (file.size / 1024 / 1024 > this.videoSizeLimit) {
          this.$message.error(this.$i18n.t('upload.video.sizeError') + this.sizeLimit + 'Mb!')
          return false
        }
      } else {
        this.$message.error(this.$i18n.t('upload.file.formatError'))
        return false
      }

      // 封装上传文件对象并添加到临时列表对象
      this.listObj[file.uid] = {
        uid: file.uid,
        name: file.name,
        type: mediaType
      }
    },
    // 上传
    customUpload(file) {
      // 封装FormData对象
      const fileData = new FormData()
      fileData.append('file', file.file)

      commonUpload(fileData, { dir: 'common' }).then(response => {
        this.handleSuccess(response, file.file)
      })
    },
    handleSuccess(response, file) {
      const uid = file.uid
      if (uid in this.listObj) {
        // 获取beforeUpload封装文件对象
        const obj = this.listObj[uid]
        // 更新文件路径
        obj.url = response.data[0].url
        // 添加到文件列表（更新父组件属性值）
        this.currentValue.push(obj)
        // console.log('list', this.currentValue)
      }
    },
    handleRemove(file) {
      const list = this.currentValue.filter((v) => v.uid !== file.uid)
      // 更新父组件属性值
      this.$emit('update:list', list)
    },
    // 预览媒体文件
    handleMediaCardPreview(file) {
      this.dialog = {
        visible: true,
        mediaType: file.type,
        mediaUrl: file.url
      }
    },
    // 排序
    handleSortChange() {
      console.log(this.currentValue)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-media-list-container {
  .uploader {
    /* 覆盖element自带样式 */
    ::v-deep .el-upload--text {
      width: 100%;

      .el-upload-dragger {
        width: 100%;
        height: 100%;
      }
    }

    .el-upload__tip {
      line-height: 20px;
    }
  }

  .image-preview {
    text-align: center;
    max-width: 100%;
  }

  .video-preview {
    text-align: center;
    max-width: 100%;
  }
}
</style>
