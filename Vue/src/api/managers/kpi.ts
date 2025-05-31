import HTTP from '../httpClient'
import type { 
  VehicleKPI, 
  DriverKPI, 
  IncidentKPI, 
  VehicleStats, 
  DriversStats,
  ActiveVehicle
} from '../../models/kpi'

// ***** VEHICLES *****
const getVehicleKPI   = async (): Promise<VehicleKPI> => {
  const   res = await HTTP.get('/vehicles/kpi/overview')
  return  res.data
}

const getVehicleStats = async (): Promise<VehicleStats> => {
  const   res = await HTTP.get('/vehicles/kpi/stats')
  return  res.data
}

const getActiveVehiclesDaily = async (): Promise<ActiveVehicle[]> => {
  const res = await HTTP.get('/vehicles/kpi/active-per-day')
  return res.data
}

// ***** DRIVERS *****
const getDriversStats = async (): Promise<DriversStats> => {
  const   res = await HTTP.get('/drivers/kpi/stats')
  return  res.data
}

const getDriverKPI    = async (): Promise<DriverKPI> => {
  const   res = await HTTP.get('/drivers/kpi/overview')
  return  res.data
}

// ***** INCIDENTS *****
const getIncidentKPI  = async (): Promise<IncidentKPI> => {
  const   res = await HTTP.get('/incidents/kpi/overview')
  return  res.data
}

export const KPIManager = {
  // Vehicles
  getVehicleKPI,
  getVehicleStats,
  getActiveVehiclesDaily,

  // Drivers
  getDriverKPI,
  getDriversStats,
  
  // Incidents
  getIncidentKPI,
}
