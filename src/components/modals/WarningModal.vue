<template>
  <b-modal
    :visible="false"
    :title="'BootstrapVue'"
  >
    <p class="my-4">{{  }}</p>

    <template #modal-footer>
      <div class="w-100">
        <p class="float-left">Modal Footer Content</p>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
        >
          Close
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: "WarningModal",
};
</script>
