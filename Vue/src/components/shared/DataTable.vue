<template>

  <!-- ******************** TABLE ******************** -->
  <v-sheet elevation="4" class="pa-0 rounded-lg mb-10" style="height: 56vh; overflow-y: auto;">
    <v-table density="compact" fixed-header height="100%" :hover="true">
      
      <!-- ********** TABLE HEAD ********** -->
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="String(col.key)"
            class="text-left"
            @click="col.sortable ? handleSort(col.key as string) : null"
            style="cursor: pointer;"
          >
            <span class="font-weight-bold">
              {{ col.label }}
              <v-icon
                v-if="col.sortable"
                size="16"
                class="ml-1"
              >
                {{
                  sortKey === col.key
                    ? (sortOrder === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down')
                    : 'mdi-chevron-up'
                }}
              </v-icon>
            </span>
          </th>
        </tr>
      </thead>

      <!-- ********** TABLE BODY ********** -->
      <tbody>
        <tr
          v-for="(row, index) in sortedRows"
          :key="index"
          @click="emitRowClick(row)"
          style="cursor: pointer;"
        >
          <td v-for="col in columns" :key="`${String(col.key)}-${row[col.key]}`">

            <template v-if="col.render">
              <component
                v-if="isVNode(col.render(row))"
                :is="col.render(row)"
              />
              <span v-else>
                {{ col.render(row) }}
              </span>
            </template>

            <span v-else>
              {{ row[col.key] }}
            </span>
          </td>
        </tr>

        <!-- ********** NO RESULTS ********** -->
        <tr v-if="sortedRows.length === 0">
          <td :colspan="columns.length" class="text-center py-6 text-grey">
            <v-icon size="40" class="mb-2">
              mdi-magnify-close
            </v-icon>
            <div class="text-subtitle-1">No results found.</div>
          </td>
        </tr>
      </tbody>

    </v-table>
  </v-sheet>

  
  <!-- ******************** PAGINATION ******************** -->
  <div class="d-flex align-center justify-center position-relative">

    <!-- ********** PAGES ********** -->
    <v-pagination
      v-model="localPage"
      :length="totalPages"
      :total-visible="6"
      rounded="circle"
      size="small"
      active-color="primary"
      variant="elevated"
    />

    <!-- ********** ROWS ********** -->
    <div style="position: absolute; right: 0;">
      <v-select
        v-model="localPageSize"
        label="Rows per page"
        :items="[10, 20, 30, 50]"
        color="primary"
        density="compact"
        variant="outlined"
        style="width: 130px;"
      />
    </div>

  </div>

</template>



<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  import { ref, computed, watch, isVNode } from 'vue'

  // ********** TYPES **********
  export type Column<T> = {
    label: string
    key: keyof T
    sortable?: boolean
    render?: (row: T) => any
  }

  // ********** PROPS **********
  const props = defineProps<{
    columns:  Column<any>[]
    rows: any[]
    totalPages: number
    page: number
    pageSize: number
  }>()

  // ********** EMITS **********
  const emit = defineEmits<{
    (e: 'page-change', val: number): void
    (e: 'page-size-change', val: number): void
    (e: 'row-click', row: any): void
  }>()

  
  // ********** SORT **********
  const sortKey     = ref<string | null>(null)
  const sortOrder   = ref<'asc' | 'desc'>('asc')

  const handleSort  = (key: string) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  const sortedRows = computed(() => {
    if (!sortKey.value) return props.rows
    return [...props.rows].sort((a, b) => {
      const aVal = a[sortKey.value as string]
      const bVal = b[sortKey.value as string]
      if (typeof aVal === 'string') {
        return sortOrder.value === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      if (typeof aVal === 'number') {
        return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal
      }
      return 0
    })
  })

  // ********** PAGINATION **********
  const localPage     = ref(props.page)
  const localPageSize = ref(props.pageSize)
  
  watch(
    () => props.page,
    (val) => localPage.value = val
  )
  watch(localPage, (val) => emit('page-change', val))
  watch(localPageSize, (val) => {
    emit('page-size-change', val)
    localPage.value = 1
  })

  // ********** ROW CLICK **********
  const emitRowClick = (row: any) => {
    emit('row-click', row)
  }

</script>

<style scoped>

  th {
    white-space: nowrap;
  }

</style>