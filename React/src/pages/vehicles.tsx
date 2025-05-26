import { 
  useEffect,
  useState}                     from 'react'
import { apiManager }           from '../api/apiManager'
import { getStatusColor }       from '../utils/getStatusColor'
import type { Vehicle }         from '../models'
import type { VehicleStats }    from '../models/kpi'
import type { Column }          from '../components/shared/DataTable'

// ********** COMPONENTS **********
import {
  Chip,
  Typography, }                 from '@mui/material'
import VehicleDetails           from '../components/vehicles/Details'
import Modal                    from '../components/shared/Modal'
import KPIBar                   from '../components/shared/KPIBar'
import DataTable                from '../components/shared/DataTable'
import FilterBar                from '../components/shared/FilterBar'



const VehiclesPage = () => {

  // ********** DATA **********
  const [vehicles, setVehicles]         = useState<Vehicle[]>([])
  const [selectedVehicle, setVehicle]   = useState<Vehicle | null>(null)
  const [kpi, setKpi]                   = useState<VehicleStats>({} as VehicleStats)
  const [totalPages, setTotalPages]     = useState(1)
  const [pageSize, setPageSize]         = useState(20)
  const [page, setPage]                 = useState(1)
  const [modalOpen, setModalOpen]       = useState(false)

  // Table
  const columns: Column<Vehicle>[]      = [
    { label: 'ID',             key: 'id',            sortable: true },
    { label: 'License plate',  key: 'licensePlate',  sortable: true },
    { label: 'Brand',          key: 'brand',         sortable: true },
    { label: 'Type',           key: 'type',          sortable: true },
    {
      label: 'Current driver',
      key: 'currentDriver' as keyof Vehicle,
      render: (v: Vehicle) =>
        v.currentDriver
          ? `${v.currentDriver.firstName} ${v.currentDriver.lastName}`
          : <em style={{ color: '#888' }}>Unassigned</em>,
    },
    {
      label: 'Status',
      key: 'status',
      sortable: true,
      render: (v: Vehicle) => <Chip label={v.status} color={getStatusColor(v.status)} size="small" />,
    },
  ]

  // Filters
  const [searchTerm, setSearchTerm]                   = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [filters, setFilters]                         = useState({
    status: '',
    brand:  '',
    type:   '',
  })
  const FILTERS                                       = [
    {
      label:    'Status',
      state:    filters.status,
      setState: (val: string) => setFilters(prev => ({ ...prev, status: val })),
      options:  ['Available', 'InUse', 'Maintenance', 'Unavailable'],
    },
    {
      label:    'Brand',
      state:    filters.brand,
      setState: (val: string) => setFilters(prev => ({ ...prev, brand: val })),
      options:  ['Volvo', 'Mercedes', 'DAF', 'Scania', 'MAN', 'Iveco'],
    },
    {
      label:    'Type',
      state:    filters.type,
      setState: (val: string) => setFilters(prev => ({ ...prev, type: val })),
      options:  ['Truck', 'Van', 'Car'],
    },
  ]


  // ********** HOOKS **********
  // On mount
  useEffect(() => {
    apiManager.kpi.getVehicleStats()
    .then(setKpi)
    .catch(console.error)
  }, [])

  // Debounce search term
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchTerm])

  // Fetch vehicles
  useEffect(() => {
    apiManager.vehicles.getAll(page, pageSize, debouncedSearchTerm, filters.status, filters.brand, filters.type)
    .then((res) => {
      setVehicles(res.data)      
      setTotalPages(res.totalPages)
    })
    .catch(console.error)
  }, [page, pageSize, debouncedSearchTerm, filters.status, filters.brand, filters.type])



  // ********** RENDER **********
  return (
    <>
      
      {/* ******************** TITLE ******************** */}
      <Typography variant="h4" fontWeight={600} mb={2} gutterBottom>
        Vehicles
      </Typography>


      {/* ******************** KPI STATS ******************** */}
      <KPIBar
        items={[
          { label: 'Vehicles',     count: kpi.total,        color: '#2F2F2F' },
          { label: 'Available',    count: kpi.available,    color: '#4caf50' },
          { label: 'In Use',       count: kpi.inUse,        color: '#f44336' },
          { label: 'Maintenance',  count: kpi.maintenance,  color: '#ff9800' },
          { label: 'Unavailable',  count: kpi.unavailable,  color: '#6c757d' },
        ]}
      />


      {/* ******************** SEARCH & FILTERS ******************** */}
      <FilterBar
        searchTerm={searchTerm}
        searchPlaceHolder='Search by ID, licenseplate or driver'
        setSearchTerm={(val) => {
          setSearchTerm(val)
          setPage(1)
        }}
        filters={FILTERS.map((f) => ({
          label: f.label,
          state: f.state,
          setState: (val: string) => {
            f.setState(val)
            setPage(1)
          },
          options: f.options,
        }))}
        onReset={() => {
          setSearchTerm('')
          setFilters({ status: '', brand: '', type: '' })
          setPage(1)
        }}
      />


      {/* ******************** TABLE ******************** */}
      <DataTable
        columns={columns}
        rows={vehicles}
        totalPages={totalPages}
        page={page}
        pageSize={pageSize}
        onPageChange={(value) => setPage(value)}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
        onRowClick={(vehicle) => {
          setVehicle(vehicle)
          setModalOpen(true)
        }}
      />


      {/* ******************** VEHICLE DETAILS MODAL ******************** */}
      {selectedVehicle && (
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setVehicle(null)
          }}
          title={`${selectedVehicle.licensePlate} – ${selectedVehicle.brand}`}
          maxWidth="lg"
        >
          <VehicleDetails vehicle={selectedVehicle} />
        </Modal>
      )}

    </>
  )
}

export default VehiclesPage