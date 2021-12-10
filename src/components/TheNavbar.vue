<template>
  <b-navbar
    toggleable="sm"
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
          <b-nav-item to="/">{{ $t('navbar.link.home') }}</b-nav-item>
          <b-nav-item to="/dashboard">{{ $t('navbar.link.dashboard') }}</b-nav-item>
          <b-btn v-b-modal.login-modal>{{ $t('navbar.link.logIn') }}</b-btn>
          <b-btn v-b-modal.register-modal>{{ $t('navbar.link.register') }}</b-btn>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <TheLocaleChanger />

          <b-nav-item-dropdown right>
            <template #button-content>
              {{ $t('navbar.dropdown.user') }}
            </template>
            <b-dropdown-item to="#">{{ $t('navbar.link.profile') }}</b-dropdown-item>
            <b-dropdown-item v-b-modal.login-modal>{{ $t('navbar.link.logIn') }}</b-dropdown-item>
            <b-dropdown-item v-b-modal.register-modal>{{ $t('navbar.link.register') }}</b-dropdown-item>
            <b-dropdown-item to="#">{{ $t('navbar.link.logOut') }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import TheLocaleChanger from "@/components/TheLocaleChanger";

export default {
  name: "Navbar",
  components: {
    TheLocaleChanger,
  },
};
</script>
