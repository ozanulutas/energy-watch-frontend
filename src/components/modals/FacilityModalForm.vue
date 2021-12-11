<template>
  <b-modal
    id="facility-modal-form"
    v-model="visible"
    :title="$t('facility.createForm.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit">
      <!-- Name -->
      <b-form-group
        :label="$t('facility.tbl.nameCol')"
        class="mb-3"
      >
        <b-form-input v-model="facility.name"></b-form-input>
      </b-form-group>
      <!-- Employees -->
      <b-form-group
        :label="$t('facility.tbl.employeesCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="facility.employees"
          type="number"
        ></b-form-input>
      </b-form-group>
      <!-- Membership Type -->
      <b-form-group
        :label="$t('facility.tbl.isSpecialCol')"
        class="mb-3"
      >
        <b-form-select
          v-model="facility.is_special"
          :options="membershipTypes"
        ></b-form-select>
      </b-form-group>
      <!-- Start Date -->
      <b-form-group
        :label="$t('facility.tbl.startDateCol')"
        class="mb-3"
      >
        <b-form-datepicker v-model="facility.membership_start_date"></b-form-datepicker>
      </b-form-group>
      <!-- End Date -->
      <b-form-group
        :label="$t('facility.tbl.endDateCol')"
        class="mb-3"
      >
        <b-form-datepicker v-model="facility.membership_end_date"></b-form-datepicker>
      </b-form-group>

      <!-- Custom Cols -->
      <b-form-group
        v-for="col, i in customCols"
        :key="i"
        :label="col.alias"
        class="mb-3"
      >
        <b-form-input
          v-if="col.type === 'text'"
          v-model="facility[col.name]"
        ></b-form-input>
        <b-form-input
          v-if="col.type === 'integer'"
          v-model="facility[col.name]"
          type="number"
        ></b-form-input>
        <b-form-datepicker
          v-else-if="col.type === 'date'"
          v-model="facility[col.name]"
        ></b-form-datepicker>
        <b-form-checkbox
          v-else-if="col.type === 'boolean'"
          v-model="facility[col.name]"
          :name="`${col.alias}-${i}`"
        >
          {{ col.alias }}
        </b-form-checkbox>
      </b-form-group>

      <hr>

      <!-- Submit -->
      <div class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
        >
          <i class="fas fa-save"></i>
          {{ $t('facility.createForm.submitBtn') }}
        </b-button>
      </div>

    </b-form>

  </b-modal>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "WarningModal",
  data() {
    return {
      visible: false,
      facility: {
        name: "",
        employees: null,
        is_special: null,
        membership_start_date: null,
        membership_end_date: null,
        user_id: "",
      },
    };
  },
  computed: {
    ...mapState("facility", ["customCols"]),

    membershipTypes() {
      return [
        { value: true, text: this.$t("facility.membershipTypes.special") },
        { value: false, text: this.$t("facility.membershipTypes.normal") },
      ];
    },
  },
  methods: {
    ...mapActions("facility", ["updateFacility", "createFacility"]),

    handleSubmit() {
      console.log("submited");
      this.createFacility(this.facility);
    },
  },
};
</script>
