<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="dark"
    class="py-3"
  >
    <b-container>
      <b-navbar-brand to="/">Energy <i class="fas fa-bolt"></i> Watch</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ms-auto">

          <TheLocaleChanger />

          <b-nav-item-dropdown right>
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import TheLocaleChanger from "@/components/TheLocaleChanger"

export default {
  name: "Navbar",
  components: {
    TheLocaleChanger,
  },

};
</script>
