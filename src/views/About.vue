<template>
    <div>
        About
        <button v-permission="['admin', 'editor']">editor button</button>
        <button v-permission="['admin']">admin button</button>
    </div>
</template>
<script>
export default {
    
}
</script>