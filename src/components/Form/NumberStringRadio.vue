<template>
  <div class="radio-container">
    <el-radio-group v-model="currentValue">
      <el-radio
        v-for="(value, key) in options"
        :key="key"
        :label="parseInt(key)"
      >
        {{ value }}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'NumberStringRadio',
  props: {
    model: {
      required: true,
      type: [String, Number]
    },
    options: {
      required: true,
      type: Object
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
  }
}
</script>

<style scoped>
.radio-container {
  display: inline-block;
}
</style>
