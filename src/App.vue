<template>
  <div>
    <TheNavbar />
    
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "@/components/navbar/TheNavbar"

export default {
  name: "App",
  components: {
    TheNavbar,
  },
  // beforeDestroy() {
  //   if(!localStorage.getItem("rememberUser")) {
  //     localStorage.removeItem("user")
  //   }
  // }
}
</script>
