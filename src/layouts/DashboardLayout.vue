<template>
  <b-container
    ref="dashboard-layout"
    fluid
    class="dashboard-layout bg-light"
    :class="windowWidth >= 992 ? '' : 'dashboard-layout--sidebar-hidden'"
  >
    <!-- <b-button v-b-toggle.dashboard-sidebar>Toggle Sidebar</b-button> -->
    <TheSidebar
      :visible="windowWidth >= 992"
      @change="sidebarChange"
    />
    <div class="m-3 p-3 rounded shadow bg-white">
      <router-view></router-view>
    </div>
  </b-container>
</template>

<script>
import TheSidebar from "@/components/TheSidebar";

export default {
  name: "DashboardLayout",
  components: {
    TheSidebar,
  },
  data() {
    return {
      layoutClass: "",
    };
  },
  computed: {
    windowWidth() {
      return window.innerWidth;
    },
  },
  methods: {
    // Toggles layout class on sidebar change
    sidebarChange() {
      this.$refs["dashboard-layout"].classList.toggle(
        "dashboard-layout--sidebar-hidden"
      );
    },
  },
};
</script>
