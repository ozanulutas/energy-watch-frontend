import { required, minLength } from "vuelidate/lib/validators";

export default {
  validations: {
    profileSettings: {
      name: {
        required,
        minLength: minLength(8),
      },
      role: {
        required,
      },
    },
  },
}