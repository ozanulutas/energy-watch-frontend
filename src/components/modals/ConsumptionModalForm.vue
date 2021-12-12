<template>
  <b-modal
    id="consumption-modal-form"
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
        ></b-form-select>
      </b-form-group>
      <!-- Department -->
      <b-form-group
        :label="$t('consumption.tbl.departmentCol')"
        class="mb-3"
      >
        <b-form-input v-model="consumption.department"></b-form-input>
      </b-form-group>
      <!-- Consumption -->
      <b-form-group
        :label="$t('consumption.tbl.consumptionCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="consumption.consumption"
          type="number"
        ></b-form-input>
      </b-form-group>
      <!-- Fee -->
      <b-form-group
        :label="$t('consumption.tbl.feeCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="consumption.fee"
          type="number"
        ></b-form-input>
      </b-form-group>
      <!-- Dsicounted Price -->
      <b-form-group
        :label="$t('consumption.tbl.discountedPriceCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="consumption.discounted_price"
          type="number"
        ></b-form-input>
      </b-form-group>
      <!-- Start Date -->
      <b-form-group
        :label="$t('consumption.tbl.startDateCol')"
        class="mb-3"
      >
        <b-form-datepicker
          v-model="consumption.start_date"
          @input="($e) => consumption.start_date = new Date($e).toLocaleDateString('fr-CA')"
        ></b-form-datepicker>
      </b-form-group>
      <!-- End Date -->
      <b-form-group
        :label="$t('consumption.tbl.endDateCol')"
        class="mb-3"
      >
        <b-form-datepicker v-model="consumption.end_date"></b-form-datepicker>
      </b-form-group>

      <!-- Custom Cols -->
      <b-form-group
        v-for="col, i in customCols"
        :key="i"
        :label="col.type !== 'boolean' ? col.alias : ''"
        class="mb-3"
      >
        <b-form-input
          v-if="col.type === 'text'"
          v-model="consumption[col.name]"
        ></b-form-input>
        <b-form-input
          v-if="col.type === 'integer'"
          v-model="consumption[col.name]"
          type="number"
        ></b-form-input>
        <b-form-datepicker
          v-else-if="col.type === 'date'"
          v-model="consumption[col.name]"
        ></b-form-datepicker>
        <b-form-checkbox
          v-else-if="col.type === 'boolean'"
          v-model="consumption[col.name]"
          :name="`${col.alias}-${i}`"
        >
          {{ col.alias }}
        </b-form-checkbox>
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

export default {
  name: "ConsumptionModalForm",
  props: {
    data: Object,
  },
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
      }
    });
  },
  methods: {
    ...mapActions("consumption", ["updateConsumption", "createConsumption"]),
    ...mapActions("facility", ["fetchFacilities"]),

    handleSubmit() {
      this.isEdit
        ? this.updateConsumption(this.consumption)
        : this.createConsumption(this.consumption);
    },
  },
};
</script>
