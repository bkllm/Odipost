<template>
  <div>

    <!-- ********************** TITLE ********************** -->
    <h1 class="text-h4 font-weight-bold mb-6">Vehicles</h1>

    
    <!-- ******************** KPI STATS ******************** -->
    <KPIBar :items="kpiItems" class="mb-6" />


    <!-- ******************** SEARCH & FILTERS ******************** -->
    <FilterBar
      :filters="filterOptions"
      placeholder="Search by ID, licenseplate or driver"
      v-model:search="searchTerm"
      v-model:filterStates="filters"
    />

    
    <!-- ******************** TABLE ******************** -->
    <DataTable
      :columns="columns"
      :rows="vehicles"
      :total-pages="totalPages"
      :page="page"
      :page-size="pageSize"
      @page-change="setPage"
      @page-size-change="setPageSize"
      @row-click="onRowClick"
    />

    
    <!-- ******************** VEHICLE MODAL ******************** -->
    <Modal
      v-if="selectedVehicle"
      :open="modalOpen"
      :title="`${selectedVehicle?.licensePlate} – ${selectedVehicle?.brand}`"
      maxWidth="1200"
      @close="() => { modalOpen = false; selectedVehicle = null }"
    >
      <Details :vehicle="selectedVehicle" />
    </Modal>

  </div>
</template>



<!-- ********************** SCRIPT ********************** -->
<!-- ********************** SCRIPT ********************** -->
<script setup lang="ts">

  // ********** IMPORTS **********
  import { 
    ref, h,
    onMounted, 
    computed, 
    watch 
  }                             from 'vue'
  import { API }                from '@/api/'
  import type { Vehicle }       from '@/models/'
  import type { VehicleStats }  from '@/models/kpi'
  import type { Column }        from '@/components/shared/DataTable.vue'
  import type { FilterOption }  from '@/components/shared/FilterBar.vue'
  import type { FilterState }   from '@/components/shared/FilterBar.vue'
  
  // ********** COMPONENTS **********
  import KPIBar                 from '@/components/shared/KPIBar.vue'
  import FilterBar              from '@/components/shared/FilterBar.vue'
  import StatusChip             from '@/components/shared/StatusChip.vue'
  import DataTable              from '@/components/shared/DataTable.vue'
  import Modal                  from '@/components/shared/Modal.vue'
  import Details                from '@/components/vehicles/Details.vue'


  // ********** KPI BAR **********
  const KPI             = ref<VehicleStats>({} as VehicleStats)
  const kpiItems        = computed(() => [
    { label: 'Vehicles',     count: KPI.value.total,       color: '#2F2F2F' },
    { label: 'Available',    count: KPI.value.available,   color: '#4caf50' },
    { label: 'In Use',       count: KPI.value.inUse,       color: '#f44336' },
    { label: 'Maintenance',  count: KPI.value.maintenance, color: '#ff9800' },
    { label: 'Unavailable',  count: KPI.value.unavailable, color: '#6c757d' },
  ])

  // ********** FILTERS **********
  let debounceTimer: any
  const searchTerm          = ref('')
  const debouncedSearchTerm = ref('')
  const filters             = ref({ status: '', brand: '', type: '', })
  const filterOptions: FilterOption[] = [
    { label: 'Status', key: 'status' as keyof FilterState, options: ['Available', 'InUse', 'Maintenance', 'Unavailable'] },
    { label: 'Brand',  key: 'brand'  as keyof FilterState, options: ['Volvo', 'Mercedes', 'DAF', 'Scania', 'MAN', 'Iveco'] },
    { label: 'Type',   key: 'type'   as keyof FilterState, options: ['Truck', 'Van', 'Car'] },
  ]

  // ********** TABLE **********
  const vehicles        = ref<Vehicle[]>([])
  const selectedVehicle = ref<Vehicle | null>(null)
  const modalOpen       = ref(false)
  const columns         = ref<Column<Vehicle>[]>([
    { label: 'ID',            key: 'id',           sortable: true },
    { label: 'License plate', key: 'licensePlate', sortable: true },
    { label: 'Brand',         key: 'brand',        sortable: true },
    { label: 'Type',          key: 'type',         sortable: true },
    {
      label: 'Current driver',
      key: 'currentDriver',
      render: (v: Vehicle) => v.currentDriver
        ? `${v.currentDriver.firstName} ${v.currentDriver.lastName}`
        : 'Unassigned',
    },
    {
      label: 'Status',
      key: 'status',
      sortable: true,
      render: (v: Vehicle) => h(StatusChip, { status: v.status })
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

  const onRowClick = (vehicle: Vehicle) => {
    // Start performance measurement for map load
    performance.mark('map-start')

    selectedVehicle.value = vehicle
    modalOpen.value = true
  }

  // Fetch
  const fetchVehicles = () => {
    API.vehicles.getAll(
      page.value,
      pageSize.value,
      debouncedSearchTerm.value,
      filters.value.status,
      filters.value.brand,
      filters.value.type
    )
    .then((res) => {
      vehicles.value = res.data
      totalPages.value = res.totalPages
    })
    .catch(console.error)
  }


  // ********** HOOKS **********
  onMounted(async () => {
    
    try {
      KPI.value = await API.kpi.getVehicleStats()
    } catch (e) {
      console.error(e)
    }
    
    fetchVehicles()
  })

  // ********** WATCH **********
  watch(searchTerm, (val) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debouncedSearchTerm.value = val
      fetchVehicles();
    }, 300)
  })

  watch([page, pageSize], fetchVehicles)

  watch(
    () => [filters.value.status, filters.value.brand, filters.value.type],
    () => {
      if (page.value !== 1) {
        page.value = 1
      } else {
        fetchVehicles()
      }
    }
  )

</script>


<!-- ********************** STYLES ********************** -->
<!-- ********************** STYLES ********************** -->
<style scoped lang="scss">


</style>