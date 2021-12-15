<template>
  <div>
    <h1 class="mt-4"><i class="fas fa-industry"></i> {{ $tc("facility.pageTitle", 2) }}</h1>
    <hr class="my-4">
    
    <b-alert
      dismissible
      fade
      show
    >
      <i class="fas fa-exclamation-circle mr-1"></i>
      {{ $t("customCol.alert.delete") }}
    </b-alert>
    <div class="d-flex justify-content-between flex-wrap mb-2">
      <!-- Add new record -->
      <b-button
        class="shadow-sm"
        variant="outline-primary"
        v-b-modal.facility-modal-form
      >
        <i class="fas fa-plus"></i>
        {{ $tc("facility.addRecordBtn") }}
      </b-button>

      <!-- Addn new col -->
      <b-button
        class="shadow-sm"
        variant="outline-primary"
        v-b-modal.column-modal-form
        @click="tblId = 1"
      >
        <i class="fas fa-columns"></i>
        {{ $t("common.addColBtn") }}
      </b-button>
    </div>


    <b-table
      ref="table"
      hover
      :items="facilities"
      :fields="fields"
      responsive
      outlined
      table-class="rounded shadow"
    >
      <!-- Custom columns -->
      <template
        v-for="customCol, i in customCols"
        v-slot:[dynmaicHead(customCol)]="row"
      >
        <span
          :key="`popover-trigger-${i}`"
          :id="`popover-target-${row.label}`"
          class="text-info"
        >{{ row.label }}</span>
        <b-popover
          :key="`popover-${i}`"
          :target="`popover-target-${row.label}`"
          triggers="hover"
          placement="top"
        >
          <b-button
            class="shadow-sm"
            size="sm"
            variant="outline-danger"
            v-b-tooltip.hover
            title="Delete Column"
            @click="handleDeleteCustomCol(row.column)"
          >
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </b-popover>
      </template>

      <!-- Actions -->
      <template #cell(actions)="row">
        <b-button
          size="sm"
          class="mr-2 shadow-sm"
          variant="outline-info"
          v-b-modal.facility-modal-form
          @click="setEditFormData(row.item)"
        >
          <i class="fas fa-pencil-alt"></i>
        </b-button>
        <b-button
          size="sm"
          class="mr-2 shadow-sm"
          variant="outline-danger"
          @click="handleDeleteFacility(row.item.id)"
        >
          <i class="fas fa-trash-alt"></i>
        </b-button>
        <b-button
          class="shadow-sm"
          size="sm"
          variant="outline-warning"
          v-b-tooltip.hover
          title="Consumption Details"
          @click="searchConsumption(row.item.id)"
        >
          <i class="fas fa-bolt"></i>
        </b-button>
      </template>
    </b-table>

    <FacilityModalForm :data.sync="editFormData" />
    <ColumnModalForm :tbl-id.sync="tblId" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import FacilityModalForm from "@/components/modals/FacilityModalForm";
import ColumnModalForm from "@/components/modals/ColumnModalForm";

export default {
  name: "Facilities",
  components: {
    FacilityModalForm,
    ColumnModalForm,
  },
  data() {
    return {
      // Form data to edit
      editFormData: {},
      // Table id to use in custom column creation
      tblId: 1,
    };
  },
  computed: {
    ...mapState("facility", ["facilities", "customCols"]),
    ...mapGetters("facility", ["getCustomCols"]),

    // Table fields
    fields() {
      return [
        { key: "name", label: this.$t("facility.tbl.nameCol"), sortable: true },
        {
          key: "employees",
          label: this.$t("facility.tbl.employeesCol"),
          sortable: true,
        },
        {
          key: "is_special",
          label: this.$t("facility.tbl.isSpecialCol"),
          sortable: true,
          formatter: (val) => val ? this.$t("facility.membershipTypes.normal") : this.$t("facility.membershipTypes.special")
        },
        {
          key: "membership_start_date",
          label: this.$t("facility.tbl.startDateCol"),
          sortable: true,
          formatter: (val) =>
            val ? new Date(val).toLocaleDateString("tr") : "-",
        },
        {
          key: "membership_end_date",
          label: this.$t("facility.tbl.endDateCol"),
          sortable: true,
          formatter: (val) =>
            val ? new Date(val).toLocaleDateString("tr") : "-",
        },
        ...this.getCustomCols,
        { key: "actions", label: this.$t("facility.tbl.actionsCol") },
      ];
    },
  },
  mounted() {
    this.fetchCustomCols();
    this.fetchFacilities();
  },
  methods: {
    ...mapActions("facility", [
      "fetchFacilities",
      "deleteFacility",
      "fetchCustomCols",
      "deleteCustomCol",
    ]),
    ...mapActions("msgBox", ["showMsgBox"]),

    // Sets the form data for edit action
    setEditFormData(facility) {
      this.editFormData = facility;
    },
    // Deletes a facility record after confirmation
    handleDeleteFacility(id) {
      this.showMsgBox("Do you want to remove a facility record?").then(
        (isConfirmed) => isConfirmed && this.deleteFacility(id)
      );
    },
    // Deletes a custom facility column
    handleDeleteCustomCol(name) {
      this.showMsgBox("Do you want to remove a facility column?").then(
        (isConfirmed) => isConfirmed && this.deleteCustomCol(name)
      );
    },
    // Allows dynamically created heads for b-table
    dynmaicHead(key) {
      return `head(${key.name})`; // simple string interpolation
    },
    // Redirects to consumption page to search facility comsumption
    searchConsumption(id) {
      this.$router.push({
        path: "consumptions",
        query: {
          facility: id,
        },
      });
    },
  },
};
</script>

<style>
</style>
