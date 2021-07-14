import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * @param menus
 * @returns {[]}
 */
function generateMenu(menus) {
  const routes = []

  menus.forEach(row => {
    const route = {
      path: row.path,
      name: row.path + '_' + row.id,
      component: row.component === 'Layout' ? Layout : resolve => require([`@/views/${row.component}`], resolve),
      meta: { title: row.title, icon: row.icon }
    }

    if (row.hidden && row.hidden === 1) {
      route.hidden = true
    }

    if (row.children && row.children.length > 0) {
      route.children = generateMenu(row.children)
    }

    routes.push(route)
  })

  return routes
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menu) {
    return new Promise(resolve => {
      // 后端动态获取菜单（同时追加前端固定动态路由）
      const accessedRoutes = generateMenu(menu).concat(asyncRoutes)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
