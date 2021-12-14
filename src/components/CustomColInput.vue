<template>
  <div>
    <b-form-input
      v-if="col.type === 'text'"
      :value="data"
      @input="($e) => $emit('input', $e)"
    ></b-form-input>
    <b-form-input
      v-if="col.type === 'integer'"
      :value="data"
      type="number"
      @input="($e) => $emit('input', $e)"
    ></b-form-input>
    <b-form-input
      v-if="col.type === 'double'"
      :value="data"
      type="number"
      step="0.0001"
      @input="($e) => $emit('input', $e)"
    ></b-form-input>
    <b-form-datepicker
      v-else-if="col.type === 'date'"
      :value="data"
      @input="($e) => $emit('input', $e)"
    ></b-form-datepicker>
    <b-form-checkbox
      v-else-if="col.type === 'boolean'"
      :checked="data"
      :name="`${col.name}`"
      :unchecked-value="false"
      :value="true"
      @input="($e) => $emit('input', $e)"
    >
      {{ col.alias }}
    </b-form-checkbox>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CustomColInput",
  props: {
    col: Object,
    data: null
  },
  computed: {
    ...mapState("facility", ["customCols"]),
  },
};
</script>
