import { required, maxLength, integer } from "vuelidate/lib/validators";

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
        maxLength: maxLength(100)
      },
      tbl_id: {
        required,
        integer
      },
    },
  },
}