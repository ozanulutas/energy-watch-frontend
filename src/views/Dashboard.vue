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
          class="mr-1"
          variant="outline-primary"
        >
          <i class="fas fa-pencil-alt"></i> {{row}}
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
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Dashboard",
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
        },
        {
          key: "membership_end_date",
          label: this.$t("facility.tbl.endDateCol"),
          sortable: true,
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
