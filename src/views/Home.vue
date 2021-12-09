<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloI18n msg="Welcome to Your Vue.js App"/>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import HelloI18n from '@/components/HelloI18n.vue'

export default {
  name: 'Home',
  components: {
    HelloI18n,
    HelloWorld,
  }
}
</script>
