<template>
    <div>
        <h2>用户登录</h2>
        <div>
            <input type="text" v-model="username">
            <button @click="login">登录</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: ''
        }
    },
    methods: {
        login() {
            console.log(this.$store);
            this.$store.dispatch('user/login', { username: this.username }).then(() => {
                this.$router.push({
                    path: this.$route.query.redirect || '/'
                })
            }).catch(err => {
                console.log(err)
            })
        }
    },
}
</script>