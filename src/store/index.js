import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import permission from './permission'

Vue.use(Vuex)

const getters = {
    roles: state => state.user.roles,
    hasRoles: state => state.user.roles && state.user.roles.length > 0
}

export default new Vuex.Store({
    getters,
    modules: { user, permission }
})