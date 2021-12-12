<template>
  <b-modal
    id="column-modal-form"
    v-model="visible"
    :title="$t('customCol.createForm.title')"
    hide-footer
  >
    <b-form @submit.prevent="handleSubmit()">
    

      <!-- Col Name -->
      <b-form-group
        :label="$t('customCol.createForm.name')"
        class="mb-3"
      >
        <b-form-input v-model="col.name"></b-form-input>
      </b-form-group>

      <!-- Col Alias -->
      <b-form-group
        :label="$t('customCol.createForm.alias')"
        class="mb-3"
      >
        <b-form-input v-model="col.alias"></b-form-input>
      </b-form-group>

      <!-- Col Type -->
      <b-form-group
        :label="$t('customCol.createForm.type')"
        class="mb-3"
      >
        <b-form-select
          v-model="col.type"
          :options="getColTypes"
        ></b-form-select>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ColumnModalForm",
  props: {
    tblId: { type: Number, required: true },
  },
  data() {
    return {
      visible: false, // Modals visibility state
      // Form data
      col: {
        name: "",
        alias: "",
        type: "",
        tbl_id: null,
      },
    };
  },
  computed: {
    ...mapGetters("customCol", ["getColTypes"]),
  },
  mounted() {
    this.fetchColTypes();

    // Clear table id and form data on modal close
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      if (modalId === "column-modal-form") {
        this.$emit("update:tbl-id", 0);
        this.col = {};
      }
    });
  },
  methods: {
    ...mapActions("customCol", ["fetchColTypes", "createCol"]),

    handleSubmit() {
      this.col.tbl_id = this.tblId;
      this.createCol(this.col);
    },
  },
};
</script>
