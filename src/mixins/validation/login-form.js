import { required } from "vuelidate/lib/validators";

export default {
  validations: {
    user: {
      email: {
        required,
      },
      password: {
        required,
      },
    },
  },
}