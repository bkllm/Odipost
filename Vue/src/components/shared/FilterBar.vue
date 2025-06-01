<template>

  <!-- ********************** FILTER BAR ********************** -->
  <div class="d-flex align-center justify-space-between flex-wrap ga-4">

    <!-- ********** SEARCH ********** -->
    <v-text-field
      v-model="localSearch"
      :placeholder="placeholder"
      color="primary"
      label="Search"
      variant="outlined"
      density="comfortable"
      clearable
      style="max-width: 400px"
      bg-color="white"
    />

    <!-- ********** FILTERS ********** -->
    <div class="d-flex align-center flex-wrap ga-3">
      <v-select
        v-for="filter in filters"
        :key="filter.key"
        v-model="localFilterStates[filter.key]"
        :label="filter.label"
        :items="['', ...filter.options]"
        :item-title="(val) => val === '' ? 'All' : val"
        :item-value="(val) => val"
        color="primary"
        density="comfortable"
        variant="outlined"
        bg-color="white"
        style="min-width: 150px"
      />

      <!-- ********** RESET ********** -->
      <v-btn
        variant="outlined"
        color="primary"
        height="48"
        style="align-self: start;"
        prepend-icon="mdi-refresh"
        :disabled="!hasActiveFilters"
        @click="reset"
      >
        Reset
      </v-btn>
    </div>

  </div>

</template>


<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  import { ref, computed, watch } from 'vue'

  // ********** TYPES **********
  export type FilterState = Record<string, string>

  export type FilterOption = {
    label:    string
    key:      keyof FilterState
    options:  string[]
  }

  // ********** PROPS **********
  const props = defineProps<{
    search:       string
    placeholder:  string
    filters:      FilterOption[]
    filterStates: FilterState
  }>()

  // ********** EMITS **********
  const emit = defineEmits<{
    (e: 'update:search', value: string): void
    (e: 'update:filterStates', value: FilterState): void
  }>()

  // ********** LOCAL STATE **********
  const localSearch       = ref(props.search)
  const localFilterStates = ref({ ...props.filterStates })

  // ********** WATCH **********
  watch(localSearch, (val) => emit('update:search', val))
  watch(localFilterStates, (val) => {
    emit('update:filterStates', { ...val })
  }, { deep: true })


  // ********** RESET **********
  const reset = () => {
    const resetState: FilterState = {}
    localSearch.value = ''
    props.filters.forEach(f => resetState[f.key] = '')
    localFilterStates.value = resetState
  }

  const hasActiveFilters = computed(() => {
    return localSearch.value !== '' || Object.values(localFilterStates.value).some(Boolean)
  })

</script>