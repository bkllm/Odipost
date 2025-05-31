export type AlertStatus = 'success' | 'warning' | 'error' | 'info'

export interface DailyAlert {
  message:  string
  status:   AlertStatus
}

export interface Driver {
  id:             number
  firstName:      string
  lastName:       string
  email:          string
  phone:          string
  status:         string
  address:        string
  postalCode:     string
  city:           string
}

export interface Vehicle {
  id:             number
  licensePlate:   string
  brand:          string
  model:          string
  type:           string
  status:         string
  currentDriver:  Driver
}

export interface Incident {
  id:       number
  type:     string
  status:   string
  date:     string
  vehicle:  Vehicle
  driver?:  Driver
}

export interface Location {
  vehicleId:      number
  licensePlate:   string
  brand:          string
  type:           string
  driverName:     string
  latitude:       number
  longitude:      number
  timestamp:      string
}