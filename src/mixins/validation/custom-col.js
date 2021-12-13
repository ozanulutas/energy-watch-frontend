import { required, maxLength } from "vuelidate/lib/validators";

export default {
  validations: {
    col: {
      name: {
        required,
        maxLength: maxLength(255)
      },
      alias: {
        required,
        maxLength: maxLength(255)
      },
      type: {
        required,
      },
    },
  },
}