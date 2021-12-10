<template>
  <b-input-group>
    <b-form-input
      :type="isPasswordVisible ? 'text' : 'password'"
      @input="($e) => $emit('input', $e)"
    ></b-form-input>
    <b-input-group-append>
      <b-input-group-text
        class="bg-transparent"
        @click="isPasswordVisible = !isPasswordVisible"
      >
        <i :class="`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`"></i>
      </b-input-group-text>
    </b-input-group-append>
  </b-input-group>
</template>

<script>
export default {
  name: "BasePasswordInput",
  data() {
    return {
      // Visibility state of password
      isPasswordVisible: false
    };
  },
};
</script>
