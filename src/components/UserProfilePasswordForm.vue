<template>
  <b-form @submit.prevent="handleSubmitPasswordSettings()">
    <!-- Password -->
    <b-form-group
      :label="$t('register.form.passwordLabel')"
      class="mb-3"
    >
      <BasePasswordInput
        v-model="passwordSettings.password"
        :state="validateState('passwordSettings.password')"
      />
    </b-form-group>

    <!-- Confirm Password -->
    <b-form-group
      :label="$t('register.form.confirmPasswordLabel')"
      class="mb-3"
    >
      <BasePasswordInput
        v-model="passwordSettings.confirmPassword"
        :state="validateState('passwordSettings.confirmPassword')"
        :error-msg="$t('formError.passwordNotMatch')"
      />
    </b-form-group>

    <!-- Submit -->
    <div class="d-flex justify-content-end">
      <b-button
        type="submit"
        variant="primary"
      >{{ $t('common.save') }}</b-button>
    </div>
  </b-form>
</template>

<script>
import validateState from "@/mixins/validation/validate-state";
import passwordSettingsFormValidation from "@/mixins/validation/password-settings";
import BasePasswordInput from "@/components/BasePasswordInput";

export default {
  name: "UserProfilePasswordForm",
  components: {
    BasePasswordInput,
  },
  mixins: [validateState, passwordSettingsFormValidation],
  data() {
    return {
      passwordSettings: {
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    // Validate, register
    handleSubmitPasswordSettings() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      // this.register(this.user)
      //   .then((resp) => {
      //     if (resp.status === 201) {
      //       this.$refs["register-modal"].hide();
      //     }
      //   })
      //   .catch((err) => console.log(err));
    },
  },
};
</script>
