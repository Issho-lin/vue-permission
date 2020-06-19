import store from '@/store'
const permission = {
    inserted(el, binding) {
        const { value: pRoles } = binding
        const roles = store.getters && store.getters.roles

        if (Array.isArray(pRoles) && pRoles.length > 0) {
            // 指定的角色跟账号的角色相交就认为有该权限
            const hasPermission = roles.some(role => pRoles.includes(role))
            if  (!hasPermission) {
                el.parentNode &&  el.parentNode.removeChild(el)
            }
        } else {
            throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin','editor']"`)
        }
    }
}

export default permission