import HTTP from '../httpClient'
import type {
  DailyAlert
} from '../../models/'

// Vehicles KPI
const getDailyAlerts   = async (): Promise<DailyAlert[]> => {
  const   res = await HTTP.get('/alerts/daily')
  return  res.data
}

export const AlertsManager = {
  getDailyAlerts
}
