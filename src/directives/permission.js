import store from '@/store'
const permission = {
    inserted(el, binding) {
        // 获取指令的值：按钮要求的角色数组
        const { value: pRoles } = binding
        // 获取用户角色
        const roles = store.getters && store.getters.roles

        if (Array.isArray(pRoles) && pRoles.length > 0) {
            // 判断用户角色中是否有按钮要求的角色，指定的角色跟账号的角色相交就认为有该权限
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