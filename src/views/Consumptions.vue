<template>
  <div>
    <div class="d-flex justify-content-between align-items-end flex-wrap">
      <h1 class="mt-4"><i class="fas fa-bolt"></i> {{ $tc("consumption.pageTitle", 2) }}</h1>

      <!-- SEARCH -->
      <b-input-group class="shadow-sm">
        <b-form-select
          v-model="searchParams.facility_id"
          :options="[
          { value: null, text: 'Select a facility to search' },
          { value: 'all', text: 'All Records' },
          ...getFacilities
        ]"
        ></b-form-select>
        <b-input-group-append>
          <b-button
            variant="primary"
            :disabled="!searchParams.facility_id"
            @click="searchConsumption()"
          >
            <i class="fas fa-search"></i>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <hr class="my-4">

    <div class="d-flex justify-content-between mb-2">
      <!-- Add new record -->
      <b-button
        class="shadow-sm"
        variant="outline-primary"
        v-b-modal.consumption-modal-form
      >
        <i class="fas fa-plus"></i>
        {{ $tc("consumption.addRecordBtn") }}
      </b-button>

      <!-- Add new col -->
      <b-button
        class="shadow-sm"
        variant="outline-primary"
        v-b-modal.column-modal-form
        @click="tblId = 2"
      >
        <i class="fas fa-columns"></i>
        {{ $t("common.addColBtn") }}
      </b-button>
    </div>

    <b-table
      ref="table"
      hover
      :items="consumptions"
      :fields="fields"
      empty-text="There are no records to show"
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
          class="mr-2 shadow-sm"
          size="sm"
          variant="outline-info"
          v-b-modal.consumption-modal-form
          @click="setEditFormData(row.item)"
        >
          <i class="fas fa-pencil-alt"></i>
        </b-button>
        <b-button
          class="shadow-sm"
          size="sm"
          variant="outline-danger"
          @click="handleDeleteConsumption(row.item.id)"
        >
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </template>
    </b-table>

    <ConsumptionModalForm :data.sync="editFormData" />
    <ColumnModalForm :tbl-id.sync="tblId" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import ConsumptionModalForm from "@/components/modals/ConsumptionModalForm";
import ColumnModalForm from "@/components/modals/ColumnModalForm";

export default {
  name: "Consumptions",
  components: {
    ConsumptionModalForm,
    ColumnModalForm,
  },
  data() {
    return {
      // Form data to edit
      editFormData: {},
      // Table id to use in custom column creation
      tblId: 2,
      // Search params for consumption search
      searchParams: {
        facility_id: null,
      },
    };
  },
  computed: {
    ...mapState("consumption", ["consumptions", "customCols"]),
    ...mapGetters("consumption", ["getCustomCols"]),
    ...mapGetters("facility", ["getFacilities"]),

    // Table fields
    fields() {
      return [
        {
          key: "facility_name",
          label: this.$t("consumption.tbl.facilityNameCol"),
          sortable: true,
        },
        {
          key: "department",
          label: this.$t("consumption.tbl.departmentCol"),
          sortable: true,
        },
        {
          key: "consumption",
          label: this.$t("consumption.tbl.consumptionCol"),
          sortable: true,
        },
        {
          key: "fee",
          label: this.$t("consumption.tbl.feeCol"),
          sortable: true,
        },
        {
          key: "discounted_price",
          label: this.$t("consumption.tbl.discountedPriceCol"),
          sortable: true,
        },
        {
          key: "date_range",
          label: this.$t("consumption.tbl.dateRangeCol"),
          sortable: true,
        },
        {
          key: "start_date",
          label: this.$t("consumption.tbl.startDateCol"),
          sortable: true,
          formatter: (val) =>
            val ? new Date(val).toLocaleDateString("tr") : "-",
        },
        {
          key: "end_date",
          label: this.$t("consumption.tbl.endDateCol"),
          sortable: true,
          formatter: (val) =>
            val ? new Date(val).toLocaleDateString("tr") : "-",
        },
        ...this.getCustomCols,
        { key: "actions", label: this.$t("consumption.tbl.actionsCol") },
      ];
    },
  },
  mounted() {
    this.fetchCustomCols();
    this.fetchConsumptions();
    // Fetch fatitlities to use in b-select
    this.fetchFacilities();

    // If tehere is facility url query, seraches it's consumptions
    if (this.$route.query.facility) {
      this.searchParams.facility_id = this.$route.query.facility;
      this.searchConsumption();
    }
  },
  methods: {
    ...mapActions("consumption", [
      "fetchCustomCols",
      "deleteConsumption",
      "fetchConsumptions",
      "deleteCustomCol",
      "fetchFacilityConsumptions",
    ]),
    ...mapActions("facility", ["fetchFacilities"]),
    ...mapActions("msgBox", ["showMsgBox"]),

    // Sets the form data for edit action
    setEditFormData(consumption) {
      this.editFormData = consumption;
    },
    // Deletes a consumption record after confirmation
    handleDeleteConsumption(id) {
      this.showMsgBox("Do you want to remove a consumption record?").then(
        (isConfirmed) => isConfirmed && this.deleteConsumption(id)
      );
    },
    // Deletes a custom consumption column
    handleDeleteCustomCol(name) {
      this.showMsgBox("Do you want to remove a consumption column?").then(
        (isConfirmed) => isConfirmed && this.deleteCustomCol(name)
      );
    },
    // Searches consumption bu facility and sets the url query accordingly
    searchConsumption() {
      const facilityId = this.searchParams.facility_id;

      facilityId === "all"
        ? this.fetchConsumptions()
        : this.fetchFacilityConsumptions(facilityId);

      if (this.$route.query.facility !== facilityId) {
        this.$router.push({
          path: "consumptions",
          query: {
            facility: facilityId,
          },
        });
      }
    },
    // Allows dynamically created heads for b-table
    dynmaicHead(key) {
      return `head(${key.name})`; // simple string interpolation
    },
  },
};
</script>

<style>
</style>
