<template>
  <div>

    <!-- ********************** TITLE ********************** -->
    <h1 class="text-h4 font-weight-bold mb-6">Drivers</h1>

    
    <!-- ******************** KPI STATS ******************** -->
    <KPIBar :items="kpiItems" class="mb-6" />


    <!-- ******************** SEARCH & FILTERS ******************** -->
    <FilterBar
      :filters="filterOptions"
      placeholder="Search by name, email, phone or address"
      v-model:search="searchTerm"
      v-model:filterStates="filters"
    />

    
    <!-- ******************** TABLE ******************** -->
    <DataTable
      :columns="columns"
      :rows="drivers"
      :total-pages="totalPages"
      :page="page"
      :page-size="pageSize"
      @page-change="setPage"
      @page-size-change="setPageSize"
      @row-click="onRowClick"
    />

    
    <!-- ******************** VEHICLE MODAL ******************** -->
    <Modal
      v-if="selectedDriver"
      :open="modalOpen"
      :title="`${selectedDriver.firstName} ${selectedDriver.lastName}`"
      maxWidth="600"
      @close="() => { modalOpen = false; selectedDriver = null }"
    >
      <Details :driver="selectedDriver" />
    </Modal>

  </div>
</template>



<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import { 
    ref, h,
    Fragment,
    onMounted, 
    computed, 
    watch 
  }                             from 'vue'
  import { API }                from '@/api/'
  import type { Driver }        from '@/models/'
  import type { DriversStats }  from '@/models/kpi'
  import type { Column }        from '@/components/shared/DataTable.vue'
  import type { FilterOption }  from '@/components/shared/FilterBar.vue'
  import type { FilterState }   from '@/components/shared/FilterBar.vue'
  
  // ********** COMPONENTS **********
  import KPIBar                 from '@/components/shared/KPIBar.vue'
  import FilterBar              from '@/components/shared/FilterBar.vue'
  import StatusChip             from '@/components/shared/StatusChip.vue'
  import DataTable              from '@/components/shared/DataTable.vue'
  import Modal                  from '@/components/shared/Modal.vue'
  import Details                from '@/components/drivers/Details.vue'


  // ********** KPI BAR **********
  const KPI             = ref<DriversStats>({} as DriversStats)
  const kpiItems        = computed(() => [
    { label: 'Vehicles',      count: KPI.value.total,       color: '#2F2F2F' },
    { label: 'Available',     count: KPI.value.available,   color: '#4caf50' },
    { label: 'Driving',       count: KPI.value.driving,     color: '#f44336' },
    { label: 'On leave',      count: KPI.value.onLeave,     color: '#6c757d' },
  ])

  // ********** FILTERS **********
  let debounceTimer: any
  const searchTerm                    = ref('')
  const debouncedSearchTerm           = ref('')
  const filters                       = ref({ status: '' })
  const filterOptions: FilterOption[] = [
    { label: 'Status', key: 'status' as keyof FilterState, options: ['Available', 'Driving', 'OnLeave'] },
  ]

  // ********** TABLE **********
  const drivers         = ref<Driver[]>([])
  const selectedDriver  = ref<Driver | null>(null)
  const modalOpen       = ref(false)
  const columns         = ref<Column<Driver>[]>([
    { label: 'ID',            key: 'id',            sortable: true },
    { label: 'First Name',    key: 'firstName',     sortable: true },
    { label: 'Last Name',     key: 'lastName',      sortable: true },
    {
      label:  'Contact',
      key:    'email',
      render: (d: Driver) =>
        h(Fragment, {}, [
          h('div', d.email),
          h('div', { class: 'text-grey text-body-1' }, d.phone),
        ]),
    },
    {
      label: 'Address',
      key: 'address',
      render: (d: Driver) =>
        h(Fragment, {}, [
          h('div', d.address),
          h('div', { class: 'text-grey text-caption' }, `${d.postalCode} ${d.city}`),
        ]),
    },
    {
      label:      'Status',
      key:        'status',
      sortable:   true,
      render:     (d: Driver) => h(StatusChip, { status: d.status, key: d.id })
    }
  ])
  
  // ********** PAGINATION **********
  const page            = ref(1)
  const pageSize        = ref(20)
  const totalPages      = ref(1)


  // ********** METHODS **********
  const setPage = (value: number) => (page.value = value)

  const setPageSize = (value: number) => {
    pageSize.value = value
    page.value = 1
  }

  const onRowClick = (vehicle: Driver) => {
    selectedDriver.value = vehicle
    modalOpen.value = true
  }

  // Fetch
  const fetchDrivers = () => {
    API.drivers.getAll(
      page.value,
      pageSize.value,
      debouncedSearchTerm.value,
      filters.value.status,
    )
    .then((res) => {
      drivers.value = res.data
      totalPages.value = res.totalPages
    })
    .catch(console.error)
  }


  // ********** HOOKS **********
  onMounted(async () => {
    
    try {
      KPI.value = await API.kpi.getDriversStats();
    } catch (e) {
      console.error(e)
    }
    
    fetchDrivers()
  })

  // ********** WATCH **********
  watch(searchTerm, (val) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debouncedSearchTerm.value = val
      fetchDrivers();
    }, 300)
  })

  watch([page, pageSize], fetchDrivers)

  watch(
    () => [filters.value.status],
    () => {
      if (page.value !== 1) {
        page.value = 1
      } else {
        fetchDrivers()
      }
    }
  )

</script>