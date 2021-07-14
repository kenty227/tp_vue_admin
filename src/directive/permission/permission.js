import store from '@/store'

function checkPermission(el, binding) {
  // const roles = store.getters && store.getters.roles
  // if (roles.includes('admin')) {
  //   return true
  // }

  const { value } = binding
  if (value) {
    if (value.length > 0) {
      const permission = store.getters && store.getters.permission

      const hasPermission = !!permission.includes(value)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="'permission-example'"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
