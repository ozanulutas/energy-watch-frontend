import { required, integer } from "vuelidate/lib/validators";

const bool = (value) => typeof value === "boolean"

export default {
  validations: {
    facility: {
      name: {
        required,
      },
      membership_start_date: {
        required,
      },
      membership_end_date: {
        required,
      },
      employees: {
        required,
        integer
      },
      is_special: {
        required,
        bool
      },
    },
  },
}