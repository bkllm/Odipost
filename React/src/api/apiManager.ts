import { VehicleManager }   from './managers/vehicle'
import { DriverManager }    from './managers/driver'
import { KPIManager }       from './managers/kpi'
import { LocationManager }  from './managers/location'
import { AlertsManager }    from './managers/alerts'

export const apiManager = {
  vehicles: VehicleManager,
  drivers:  DriverManager,
  kpi:      KPIManager,
  location: LocationManager,
  alerts:   AlertsManager,
}