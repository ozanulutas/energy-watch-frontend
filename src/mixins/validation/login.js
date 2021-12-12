import { required, email, alphaNum, minLength, helpers } from "vuelidate/lib/validators";

const upperCase = helpers.regex('upperCase', /[A-Z]/)

export default {
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(8),
        upperCase
      },
    },
  },
}