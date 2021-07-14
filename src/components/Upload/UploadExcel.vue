<template>
  <!-- 基于element-upload再封装上传文件组件 -->
  <el-dialog class="upload-container" :visible.sync="currentVisible" :title="$t('table.import')">
    <el-form ref="form" class="form" :model="form" label-width="120px">
      <el-form-item :label="$t('upload.file.uploadFile')">
        <el-upload
          ref="upload-excel"
          action=""
          :auto-upload="false"
          :limit="limit"
          :file-list="fileList"
          :on-exceed="onExceed"
          :before-upload="beforeUpload"
          :http-request="customUpload"
        >
          <el-button slot="trigger" size="small" type="primary">{{ $t('upload.file.selectFile') }}</el-button>

          <div slot="tip" class="el-upload__tip">{{ tip }}
            <span v-if="showTemplate">
              <br>{{ $t('upload.excel.templateDownload') }}
              <el-link type="primary" @click="templateDownload">{{ templateName }}.xlsx</el-link>
            </span>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="currentVisible = false">{{ $t('common.cancel') }}</el-button>
      <el-button :loading="loading" type="primary" @click="submitUpload">{{ $t('common.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UploadExcel',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    // 导入方法
    method: {
      type: Function,
      required: true
    },
    // 导入文件
    files: {
      type: Array,
      default: () => []
    },
    // 文件个数限制
    limit: {
      type: Number,
      default: 1
    },
    // 单文件大小限制（Mb）
    sizeLimit: {
      type: Number,
      default: 20
    },
    // 下载导入模板文件方法
    templateDownloadMethod: {
      type: Function,
      default: null
    },
    // 导入模板文件名称
    templateName: {
      type: String,
      default: 'template'
    }
  },
  data() {
    return {
      loading: false,
      form: {}
    }
  },
  computed: {
    currentVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    fileList: {
      get() {
        return this.files
      },
      set(val) {
        this.$emit('update:files', val)
      }
    },
    tip() {
      return this.$i18n.t('upload.excel.tip') + this.sizeLimit + 'Mb. '
    },
    showTemplate() {
      return this.templateDownloadMethod !== null
    }
  },
  methods: {
    // 文件超出个数限制时的钩子
    onExceed() {
      this.$message.error(this.$i18n.t('upload.file.tips.exceedSingleFile'))
    },
    // 上传方法
    submitUpload() {
      this.$refs['upload-excel'].submit()
    },
    // 上传校验
    beforeUpload(file) {
      const isExcel = (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      if (!isExcel) {
        this.$message.error(this.$i18n.t('upload.excel.formatError'))
      }
      const isLtLimit = file.size / 1024 / 1024 < this.sizeLimit
      if (!isLtLimit) {
        this.$message.error(this.$i18n.t('upload.excel.sizeError') + this.sizeLimit + 'Mb!')
      }
      return isExcel && isLtLimit
    },
    // 上传
    customUpload(file) {
      // 封装FormData对象
      const fileData = new FormData()
      fileData.append('file', file.file)

      this.loading = true
      this.method(fileData).then(response => {
        this.$message({
          message: this.$i18n.t('upload.common.success'),
          type: 'success'
        })

        // 上传成功回调方法
        this.$emit('success')
        // 关闭弹窗
        this.currentVisible = false
      }).finally(() => {
        this.loading = false
        // 清空上传文件
        this.$refs['upload-excel'].clearFiles()
      })
    },
    // 导入模板下载
    templateDownload() {
      this.templateDownloadMethod().then(response => {
        const downloadElement = document.createElement('a')
        // 创建下载链接
        const _URL = window.URL || window.webkitURL
        const href = _URL.createObjectURL(response.data)
        downloadElement.href = href
        // 生成下载文件名
        downloadElement.download = this.templateName + '.xlsx'

        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        _URL.revokeObjectURL(href)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.upload-container {
  .el-upload {
    text-align: left;
  }
}
</style>
