<template>
  <b-nav-item-dropdown
    text="Lang"
    right
  >
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
  name: "TheLocaleChanger",
  data() {
    return {
      langs: ["en", "tr"],
      lang: null,
    };
  },
  methods: {
    changeLocale(lang) {
      this.$root.$i18n.locale = lang
    }
  }
};
</script>
