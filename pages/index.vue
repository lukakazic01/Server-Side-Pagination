<template lang="pug">
  v-container
    v-row
      v-col(cols)
        DataTable(
          v-if="!error"
          :headers="headers"
          :items="items"
          :server-items-length="serverItemsLength"
          @update-options="fetchData"
        )
        v-progress-circular(
          v-else
          width="2"
          color="rs__primary"
          indeterminate
        ).mx-auto
</template>

<script>
export default {

  data() {
    return {
      items: [],
      error: true,
      serverItemsLength: 0,
      headers: [
        { text: 'Name', value: 'user.first_name', align: 'start' },
        { text: 'Email', value: 'email' },
        { text: 'Gender', value: 'gender' },
        { text: 'Year', value: 'year' },
        { text: 'Sales', value: 'sales' },
        { text: 'Country', value: 'country' },
      ],
    }
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData(options, search) {
      const sales = await this.$axios.$get('/api/sales', { params: {
      filter: search,
      itemsPerPage: options?.itemsPerPage || 10,
      page: options?.page || 1,
      sortBy: options?.sortBy || [],
      sortDesc: options?.sortDesc || []
      }});
      this.items = sales.listItems;
      if(this.items.length > 0)
      setTimeout(() => this.error = false, 1500);
      this.serverItemsLength = sales.serverItemsLength;
      return sales.listItems;
    }
  }
}
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 50%
  left: 50%
</style>