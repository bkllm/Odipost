import HTTP                         from '../httpClient'
import type { Vehicle }             from '../../models'
import type { PaginatedResponse }   from '../../models/response'

// ******************   GET   ****************** 
const getAll = async (
  page:     number = 1,
  pageSize: number = 20,
  q?:       string, 
  status?:  string, 
  brand?:   string, 
  type?:    string
): Promise<PaginatedResponse<Vehicle>> => {

  // Params
  const queryParams = new URLSearchParams()

  queryParams.append('page', String(page))
  queryParams.append('pageSize', String(pageSize))

  if (q)      queryParams.append('q', q)
  if (status) queryParams.append('status', status)
  if (brand)  queryParams.append('brand', brand)
  if (type)   queryParams.append('type', type)

  const   res = await HTTP.get<PaginatedResponse<Vehicle>>(`/Vehicles?${queryParams.toString()}`)
  return  res.data
}

export const VehicleManager = {
  getAll,
}