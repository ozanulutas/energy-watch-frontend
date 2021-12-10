<template>
  <b-input-group>
    <b-form-input
      :type="isPasswordVisible ? 'text' : 'password'"
      @input="($e) => $emit('input', $e)"
      :state="state"
    ></b-form-input>
    <b-input-group-append>
      <b-input-group-text
        class="bg-transparent"
        @click="isPasswordVisible = !isPasswordVisible"
      >
        <i :class="`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`"></i>
      </b-input-group-text>
    </b-input-group-append>
    <b-form-invalid-feedback>
      {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
    </b-form-invalid-feedback>
  </b-input-group>
</template>

<script>
export default {
  name: "BasePasswordInput",
  props: {
    // Validaiton state
    state: {
      type: Boolean,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      // Visibility state of password
      isPasswordVisible: false,
    };
  },
};
</script>
