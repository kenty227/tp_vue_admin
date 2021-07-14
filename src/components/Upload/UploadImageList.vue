<template>
  <!-- 基于element-upload再封装上传图片墙组件 -->
  <div class="upload-container">
    <el-upload
      action=""
      class="slide-uploader"
      multiple
      list-type="picture-card"
      :file-list="currentValue"
      :before-upload="beforeUpload"
      :http-request="(file) => customUpload(file)"
      :on-remove="handleRemove"
    >
      <el-button size="small" type="primary">
        点击上传
      </el-button>
      <div slot="tip" class="el-upload__tip">{{ tip }}</div>
    </el-upload>
  </div>
</template>

<script>
import { common as commonUpload } from '@/api/upload'

export default {
  name: 'UploadImageList',
  props: {
    list: {
      type: Array,
      required: true
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
    }
  },
  data() {
    return {
      listObj: {}
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
      let tip = '可上传多张图片格式文件，图片大小限制：' + this.sizeLimit + 'Mb'
      if (this.recommendSize !== '') {
        tip += '，最佳尺寸为：' + this.recommendSize
      }
      return tip
    }
  },
  methods: {
    // 上传校验
    beforeUpload(file) {
      const isImg = file.type.includes('image')
      if (!isImg) {
        this.$message.error('上传图片格式错误!')
        return false
      }

      const isLtLimit = file.size / 1024 / 1024 < this.sizeLimit
      if (!isLtLimit) {
        this.$message.error('上传图片大小不能超过 ' + this.sizeLimit + 'MB!')
        return false
      }

      // 封装上传图片对象并添加到临时列表对象
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = {
            uid: file.uid,
            name: file.name,
            width: this.width,
            height: this.height
          }
        }
        resolve(true)
      })
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
        const obj = this.listObj[uid]
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .slide-uploader {
    margin-bottom: 20px;

    ::v-deep .el-upload--picture-card {
      width: 100%;
    }
  }
}
</style>
