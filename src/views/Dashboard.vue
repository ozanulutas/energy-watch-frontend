<template>
  <div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "Dashboard",
  created() {
    this.fetchFacilities()
  },
  methods: {
    ...mapActions(["fetchFacilities"])
  }
}
</script>

<style>

</style>
