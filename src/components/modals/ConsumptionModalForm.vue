<template>
  <b-modal
    id="consumption-modal-form"
    ref="consumption-modal-form"
    v-model="visible"
    :title="isEdit ? $t('consumption.editForm.title') : $t('consumption.createForm.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit()">
      <!-- Facility Name -->
      <b-form-group
        :label="$t('consumption.tbl.facilityNameCol')"
        class="mb-3"
      >
        <b-form-select
          v-model="consumption.facility_id"
          :options="getFacilities"
          :state="validateState('consumption.facility_id')"
        ></b-form-select>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Department -->
      <b-form-group
        :label="$t('consumption.tbl.departmentCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="consumption.department"
          :state="validateState('consumption.department')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Consumption -->
      <b-form-group
        :label="$t('consumption.tbl.consumptionCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="consumption.consumption"
          type="number"
          step="0.0001"
          :state="validateState('consumption.consumption')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.num") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Fee -->
      <b-form-group
        :label="$t('consumption.tbl.feeCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="consumption.fee"
          type="number"
          step="0.0001"
          :state="validateState('consumption.fee')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.num") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Dsicounted Price -->
      <b-form-group
        :label="$t('consumption.tbl.discountedPriceCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="consumption.discounted_price"
          type="number"
          step="0.0001"
          :state="validateState('consumption.discounted_price')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.num") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Start Date -->
      <b-form-group
        :label="$t('consumption.tbl.startDateCol')"
        class="mb-3"
      >
        <b-form-datepicker
          v-model="consumption.start_date"
          :state="validateState('consumption.start_date')"
        ></b-form-datepicker>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- End Date -->
      <b-form-group
        :label="$t('consumption.tbl.endDateCol')"
        class="mb-3"
      >
        <b-form-datepicker
          v-model="consumption.end_date"
          :state="validateState('consumption.end_date')"
        ></b-form-datepicker>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Custom Cols -->
      <b-form-group
        v-for="col, i in customCols"
        :key="i"
        :label="col.type !== 'boolean' ? col.alias : ''"
        class="mb-3"
      >
        <CustomColInput
          v-model="consumption[col.name]"
          :data="consumption[col.name]"
          :col="col"
        />
      </b-form-group>

      <hr>

      <!-- Submit -->
      <div class="d-flex justify-content-between">
        <b-button
          variant="secondary"
          @click="visible = false"
        >
          {{ $t('common.cancel') }}
        </b-button>
        <!-- Cancel -->
        <b-button
          type="submit"
          variant="primary"
        >
          <i class="fas fa-save"></i>
          {{ $t('common.save') }}
        </b-button>
      </div>

    </b-form>

  </b-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import validateState from "@/mixins/validation/validate-state";
import consumptionFormValidation from "@/mixins/validation/consumption";
import CustomColInput from "@/components/CustomColInput";

export default {
  name: "ConsumptionModalForm",
  components: {
    CustomColInput,
  },
  props: {
    data: Object,
  },
  mixins: [validateState, consumptionFormValidation],
  data() {
    return {
      visible: false, // Modals visibility state
      // Form data
      consumption: {
        date_range: null,
        start_date: null,
        end_date: null,
        department: "",
        fee: null,
        discounted_price: null,
        consumption: null,
        facility_id: null,
      },
    };
  },
  computed: {
    ...mapState("consumption", ["customCols"]),
    ...mapGetters("facility", ["getFacilities"]),

    // Determines if form is opened for edit a record
    // If data prop contains id key, then it is for edit
    isEdit() {
      return Object.prototype.hasOwnProperty.call(this.data, "id");
    },
  },
  watch: {
    isEdit(isEdit) {
      if (isEdit) {
        this.consumption = this.data;
      }
    },
  },
  mounted() {
    // Fetch fatitlities to use in b-select
    this.fetchFacilities();

    // Clear edit form data on modal close
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (modalId === "consumption-modal-form") {
        this.$emit("update:data", {});
        this.consumption = {};
        this.$v.$reset();
      }
    });
  },
  methods: {
    ...mapActions("consumption", ["updateConsumption", "createConsumption"]),
    ...mapActions("facility", ["fetchFacilities"]),

    handleSubmit() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      (this.isEdit
        ? this.updateConsumption(this.consumption)
        : this.createConsumption(this.consumption)
      ).then((resp) => {
        if ([200, 201].includes(resp.status)) {
          this.$refs["consumption-modal-form"].hide();
        }
      });
    },
  },
};
</script>
