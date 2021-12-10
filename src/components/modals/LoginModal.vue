<template>
  <b-modal
    id="login-modal"
    :title="$t('modal.logIn.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit">
      <!-- Email -->
      <b-form-group
        label="Email address:"
        class="mb-3"
      >
        <b-form-input
          v-model="user.email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <!-- Password -->
      <b-form-group
        label="Password:"
        class="mb-3"
      >
        <b-form-input
          v-model="user.password"
          type="password"
          placeholder="Enter passsword"
        ></b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
      >Login</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "LoginModal",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),

    handleSubmit() {
      this.login(this.user)
    },
  },
};
</script>
