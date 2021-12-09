<template>
  <div>
    <TheNavbar />
    <p>{{ $t('message') }}</p>

    <router-view />
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar"

export default {
  name: "App",
  components: {
    TheNavbar,
  }
}
</script>
