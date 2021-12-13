<template>
  <b-modal
    ref="login-modal"
    id="login-modal"
    :title="$t('logIn.modal.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit">
      <!-- Email -->
      <b-form-group
        :label="$t('logIn.form.emailLabel')"
        class="mb-3"
      >
        <b-form-input
          v-model="user.email"
          :state="validateState('user.email')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.email") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Password -->
      <b-form-group
        :label="$t('logIn.form.passwordLabel')"
        class="mb-3"
      >
        <BasePasswordInput
          v-model="user.password"
          :state="validateState('user.password')"
        />
      </b-form-group>

      <!-- Remember -->
      <b-form-checkbox v-model="rememberUser">{{ $t('logIn.form.rememberMe') }}</b-form-checkbox>

      <!-- Submit -->
      <div class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
        >{{ $t('logIn.modal.submitBtn') }}</b-button>
      </div>
    </b-form>
    <hr>
    <!-- Call to action -->
    <p class="d-flex align-items-center justify-content-center">
      {{ $t('logIn.modal.callToAction') }}
      <b-button
        variant="link"
        class="p-0 ml-1"
        v-b-modal.register-modal
        @click="$refs['login-modal'].hide()"
      >{{ $t('logIn.modal.registerBtn') }}</b-button>
    </p>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";
import BasePasswordInput from "@/components/BasePasswordInput";
import validateState from "@/mixins/validation/validate-state";
import loginFormValidation from "@/mixins/validation/login";

export default {
  name: "LoginModal",
  components: {
    BasePasswordInput,
  },
  mixins: [validateState, loginFormValidation],
  data() {
    return {
      rememberUser: false,
      user: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    // Clear form data and reset validations on modal close
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (modalId === "login-modal") {
        this.user = {};
        this.$v.$reset();
      }
    });
  },
  methods: {
    ...mapActions("user", ["login"]),

    // Validate, Login and hide modal
    handleSubmit() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

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
