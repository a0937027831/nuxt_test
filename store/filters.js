// store/filters.ts
import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
  id: 'filter-store',
  state: () => {
    return {
      filtersList: ['youtube', 'twitch'],
    }
  },
  actions: {
    addValueToFilterList(value) {
      this.filtersList.push(value)
    },
  },
  getters: {
    filtersList: state => state.filtersList,
  },
})
