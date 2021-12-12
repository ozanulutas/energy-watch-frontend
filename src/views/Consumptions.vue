<template>
  <div>
    <h1><i class="fas fa-bolt"></i> {{ $tc("consumption.pageTitle", 2) }}</h1>

    <div class="d-flex justify-content-between mb-2">
      <!-- Add new record -->
      <b-button
        variant="outline-primary"
        v-b-modal.consumption-modal-form
      >
        <i class="fas fa-plus"></i>
        {{ $tc("consumption.addRecordBtn") }}
      </b-button>

      <!-- Add new col -->
      <b-button
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
          <!-- <template #title>Popover Title</template> -->
          <b-button
            size="sm"
            variant="outline-danger"
            v-b-tooltip.hover
            title="Delete Column"
            @click="deleteCustomCol(row.column)"
          >
            <i class="fas fa-trash-alt"></i>
          </b-button>
        </b-popover>
        <!-- </template> -->
      </template>

      <!-- Actions -->
      <template #cell(actions)="row">
        <b-button
          size="sm"
          class="mr-2"
          variant="outline-info"
          v-b-modal.consumption-modal-form
          @click="setEditFormData(row.item)"
        >
          <i class="fas fa-pencil-alt"></i>
        </b-button>
        <b-button
          size="sm"
          variant="outline-danger"
          @click="deleteConsumption(row.item.id)"
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
    };
  },
  computed: {
    ...mapState("consumption", ["consumptions", "customCols"]),
    ...mapGetters("consumption", ["getCustomCols"]),

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
  },
  methods: {
    // ...mapActions("facility", []),
    ...mapActions("consumption", [
      "fetchCustomCols",
      "fetchConsumptions",
      "deleteCustomCol",
    ]),
    // Sets the form data for edit action
    setEditFormData(facility) {
      this.editFormData = facility;
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
