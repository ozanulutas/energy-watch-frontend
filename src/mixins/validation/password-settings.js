import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { password } from "@/helpers/validation-helpers";


export default {
  validations: {
    passwordSettings: {
      password: {
        required,
        minLength: minLength(8),
        password,
      },
      confirmPassword: {
        required,
        sameAs: sameAs('password')
      },
    },
  },
}