<template>
  <b-modal
    ref="register-modal"
    id="register-modal"
    :title="$t('register.modal.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit">
      <!-- Name -->
      <b-form-group
        :label="$t('register.form.nameLabel')"
        class="mb-3"
      >
        <b-form-input v-model="user.name"></b-form-input>
      </b-form-group>
      <!-- Email -->
      <b-form-group
        :label="$t('register.form.emailLabel')"
        class="mb-3"
      >
        <b-form-input v-model="user.email"></b-form-input>
      </b-form-group>
      <!-- Role -->
      <b-form-group
        :label="$t('register.form.roleLabel')"
        class="mb-3"
      >
        <b-form-input v-model="user.role"></b-form-input>
      </b-form-group>
      <!-- Password -->
      <b-form-group
        :label="$t('register.form.passwordLabel')"
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
      <!-- Confirm Password -->
      <b-form-group
        :label="$t('register.form.confirmPasswordLabel')"
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


      <!-- Submit -->
      <div class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
        >{{ $t('register.modal.submitBtn') }}</b-button>
      </div>
    </b-form>
    <hr>
    <!-- Call to action -->
    <p class="d-flex align-items-center justify-content-center">
      {{ $t('register.modal.callToAction') }}
      <b-button
        variant="link"
        class="p-0 ml-1"
        v-b-modal.login-modal
        @click="$refs['register-modal'].hide()"
      >{{ $t('register.modal.registerBtn') }}</b-button>
    </p>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RegisterModal",
  data() {
    return {
      showPassword: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["register"]),

    // Login and hide modal
    handleSubmit() {
      this.register({
        user: this.user,
        rememberUser: this.rememberUser,
      })
        .then((resp) => {
          if (resp.status === 201) {
            this.$refs["register-modal"].hide();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
