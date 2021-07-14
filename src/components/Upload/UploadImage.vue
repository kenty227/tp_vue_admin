<template>
  <!-- 基于element-upload再封装上传图片组件 -->
  <div class="upload-container">
    <el-upload
      action=""
      class="uploader"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="(file) => customUpload(file)"
    >
      <!-- 进度条 -->
      <div v-if="uploading === true" :style="{ 'width': width }">
        <el-progress
          :text-inside="true"
          :stroke-width="26"
          :percentage="uploadPercent"
          status="success"
        />
      </div>
      <!-- 上传框 -->
      <div v-else>
        <img v-if="currentValue" :src="currentValue" :style="imageStyleObj" class="image" alt="">
        <i v-else :style="iconStyleObj" class="el-icon-plus uploader-icon" />
      </div>
      <div slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
  </div>
</template>

<script>
import { uploadWithProgress } from '@/api/upload'

export default {
  name: 'UploadImage',
  props: {
    image: {
      type: String,
      required: true,
      default: ''
    },
    // 大小限制（Mb）
    sizeLimit: {
      type: Number,
      default: 5
    },
    // 最佳尺寸（x * y）
    recommendSize: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '150px'
    }
  },
  data() {
    return {
      uploading: false,
      uploadPercent: 0,
      imageStyleObj: {
        width: this.width,
        height: this.height,
        'max-width': '100%'
      },
      iconStyleObj: {
        width: this.width,
        height: this.height,
        'line-height': this.height,
        'max-width': '100%'
      }
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.image
      },
      set(val) {
        this.$emit('update:image', val)
      }
    },
    tip() {
      let tip = this.$i18n.t('upload.image.tip') + this.sizeLimit + 'Mb. '
      if (this.recommendSize !== '') {
        tip += this.$i18n.t('upload.image.recommendSize') + ': ' + this.recommendSize
      }
      return tip
    }
  },
  methods: {
    // 上传校验
    beforeUpload(file) {
      const isImg = file.type.includes('image')
      if (!isImg) {
        this.$message.error(this.$i18n.t('upload.image.formatError'))
      }

      const isLtLimit = file.size / 1024 / 1024 < this.sizeLimit
      if (!isLtLimit) {
        this.$message.error(this.$i18n.t('upload.image.sizeError') + this.sizeLimit + 'Mb!')
      }

      return isImg && isLtLimit
    },
    // 上传
    customUpload(file) {
      // 封装FormData对象
      const fileData = new FormData()
      fileData.append('file', file.file)

      // 进度条
      const uploadProgressEvent = progressEvent => {
        this.uploadPercent = Math.floor((progressEvent.loaded * 100) / progressEvent.total)
      }

      this.uploading = true
      uploadWithProgress(fileData, uploadProgressEvent, { dir: 'common' }).then(response => {
        // 更新父组件属性值
        this.currentValue = response.data[0].url
      }).finally(() => {
        this.uploading = false
        this.uploadPercent = 0
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .uploader {
    ::v-deep .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: auto;
    }

    .el-upload:hover {
      border-color: #409EFF;
    }

    .uploader-icon {
      font-size: 28px;
      color: #8c939d;
      text-align: center;
    }

    .image {
      display: block;
    }
  }
}
</style>
