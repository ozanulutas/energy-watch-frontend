<template>
  <b-sidebar
    id="dashboard-sidebar"
    sidebar-class="dashboard-layout__sidebar"
    title="Sidebar"
    :visible="visible"
    bg-variant="dark"
    text-variant="light"
    shadow
    no-header-close
    no-close-on-esc
    no-close-on-route-change
    @change="($e) => $emit('change', $e)"
  >
    <b-list-group
      class="px-4"
      flush
    >

      <b-list-group-item
        to="/facilities"
        class="bg-transparent text-light"
      ><i class="fas fa-industry"></i> Facilities</b-list-group-item>
      <b-list-group-item
        to="/consumptions"
        class="bg-transparent text-light"
      ><i class="fas fa-bolt"></i> Consumptions</b-list-group-item>
      <b-list-group-item
        to="/user-settings"
        class="bg-transparent text-light"
      ><i class="fas fa-user-cog"></i> User Settings</b-list-group-item>
    </b-list-group>
  </b-sidebar>
</template>

<script>
export default {
  name: "TheSidebar",
  props: {
    visible: Boolean,
  },
};
</script>
