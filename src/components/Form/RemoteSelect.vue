<template>
  <div class="select-container">
    <el-select
      v-model="currentValue"
      filterable
      remote
      :multiple="multiple"
      reserve-keyword
      :style="styleObj"
      :placeholder="placeholder"
      :remote-method="remoteMethod"
      :loading="loading"
      @focus="focusMethod"
    >
      <el-option
        v-for="(p, index) in list"
        :key="index"
        :label="p[labelField]"
        :value="p[valueField]"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'RemoteSelect',
  props: {
    model: {
      required: true,
      type: [String, Number]
    },
    // 获取列表数据方法
    method: {
      required: true,
      type: Function
    },
    // 获取列表数据方法额外参数
    params: {
      type: Object,
      default: () => {}
    },
    // 是否初始化列表数据
    init: {
      type: Boolean,
      default: true
    },
    labelField: {
      type: String,
      default: 'name'
    },
    valueField: {
      type: String,
      default: 'id'
    },
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 刷新下拉列表（监听值改变）
    refresh: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleObj: {},
      loading: false,
      list: []
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.model === 0 ? '' : this.model
      },
      set(val) {
        this.$emit('update:model', val)
      }
    }
  },
  watch: {
    refresh(val) {
      this.remoteMethod()
    }
  },
  created() {
    // console.log(this.params)
    // 初始化样式
    this.styleObj = { width: this.width !== '' ? this.width : '100%' }
    // 初始化列表数据
    if (this.init) {
      this.remoteMethod()
    }
  },
  methods: {
    // 获取列表数据
    async remoteMethod(keyword = '') {
      this.loading = true
      try {
        const filter = Object.assign({ keyword }, this.params)
        const response = await this.method({ filter })

        this.list = response.data
        // console.log('list', this.list)
      } catch (error) {
        console.log('remote select method error', error)
      } finally {
        this.loading = false
      }
    },
    async focusMethod() {
      // 获得焦点时如列表值为空则调用获取列表数据
      if (this.list.length === 0) {
        this.remoteMethod()
      }
    }
  }
}
</script>

<style scoped>
.select-container {
  display: inline-block;
}
</style>
