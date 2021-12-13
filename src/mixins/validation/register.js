import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
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
      confirmPassword: {
        required,
        sameAs: sameAs('password')
      },
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