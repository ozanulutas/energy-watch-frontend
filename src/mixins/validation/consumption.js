import { required, integer, decimal } from "vuelidate/lib/validators";

export default {
  validations: {
    consumption: {
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
        decimal
      },
      discounted_price: {
        required,
        decimal
      },
      consumption: {
        required,
        decimal
      },
      facility_id: {
        required,
        integer,
      }
    },
  },
}