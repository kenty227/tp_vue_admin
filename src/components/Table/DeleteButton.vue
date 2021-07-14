<template>
  <el-button
    :size="size"
    :loading="loading"
    type="danger"
    @click="handleDelete"
  >
    {{ $t('table.delete') }}
  </el-button>
</template>

<script>
export default {
  name: 'DeleteButton',
  props: {
    id: {
      required: true,
      type: [Number, Array]
    },
    // 删除数据方法
    method: {
      required: true,
      type: Function
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    handleDelete() {
      if (Array.isArray(this.id) && this.id.length === 0) {
        this.$message({
          message: this.$i18n.t('table.batchTip'),
          type: 'warning'
        })
        return
      }

      this.$confirm(this.$i18n.t('table.deleteConfirm'), this.$i18n.t('common.hint'), {
        confirmButtonText: this.$i18n.t('common.confirm'),
        cancelButtonText: this.$i18n.t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.loading = true
        // 调用删除数据方法
        this.method({ id: this.id }).then(() => {
          this.$message({
            message: this.$i18n.t('table.deleteSuccess'),
            type: 'success'
          })

          // 删除成功回调方法
          this.$emit('callback')
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>
