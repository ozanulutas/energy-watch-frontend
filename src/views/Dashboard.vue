<template>
  <div>
    <h1>Dashboard</h1>
    <b-table striped hover :items="facilities"></b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  name: "Dashboard",
  created() {
    this.fetchFacilities()
  },
  computed: {
    ...mapState("facility", ["facilities"])
  },
  methods: {
    ...mapActions("facility", ["fetchFacilities"])
  }
}
</script>

<style>

</style>
