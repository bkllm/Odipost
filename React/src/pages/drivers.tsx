import { 
  useEffect,
  useState}                     from 'react'
import { apiManager }           from '../api/apiManager'
import { getStatusColor }       from '../utils/getStatusColor'
import type { DriversStats }    from '../models/kpi'
import type { Driver }          from '../models/'
import type { Column }          from '../components/shared/DataTable'

// ********** COMPONENTS **********
import {
  Chip,
  Typography, }                 from '@mui/material'
import KPIBar                   from '../components/shared/KPIBar'
import DataTable                from '../components/shared/DataTable'
import FilterBar                from '../components/shared/FilterBar'
import DriverDetails            from '../components/drivers/Details'
import Modal                    from '../components/shared/Modal'



const DriversPage = () => {

  // ********** DATA **********
  const [drivers, setDrivers]           = useState<Driver[]>([])
  const [kpi, setKpi]                   = useState<DriversStats>({} as DriversStats)
  const [selectedDriver, setDriver]     = useState<Driver | null>(null)
  const [modalOpen, setModalOpen]       = useState(false)

  // Page
  const [totalPages, setTotalPages]     = useState(1)
  const [pageSize, setPageSize]         = useState(20)
  const [page, setPage]                 = useState(1)

  // Filters
  const [searchTerm, setSearchTerm]                   = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm)
  const [filters, setFilters]                         = useState({ status: '' })
  const FILTERS                                       = [
    {
      label:    'Status',
      state:    filters.status,
      setState: (val: string) => setFilters(prev => ({ ...prev, status: val })),
      options:  ['Available', 'Driving', 'OnLeave'],
    },
  ]

  // Table
  const columns: Column<Driver>[]       = [
    { label: 'ID',          key: 'id',        sortable: true },
    { label: 'First Name',  key: 'firstName', sortable: true },
    { label: 'Last Name',   key: 'lastName',  sortable: true },
    {
      label:  'Contact',
      key:    'email',
      render: (d: Driver) => (
        <>
          <Typography>{d.email}</Typography>
          <Typography variant="caption" sx={{ color: 'gray' }}>{d.phone}</Typography>
        </>
      ),
    },
    {
      label:  'Address',
      key:    'address',
      render: (d: Driver) => (
      <>
        <Typography>{d.address}</Typography>
        <Typography variant="caption" sx={{ color: 'gray' }}>
          {d.postalCode} {d.city}
        </Typography>
      </>
      ),
    },
    { 
      label:    'Status',
      key:      'status',
      sortable: true,
      render:   (d: Driver) => <Chip label={d.status} color={getStatusColor(d.status)} size="small" />,
    },
  ]


  // ********** HOOKS **********
  // On mount
  useEffect(() => {
    apiManager.kpi.getDriversStats()
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
    apiManager.drivers.getAll(page, pageSize, debouncedSearchTerm, filters.status)
    .then((res) => {
      setDrivers(res.data)      
      setTotalPages(res.totalPages)
    })
    .catch(console.error)
  }, [page, pageSize, debouncedSearchTerm, filters.status])


  // ********** RENDER **********
  return (
    <>
      
      {/* ******************** TITLE ******************** */}
      <Typography variant="h4" fontWeight={600} mb={2} gutterBottom>
        Drivers
      </Typography>


      {/* ******************** KPI STATS ******************** */}
      <KPIBar
        items={[
          { label: 'Drivers',   count: kpi.total,      color: '#2F2F2F' },
          { label: 'Available', count: kpi.available,  color: '#4caf50' },
          { label: 'Driving',   count: kpi.driving,    color: '#f44336' },
          { label: 'On leave',  count: kpi.onLeave,    color: '#6c757d' },
        ]}
      />


      {/* ******************** SEARCH & FILTERS ******************** */}
      <FilterBar
        searchTerm={searchTerm}
        searchPlaceHolder='Search by name, email, phone or address'
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
          setFilters({ status: '' })
          setPage(1)
        }}
      />


      {/* ******************** TABLE ******************** */}
      <DataTable
        columns={columns}
        rows={drivers}
        totalPages={totalPages}
        page={page}
        pageSize={pageSize}
        onPageChange={(value) => setPage(value)}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
        onRowClick={(driver) => {
          setDriver(driver)
          setModalOpen(true)
        }}
      />


      {/* ******************** DRIVER DETAILS MODAL ******************** */}
      {selectedDriver && (
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false)
            setDriver(null)
          }}
          title={`${selectedDriver.firstName} ${selectedDriver.lastName}`}
          maxWidth="sm"
        >
          <DriverDetails driver={selectedDriver} />
        </Modal>
      )}

    </>
  )
}

export default DriversPage