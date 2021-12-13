<template>
  <b-modal
    ref="column-modal-form"
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
        <b-form-input
          v-model="col.name"
          :state="validateState('col.name')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.maxChar", { n: 255 }) }` }}
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Col Alias -->
      <b-form-group
        :label="$t('customCol.createForm.alias')"
        class="mb-3"
      >
        <b-form-input
          v-model="col.alias"
          :state="validateState('col.alias')"
        ></b-form-input>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
          {{ `${ $t("common.and") } ${ $t("formError.maxChar", { n: 255 }) }` }}
        </b-form-invalid-feedback>
      </b-form-group>

      <!-- Col Type -->
      <b-form-group
        :label="$t('customCol.createForm.type')"
        class="mb-3"
      >
        <b-form-select
          v-model="col.type"
          :options="getColTypes"
          :state="validateState('col.type')"
        ></b-form-select>
        <b-form-invalid-feedback>
          {{ `${ $t("formError.introThis") } ${ $t("formError.required") }` }}
        </b-form-invalid-feedback>
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
import validateState from "@/mixins/validation/validate-state";
import customColFormValidation from "@/mixins/validation/custom-col";

export default {
  name: "ColumnModalForm",
  props: {
    tblId: { type: Number, required: true },
  },
  mixins: [validateState, customColFormValidation],
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
        this.$v.$reset();
      }
    });
  },
  methods: {
    ...mapActions("customCol", ["fetchColTypes", "createCol"]),

    // Validates, sets tbl_id and submits the form
    handleSubmit() {
      this.$v.$touch();

      if (this.$v.$error) {
        return;
      }

      this.col.tbl_id = this.tblId;

      this.createCol(this.col)
        .then((resp) => {
          if (resp.status === 201) {
            this.$refs["column-modal-form"].hide();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
