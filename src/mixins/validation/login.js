import { required, email, minLength } from "vuelidate/lib/validators";
import { password } from "@/helpers/validation-helpers";

export default {
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8),
        password,
      },
    },
  },
}