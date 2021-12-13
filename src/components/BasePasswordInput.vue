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
      <div v-if="errorMsg">{{errorMsg}}</div>
      <div v-else>
        {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        {{ `${ $t("common.and") } ${ $t("formError.mustContain") }` }};
        {{ `${ $t("formError.atLeast") } ${ $t("formError.uppercase", { n: 1 }) }` }},
        {{ `${ $t("formError.lowercase", { n: 1 }) } ${ $t("common.and") } ${ $t("formError.number", { n: 1 }) }` }}
      </div>

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
    errorMsg: {
      type: String,
      default: "",
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
