<template>
  <b-modal
    ref="facility-modal-form"
    id="facility-modal-form"
    v-model="visible"
    :title="isEdit ? $t('facility.editForm.title') : $t('facility.createForm.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit()">
      <!-- Name -->
      <b-form-group
        :label="$t('facility.tbl.nameCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="facility.name"
          :state="validateState('facility.name')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Employees -->
      <b-form-group
        :label="$t('facility.tbl.employeesCol')"
        class="mb-3"
      >
        <b-form-input
          v-model="facility.employees"
          type="number"
          :state="validateState('facility.employees')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.int") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Membership Type -->
      <b-form-group
        :label="$t('facility.tbl.isSpecialCol')"
        class="mb-3"
      >
        <b-form-select
          v-model="facility.is_special"
          :options="membershipTypes"
          :state="validateState('facility.is_special')"
        ></b-form-select>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- Start Date -->
      <b-form-group
        :label="$t('facility.tbl.startDateCol')"
        class="mb-3"
      >
        <b-form-datepicker
          v-model="facility.membership_start_date"
          :state="validateState('facility.membership_start_date')"
        ></b-form-datepicker>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
      </b-form-group>
      <!-- End Date -->
      <b-form-group
        :label="$t('facility.tbl.endDateCol')"
        class="mb-3"
      >
        <b-form-datepicker
          v-model="facility.membership_end_date"
          :state="validateState('facility.membership_end_date')"
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
          v-model="facility[col.name]"
          :data="facility[col.name]"
          :col="col"
        />
      </b-form-group>
      <!-- <b-form-group
        v-for="col, i in customCols"
        :key="i"
        :label="col.type !== 'boolean' ? col.alias : ''"
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
        <b-form-input
          v-if="col.type === 'double'"
          v-model="consumption[col.name]"
          type="number"
          step="0.0001"
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
      </b-form-group> -->

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
import { mapActions, mapState } from "vuex";
import validateState from "@/mixins/validation/validate-state";
import facilityFormValidation from "@/mixins/validation/facility";
import CustomColInput from "@/components/CustomColInput";

export default {
  name: "FacilityModalForm",
  components: {
    CustomColInput,
  },
  props: {
    data: Object,
  },
  mixins: [validateState, facilityFormValidation],
  data() {
    return {
      visible: false, // Modals visibility state
      // Form data
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

    // Determines if form is opened for edit record
    isEdit() {
      return Object.prototype.hasOwnProperty.call(this.data, "id");
    },
    membershipTypes() {
      return [
        { value: true, text: this.$t("facility.membershipTypes.special") },
        { value: false, text: this.$t("facility.membershipTypes.normal") },
      ];
    },
  },
  watch: {
    isEdit(isEdit) {
      if (isEdit) {
        this.facility = this.data;
      }
    },
  },
  mounted() {
    // Clear edit form data on modal close
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (modalId === "facility-modal-form") {
        this.$emit("update:data", {});
        this.facility = {};
        this.$v.$reset();
      }
    });
  },
  methods: {
    ...mapActions("facility", ["updateFacility", "createFacility"]),

    handleSubmit() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      (this.isEdit
        ? this.updateFacility(this.facility)
        : this.createFacility(this.facility)
      ).then((resp) => {
        if ([200, 201].includes(resp.status)) {
          this.$refs["facility-modal-form"].hide();
        }
      });
    },
  },
};
</script>
