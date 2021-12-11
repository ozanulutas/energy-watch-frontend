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

          <LocaleChanger />

          <UserMenu />
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import LocaleChanger from "@/components/navbar/LocaleChanger";
import UserMenu from "@/components/navbar/UserMenu";

export default {
  name: "Navbar",
  components: {
    LocaleChanger,
    UserMenu,
  },
};
</script>
