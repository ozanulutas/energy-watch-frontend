import { required, numeric } from "vuelidate/lib/validators";

export default {
  validations: {
    facility: {
      department: {
        required,
      },
      start_date: {
        required,
      },
      end_date: {
        required,
      },
      fee: {
        required,
        numeric
      },
      discounted_price: {
        required,
        numeric
      },
      consumption: {
        required,
        numeric
      },
      facility_id: {
        required,
        numeric
      }
    },
  },
}