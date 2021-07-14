<template>
  <div class="app-container">
    <el-form ref="form" v-loading="loading" :model="form" :rules="rules" label-width="80px">
      <el-form-item :label="$t('demo.type')" prop="type">
        <number-string-radio
          :model.sync="form.type"
          :options="typeOptions"
        />
      </el-form-item>
      <el-form-item :label="$t('demo.title')" prop="title">
        <el-input v-model="form.title" class="form-item" maxlength="255" show-word-limit />
      </el-form-item>
      <el-form-item :label="$t('demo.content')" prop="content">
        <tinymce v-model="form.content" :height="300" name="demo" />
      </el-form-item>
      <el-form-item :label="$t('demo.image')" prop="image">
        <upload-image :image.sync="form.image" :width="'300px'" :height="'300px'" />
      </el-form-item>

      <el-form-item>
        <el-button @click="$router.back(-1)">{{ $t('form.back') }}</el-button>
        <el-button type="primary" @click="onSubmit">{{ $t('form.save') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { typeOptions } from './options'
import { editDetail, edit, add } from '@/api/demo'
import Tinymce from '@/components/Tinymce'
import NumberStringRadio from '@/components/Form/NumberStringRadio'
import UploadImage from '@/components/Upload/UploadImage'

export default {
  name: 'FormPage',
  components: {
    Tinymce,
    NumberStringRadio,
    UploadImage
  },
  props: {
    pageType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      form: {
        id: 0,
        type: 1,
        title: '',
        content: ''
      },
      rules: {
        type: [{ required: true, trigger: 'blur' }],
        title: [{ required: true, trigger: 'blur' }],
        content: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  computed: {
    typeOptions() {
      return typeOptions()
    }
  },
  created() {
    // 判断新增/编辑页面
    if (this.pageType !== 0) {
      this.form.id = this.$route.params.id
      if (parseInt(this.form.id) > 0) {
        this.fetchData()
      }
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      editDetail({ id: this.form.id }).then(response => {
        this.form = response.data
      }).finally(() => {
        this.loading = false
      })
    },
    // 提交（添加/编辑）
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.save(this.form).then(response => {
            this.$message({
              message: this.$i18n.t('form.saveSuccess'),
              type: 'success'
            })

            setTimeout(() => {
              this.$router.back(-1)
            }, 500)
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    save(data) {
      if (this.pageType !== 0) {
        return edit(data)
      } else {
        return add(data)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .form-item {
    width: 500px;
  }
}
</style>
