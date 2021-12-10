<template>
  <b-modal
    ref="login-modal"
    id="login-modal"
    :title="$t('modal.logIn.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit">
      <!-- Email -->
      <b-form-group
        :label="$t('modal.logIn.emailLabel')"
        class="mb-3"
      >
        <b-form-input v-model="user.email"></b-form-input>
      </b-form-group>
      <!-- Password -->
      <b-form-group
        :label="$t('modal.logIn.passwordLabel')"
        class="mb-3"
      >
        <b-input-group>
          <b-form-input
            v-model="user.password"
            :type="showPassword ? 'text' : 'password'"
          ></b-form-input>
          <b-input-group-append>
            <b-input-group-text
              class="bg-transparent"
              @click="showPassword = !showPassword"
            >
              <i :class="`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`"></i>
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-checkbox v-model="rememberUser">{{ $t('modal.logIn.rememberMe') }}</b-form-checkbox>

      <div class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
        >{{ $t('modal.logIn.submitBtn') }}</b-button>
      </div>
    </b-form>
    <hr>
    <p class="d-flex align-items-center justify-content-center">
      {{ $t('modal.logIn.callToAction') }}
      <b-button
        variant="link"
        class="p-0 ml-1"
        v-b-modal.register-modal
        @click="$refs['login-modal'].hide()"
      >{{ $t('modal.logIn.registerBtn') }}</b-button>
    </p>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginModal",
  data() {
    return {
      showPassword: false,
      rememberUser: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),

    // Login and hide modal
    handleSubmit() {
      this.login({
        user: this.user,
        rememberUser: this.rememberUser,
      })
        .then((resp) => {
          if (resp.status === 200) {
            this.$refs["login-modal"].hide();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
