<script setup>
    import { ref } from 'vue';

    const name = ref('Wildan');

</script>

<template>
    <header>
        <h1 class="header">Hello Vue</h1>
        <p>My name is : {{name}}</p>
    
    </header>

</template>

<style scoped>
    .header {
        background: #cf45;
        padding: 10px 10px;
        text-align: center;
        border-radius: 8px;
    }


</style>