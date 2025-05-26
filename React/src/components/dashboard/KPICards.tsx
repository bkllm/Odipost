import { 
  useEffect,
  useState 
}                     from 'react'
import type { 
  VehicleKPI, 
  DriverKPI, 
  IncidentKPI 
}                     from '../../models/kpi'
import { apiManager } from '../../api/apiManager'

// ********** COMPONENTS **********
import {
  Box,
  Paper,
  Typography,
  Skeleton,
} from '@mui/material'


// ********** ICONS **********
const iconMap: Record<string, string> = {
  'In Use Vehicles':      '🚛',
  'Available Vehicles':   '🟢',
  'Drivers Driving':      '🧑‍✈️',
  'Available Drivers':    '🟢',
  'Open Incidents':       '🚨',
  'Incidents This Month': '📊',
}


const KPICards = () => {
  // ********** DATA **********
  const [vehicle, setVehicle]   = useState<VehicleKPI | null>(null)
  const [driver, setDriver]     = useState<DriverKPI | null>(null)
  const [incident, setIncident] = useState<IncidentKPI | null>(null)
  const [loading, setLoading]   = useState(true)
  const cards                   = [
    { label: 'In Use Vehicles',        value: vehicle?.inUseVehicleCount },
    { label: 'Available Vehicles',     value: vehicle?.availableVehicleCount },
    { label: 'Drivers Driving',        value: driver?.drivingDriverCount },
    { label: 'Available Drivers',      value: driver?.availableDriverCount },
    { label: 'Open Incidents',         value: incident?.openIncidentCount },
    { label: 'Incidents This Month',   value: incident?.incidentsThisMonth },
  ]

  // ********** ON MOUNT **********
  useEffect(() => {
    Promise.all([
      apiManager.kpi.getVehicleKPI(),
      apiManager.kpi.getDriverKPI(),
      apiManager.kpi.getIncidentKPI(),
    ])
    .then(([v, d, i]) => {
      setVehicle(v)
      setDriver(d)
      setIncident(i)
      setLoading(false)
    })
    .catch((err) => {
      console.error('KPI fetch failed:', err)
      setLoading(false)
    })
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        mb: 3,
        overflowX: 'auto',
        p: 1,
      }}
    >
      {cards.map((card, idx) => (
        <Paper
          key={idx}
          elevation={3}
          sx={{
            minWidth: 170,
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            lineHeight: 1.2,
            flexShrink: 0,
          }}
        >
          {loading ? (
            <>
              <Skeleton width={30} height={30} />
              <Skeleton width="80%" />
            </>
          ) : (
            <>
              <Typography variant="h6" fontWeight={600}>
                {card.value ?? '-'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {iconMap[card.label]} {card.label}
              </Typography>
            </>
          )}
        </Paper>
      ))}
    </Box>
  )
}

export default KPICards