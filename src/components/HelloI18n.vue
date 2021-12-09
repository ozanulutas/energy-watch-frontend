<template>
  <div>
    <select
      v-model="$root.$i18n.locale"
    >
      <option
        v-for="(lang, i) in langs"
        :key="`lang-${i}`"
        :value="lang"
      >
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "HelloI18n",
  data() {
    return { 
      langs: ["en", "tr"], 
    };
  },
};
</script>

