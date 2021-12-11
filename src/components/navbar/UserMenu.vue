<template>
  <b-nav-item-dropdown right>
    <template #button-content>
      {{ `${isLoggedIn ? user.name : $t('navbar.dropdown.user')}` }}
    </template>
    <div v-if="!isLoggedIn">
      <b-dropdown-item v-b-modal.login-modal>{{ $t('navbar.link.logIn') }}</b-dropdown-item>
      <b-dropdown-item v-b-modal.register-modal>{{ $t('navbar.link.register') }}</b-dropdown-item>
    </div>
    <div v-if="isLoggedIn">
      <b-dropdown-item to="#">{{ $t('navbar.link.profile') }}</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item @click.stop="logout">{{ $t('navbar.link.logOut') }}</b-dropdown-item>
    </div>
  </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserMenu",
  data() {
    return {
      user: null,
    }
  },
  computed: {
    ...mapGetters(["getUser"]),

    isLoggedIn() {
      const user = this.getUser
      return user && user.id;
    },
  },
  watch: {
    // If user is logged in set the local state with user data
    isLoggedIn(isLoggedIn) {
      if(isLoggedIn) {
        this.user = this.getUser
      }
    }
  },
  methods: {
    ...mapActions(["logout"]),
    
  }
};
</script>
