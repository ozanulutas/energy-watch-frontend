<template>
  <b-nav-item-dropdown right>
    <template #button-content>
      <i class="fas fa-language"></i>
      {{ $t('navbar.dropdown.lang') }}
    </template>
    <b-dropdown-item
      v-for="lang, i in langs"
      :key="i"
      :active="$i18n.locale === lang"
      @click="changeLocale(lang)"
    >
      {{ lang.toUpperCase() }}
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
export default {
  name: "LocaleChanger",
  data() {
    return {
      langs: ["en", "tr"],
      lang: null,
    };
  },
  methods: {
    changeLocale(lang) {
      this.$root.$i18n.locale = lang;
    },
  },
};
</script>
