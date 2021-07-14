import store from '@/store'

/**
 * @param id
 * @returns {boolean}
 */
export default function checkPermission(id) {
  // const roles = store.getters && store.getters.roles
  // if (roles.includes('admin')) {
  //   return true
  // }

  if (id && id.length > 0) {
    const permission = store.getters && store.getters.permission

    return !!permission.includes(id)
  } else {
    console.error(`need id! Like v-permission="'permission-button-example']"`)
    return false
  }
}
