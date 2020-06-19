import { constRoutes, asyncRoutes } from '@/router'

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    setRoutes: (state, routes) => {
        state.addRoutes = routes
        state.routes = constRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            const accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
            commit('setRoutes', accessRoutes)
            resolve(accessRoutes)
        })
    }
}

export function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}