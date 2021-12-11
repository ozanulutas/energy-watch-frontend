<template>
  <div>
    <h1>Dashboard</h1>
    <b-table
      ref="table"
      hover
      :busy.sync="isBusy"
      :items="facilities"
      :fields="fields"
    >
      <template #cell(actions)="row">
        <b-button
          size="sm"
          class="mr-2"
          variant="outline-info"
          v-b-modal.facility-modal-form
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

    <FacilityModalForm />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import FacilityModalForm from "@/components/modals/FacilityModalForm"

export default {
  name: "Dashboard",
  components: {
    FacilityModalForm
  },
  data() {
    return {
      isBusy: false,
    };
  },
  computed: {
    ...mapState("facility", ["facilities"]),
    ...mapGetters("facility", ["getCustomCols"]),

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
          formatter: val => val ? new Date(val).toLocaleDateString("tr") : "-"
        },
        {
          key: "membership_end_date",
          label: this.$t("facility.tbl.endDateCol"),
          sortable: true,
          formatter: val => val ? new Date(val).toLocaleDateString("tr") : "-"
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
    ...mapActions("facility", ["fetchFacilities", "fetchCustomCols", "deleteFacility"]),
  },
};
</script>

<style>
</style>
