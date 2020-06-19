import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

export const constRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login')
    }, {
        path: '/',
        component: () => import('@/views/Home'),
        name: 'home',
        meta: {
            title: 'HOME'
        }
    }
]

export const asyncRoutes = [
    {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About'),
        meta: {
            roles: ['admin', 'editor']
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constRoutes
})

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    // 获取令牌判断是否已登录
    const hasToken = localStorage.getItem('token')
    if (hasToken) {
        // 如果已登录，就不需要再前往登录页了，直接打到首页
        if (to.path === '/login') {
            next('/')
        } else {
            // 前往其他页面，要验证角色权限
            // 是否已获取过角色信息？
            const hasRoles = store.getters.hasRoles
            console.log(hasRoles)
            if (hasRoles) {
                // 已获取角色信息，直接放行
                next()
            } else {
                try {
                    
                    const { roles } = await store.dispatch('user/getInfo')
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

                    router.addRoutes(accessRoutes)

                    // 继续切换路由，再次进入守卫，确保addRoutes完成
                    next({ ...to, replace: true })

                } catch (err) {
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                    console.log(err)
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

export default router