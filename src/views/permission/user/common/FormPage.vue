<template>
  <div class="app-container">
    <el-form ref="form" v-loading="loading" :model="form" :rules="rules" label-width="120px">
      <el-form-item :label="$t('permission.user.account')" prop="username">
        <el-input v-model="form.username" auto-complete="off" class="form-item" />
      </el-form-item>
      <el-form-item :label="$t('permission.user.password')" prop="password">
        <el-input v-model="form.password" type="password" auto-complete="new-password" class="form-item" />
      </el-form-item>
      <el-form-item :label="$t('permission.user.name')" prop="name">
        <el-input v-model="form.name" class="form-item" />
      </el-form-item>
      <el-form-item :label="$t('permission.user.phone')" prop="phone">
        <el-input v-model="form.phone" class="form-item" />
      </el-form-item>
      <!--角色-->
      <el-form-item :label="$t('permission.user.role')" prop="role_id">
        <remote-select :model.sync="form.role_id" :method="searchRoleList" class="form-item" />
      </el-form-item>
      <el-form-item :label="$t('permission.user.is_lock')">
        <el-switch
          v-model="form.is_lock"
          :active-text="$t('permission.user.locked')"
          :inactive-text="$t('permission.user.unlocked')"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item :label="$t('permission.user.status')">
        <el-switch
          v-model="form.status"
          :active-text="$t('permission.user.onJob')"
          :inactive-text="$t('permission.user.offJob')"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ $t('form.save') }}</el-button>
        <el-button @click="$router.back(-1)">{{ $t('form.back') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userEditDetail, userEdit, userAdd, searchRoleList } from '@/api/permission'
import RemoteSelect from '@/components/Form/RemoteSelect'

export default {
  name: 'FormPage',
  components: {
    RemoteSelect
  },
  props: {
    pageType: {
      type: Number,
      default: 0
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (parseInt(this.pageType) === 0 && value.length < 6) { // 新增
        callback(new Error(this.$i18n.t('login.PwdCheckHint')))
      } else if (parseInt(this.pageType) > 0 && value.length > 0 && value.length < 6) { // 编辑
        callback(new Error(this.$i18n.t('login.PwdCheckHint')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        id: 0,
        username: '',
        password: '',
        name: '',
        phone: '',
        role_id: 0,
        is_lock: 0,
        status: 1
      },
      rules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        name: [{ required: true, trigger: 'blur' }],
        role_id: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  created() {
    // 判断新增/编辑页面
    if (this.pageType !== 0) {
      this.form.id = this.$route.params.id
      // 超管不能修改
      if (parseInt(this.form.id) === 1) {
        this.$message({ message: this.$i18n.t('form.OperationProhibited'), type: 'error' })
        this.$router.back(-1)
        return
      }

      if (parseInt(this.form.id) > 0) {
        this.fetchData()
      }
    }
  },
  methods: {
    searchRoleList,
    fetchData() {
      this.loading = true
      userEditDetail({ id: this.form.id }).then(response => {
        this.form = response.data
      }).finally(() => {
        this.loading = false
      })
    },
    // 提交（添加/编辑）
    onSubmit() {
      // 超管不能修改
      if (this.form.id === 1) {
        return this.$message({ message: this.$i18n.t('form.OperationProhibited'), type: 'error' })
      }

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
        return userEdit(data)
      } else {
        return userAdd(data)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-container {
  .form-item {
    width: 300px;
  }
}
</style>
