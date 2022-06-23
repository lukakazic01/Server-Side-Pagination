<template lang="pug">
div
  v-data-table(
    :headers="headers"
    :items="items"
    :server-items-length="serverItemsLength"
    :loading="loading"
    :options="options"
    @update:options="updateOptions"
    item-key="email"
    dense
  ).elevation-1.mt-10
  v-text-field(
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
   )
</template>

<script>
export default {
  props: ['headers', 'items','serverItemsLength'],
  data() {
    return {
      loading: true,
      options: {},
      search: ''
    }
  },
  watch: {
    options: {
      handler(){
        this.getOptions()
      }
    },
    search: {
      handler(){
        this.options.page = 1
        this.getOptions();
      },
    }
  },
  methods: {
    getOptions(){
      this.loading = true;
      this.$emit('update-options', this.options, this.search);
      setTimeout(() => this.loading = false, 1000);

    },
    updateOptions(options){
       this.options = options;
    }
  },
}
</script>

<style lang="sass" scoped>
  .v-data-table
    max-width: 100%
</style>
