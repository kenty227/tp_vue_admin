<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      class="pwd-form"
      auto-complete="off"
      label-position="right"
      label-width="200px"
      :rules="pwdRules"
    >
      <el-form-item prop="oldPassword" :label="$t('password.old')">
        <div class="form-item">
          <el-input
            v-model="form.oldPassword"
            type="password"
            name="oldPassword"
            auto-complete="new-password"
            :placeholder="$t('password.enterOld')"
          />
        </div>
      </el-form-item>
      <el-form-item prop="newPassword" :label="$t('password.new')">
        <div class="form-item">
          <el-input
            v-model="form.newPassword"
            type="password"
            name="newPassword"
            auto-complete="new-password"
            :placeholder="$t('password.enterNew')"
          />
        </div>
      </el-form-item>
      <el-form-item prop="repeatNewPassword" :label="$t('password.repeatNew')">
        <div class="form-item">
          <el-input
            v-model="form.repeatNewPassword"
            type="password"
            name="repeatNewPassword"
            auto-complete="new-password"
            :placeholder="$t('password.enterNewAgain')"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="onSubmit"
        >{{ $t('common.confirm') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updatePwd } from '@/api/login'

export default {
  name: 'Password',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$i18n.t('login.PwdCheckHint')))
      } else {
        if (this.form.repeatNewPassword.length >= 6) {
          this.$refs.form.validateField('repeatNewPassword')
        }
        callback()
      }
    }
    const validatePass1 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$i18n.t('login.PwdCheckHint')))
      } else {
        if (this.form.repeatNewPassword.length >= 6) {
          this.$refs.form.validateField('repeatNewPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(this.$i18n.t('login.PwdCheckHint')))
      } else if (value !== this.form.newPassword) {
        callback(new Error(this.$i18n.t('password.different')))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      pwdRules: {
        oldPassword: [
          { required: true, trigger: 'blur', validator: validatePass }
        ],
        newPassword: [
          { required: true, trigger: 'blur', validator: validatePass1 }
        ],
        repeatNewPassword: [
          { required: true, trigger: 'blur', validator: validatePass2 }
        ]
      },
      loading: false,
      timer: '',
      redirect: undefined
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          updatePwd(this.form)
            .then(response => {
              this.$message({
                message: response.msg,
                type: 'success'
              })

              this.timer = setTimeout(() => {
                if (this.redirect) {
                  this.$router.push({ path: this.redirect || '/' })
                } else {
                  this.$router.go(-1)
                }
              }, 1500)
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #000;
$light_gray: #000;
.app-container {
  position: fixed;
  height: 100%;
  width: 100%;

  .pwd-form {
    width: 600px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
  }

  .form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
