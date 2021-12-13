import { helpers } from "vuelidate/lib/validators";

const password = helpers.regex('password', /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)

export {
  password
}