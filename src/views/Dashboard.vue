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
    this.$bvToast.toast('Toast body content', {
            title: `Welcome`,
            // variant: variant,
            solid: true
          })
  },
  methods: {
    ...mapActions(["fetchFacilities"])
  }
}
</script>

<style>

</style>
