// Vehicle
export interface VehicleKPI {
  inUseVehicleCount:      number
  availableVehicleCount:  number
}

export interface VehicleStats {
  total:        number
  available:    number
  inUse:        number
  maintenance:  number
  unavailable:  number
}

export interface ActiveVehicle {
  date:     string
  count:    number
}

// Driver
export interface DriverKPI {
  availableDriverCount: number
  drivingDriverCount:   number
}

export interface DriversStats {
  total:        number
  available:    number
  driving:      number
  onLeave:      number
}

// Incident
export interface IncidentKPI {
  openIncidentCount:  number
  incidentsThisMonth: number
}