<template>
  <div class="select-container">
    <el-select v-model="currentValue" :placeholder="placeholder" :style="styleObj">
      <el-option
        v-for="(value, key) in options"
        :key="key"
        :label="value"
        :value="parseInt(key)"
      />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'NumberStringSelect',
  props: {
    model: {
      required: true,
      type: [String, Number]
    },
    options: {
      required: true,
      type: Object
    },
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      styleObj: {}
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.model
      },
      set(val) {
        this.$emit('update:model', val)
      }
    }
  },
  created() {
    this.styleObj = { width: this.width !== '' ? this.width : '100%' }
  }
}
</script>

<style scoped>
.select-container {
  display: inline-block;
}
</style>
