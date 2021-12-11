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
        ></b-form-select>
      </b-form-group>

      <!-- Password -->
      <b-form-group
        :label="$t('register.form.passwordLabel')"
        class="mb-3"
      >
        <BasePasswordInput v-model="user.password" />
      </b-form-group>

      <!-- Confirm Password -->
      <b-form-group
        :label="$t('register.form.confirmPasswordLabel')"
        class="mb-3"
      >
        <BasePasswordInput v-model="confirmPassword" />
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

export default {
  name: "RegisterModal",
  components: {
    BasePasswordInput,
  },
  data() {
    return {
      showPassword: false,
      confirmPassword: "",
      user: {
        name: "",
        role: "",
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(["userRoles"]),
  },
  mounted() {
    this.fetchUserRoles();
  },
  methods: {
    ...mapActions(["register", "fetchUserRoles"]),

    // Register and hide modal
    handleSubmit() {
      this.register(this.user)
        .then((resp) => {
          if (resp.status === 201) {
            this.$refs["register-modal"].hide()
            this.user = {}
          }
        })
        .catch((err) => console.log(err))
    },
  },
};
</script>
