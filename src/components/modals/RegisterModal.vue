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
        <b-form-input
          v-model="user.name"
          :state="validateState('user.name')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.minChar", { n: 8 }) }` }}
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Email -->
      <b-form-group
        :label="$t('register.form.emailLabel')"
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

      <!-- Roles -->
      <b-form-group
        :label="$t('register.form.roleLabel')"
        class="mb-3"
      >
        <b-form-select
          v-model="user.role"
          :options="userRoles"
          value-field="name"
          text-field="name"
          :state="validateState('user.role')"
        ></b-form-select>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        :label="$t('register.form.passwordLabel')"
        class="mb-3"
      >
        <BasePasswordInput
          v-model="user.password"
          :state="validateState('user.password')"
        />
      </b-form-group>

      <!-- Confirm Password -->
      <b-form-group
        :label="$t('register.form.confirmPasswordLabel')"
        class="mb-3"
      >
        <BasePasswordInput
          v-model="user.confirmPassword"
          :state="validateState('user.confirmPassword')"
          :error-msg="$t('formError.passwordNotMatch')"
        />
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
import { mapActions, mapState } from "vuex";
import BasePasswordInput from "@/components/BasePasswordInput";
import validateState from "@/mixins/validation/validate-state";
import registerFormValidation from "@/mixins/validation/register";

export default {
  name: "RegisterModal",
  components: {
    BasePasswordInput,
  },
  mixins: [validateState, registerFormValidation],
  data() {
    return {
      showPassword: false,
      user: {
        name: "",
        role: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    ...mapState("userRole", ["userRoles"]),
  },
  mounted() {
    this.fetchUserRoles();

    // Clear form data and reset validations on modal close
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (modalId === "register-modal") {
        this.user = {};
        this.$v.$reset();
      }
    });
  },
  methods: {
    ...mapActions("userRole", ["fetchUserRoles"]),
    ...mapActions("user", ["register"]),

    // Validate, register and hide modal
    handleSubmit() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      this.register(this.user)
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
