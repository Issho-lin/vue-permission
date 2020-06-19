import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

// 通用页面：不需要守卫，可直接访问
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

// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
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
                    // 先请求获取用户信息
                    const { roles } = await store.dispatch('user/getInfo')
                     // 根据当前用户角色过滤出可访问路由
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    // 添加至路由表
                    router.addRoutes(accessRoutes)

                    // 继续切换路由，再次进入守卫，确保addRoutes完成
                    next({ ...to, replace: true })

                } catch (err) {
                    // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                    console.log(err)
                }
            }
        }
    } else {
        // 未登录
        if (whiteList.includes(to.path)) {
            // 白名单中路由直接放行
            next()
        } else {
            // 重定向至登录页
            next(`/login?redirect=${to.path}`)
        }
    }
})

export default router