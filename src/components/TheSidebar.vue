<template>
  <b-sidebar
    id="dashboard-sidebar"
    sidebar-class="dashboard-layout__sidebar"
    title=""
    :visible="visible"
    bg-variant="light"
    text-variant="dark"
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
        exact-active-class="text-primary"
        class="bg-transparent"
      ><i class="fas fa-industry"></i> {{ $tc("facility.pageTitle", 2) }}</b-list-group-item>
      <b-list-group-item
        exact-active-class="text-primary"
        to="/consumptions"
        class="bg-transparent"
      ><i class="fas fa-bolt"></i> {{ $tc("consumption.pageTitle", 1) }}</b-list-group-item>
      <b-list-group-item
        to="/user-settings"
        exact-active-class="text-primary"
        class="bg-transparent"
      ><i class="fas fa-user-cog"></i> {{ $tc("userSettings.pageTitle", 2) }}</b-list-group-item>
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
