<template>
  <div>
    <h1>{{ $t("common.facility") }}</h1>

    <div class="d-flex justify-content-end mb-2">
      <b-button
        variant="outline-primary"
        v-b-modal.facility-modal-form
      >
        <i class="fas fa-plus"></i>
        {{ $t("facility.addBtn") }}
      </b-button>
    </div>

    <b-table
      ref="table"
      hover
      :items="facilities"
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
          v-b-modal.facility-modal-form
          @click="setEditFormData(row.item)"
        >
          <i class="fas fa-pencil-alt"></i>
        </b-button>
        <b-button
          size="sm"
          variant="outline-danger"
          @click="deleteFacility(row.item.id)"
        >
          <i class="fas fa-trash-alt"></i>
        </b-button>
      </template>
    </b-table>

    <FacilityModalForm :data.sync="editFormData" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import FacilityModalForm from "@/components/modals/FacilityModalForm";

export default {
  name: "Dashboard",
  components: {
    FacilityModalForm,
  },
  data() {
    return {
      // Form data to edit
      editFormData: {},
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
