<template>
  <b-form @submit.prevent="handleSubmitProfileSettings()">
    <!-- Name -->
    <b-form-group
      :label="$t('register.form.nameLabel')"
      class="mb-3"
    >
      <b-form-input
        v-model="profileSettings.name"
        :state="validateState('profileSettings.name')"
      ></b-form-input>
      <b-form-invalid-feedback>
        {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        {{ `${ $t("common.and") } ${ $t("formError.minChar", { n: 8 }) }` }}
      </b-form-invalid-feedback>
    </b-form-group>

    <!-- Roles -->
    <b-form-group
      :label="$t('register.form.roleLabel')"
      class="mb-3"
    >
      <b-form-select
        v-model="profileSettings.role"
        :options="userRoles"
        value-field="name"
        text-field="name"
        :state="validateState('profileSettings.role')"
      ></b-form-select>
      <b-form-invalid-feedback>
        {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
      </b-form-invalid-feedback>
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
import { mapActions, mapState } from "vuex";
import validateState from "@/mixins/validation/validate-state";
import profileSettingsFormValidation from "@/mixins/validation/profile-settings";

export default {
  name: "UserProfileSettingsForm",
   mixins: [
    validateState,
    profileSettingsFormValidation,
  ],
  data() {
    return {
      profileSettings: {
        name: "",
        role: "",
      },
    };
  },
    computed: {
    ...mapState("userRole", ["userRoles"]),
  },
  mounted() {
    this.fetchUserRoles();
  },
  methods: {
    ...mapActions("userRole", ["fetchUserRoles"]),
    ...mapActions("user", ["updateSettings"]),

    // Validate, update profile info
    handleSubmitProfileSettings() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      this.updateSettings(this.profileSettings)
    },
  }
};
</script>
