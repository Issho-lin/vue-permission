import {login, getInfo} from '@/api/user';

const state = {
    token: localStorage.getItem('token'),
    roles: []
}

const mutations = {
    setToken: (state, token) => {
        state.token = token
    },
    setRoles: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    login({ commit }, userInfo) {
        return login(userInfo).then(res => {
            commit('setToken', res.data)
            localStorage.setItem('token', res.data)
        })
    },
    getInfo({ commit, state }) {
        return getInfo(state.token).then(({data: roles}) => {
            commit('setRoles', roles)
            return { roles }
        })
    },
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('setToken', ''),
            commit('setRoles', [])
            localStorage.removeItem('token')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}