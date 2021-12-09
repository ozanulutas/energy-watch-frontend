<template>
  <b-container>
    <router-view></router-view>

    <LoginModal />
    <RegisterModal />
  </b-container>
</template>

<script>
import LoginModal from "@/components/modals/LoginModal.vue"
import RegisterModal from "@/components/modals/RegisterModal.vue"

export default {
  name: "PublicLayout",
  components: {
    LoginModal,
    RegisterModal,
  }
}
</script>
