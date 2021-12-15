<template>
  <b-nav-item-dropdown right>
    <template #button-content>
      <i class="fas fa-user-circle"></i>
      {{ `${user.id ? user.name : $t('navbar.dropdown.user')}` }}
    </template>
    <div v-if="!user.id">
      <b-dropdown-item v-b-modal.login-modal>{{ $t('navbar.link.logIn') }}</b-dropdown-item>
      <b-dropdown-item v-b-modal.register-modal>{{ $t('navbar.link.register') }}</b-dropdown-item>
    </div>
    <div v-if="user.id">
      <b-dropdown-item to="/facilities">{{ $t('navbar.link.dashboard') }}</b-dropdown-item>
      <b-dropdown-item to="/user-settings">{{ $t('navbar.link.profile') }}</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item @click.stop="logout">{{ $t('navbar.link.logOut') }}</b-dropdown-item>
    </div>
  </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserMenu",
  computed: {
    ...mapGetters("user", { user: "getUser" }),
  },
  methods: {
    ...mapActions("user", ["logout"]),
  },
};
</script>
