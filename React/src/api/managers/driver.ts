import HTTP                         from '../httpClient'
import type { Driver }              from '../../models'
import type { PaginatedResponse }   from '../../models/response'

// ******************   GET   ****************** 
const getAll = async (
  page:     number = 1,
  pageSize: number = 20,
  q?:       string,
  status?:  string, 
): Promise<PaginatedResponse<Driver>> => {

  // Params
  const queryParams = new URLSearchParams()

  queryParams.append('page', String(page))
  queryParams.append('pageSize', String(pageSize))

  if (q)      queryParams.append('q', q)
  if (status) queryParams.append('status', status)

  // Fetch
  const   res = await HTTP.get<PaginatedResponse<Driver>>(`/Drivers?${queryParams.toString()}`)
  return  res.data
}

export const DriverManager = {
  getAll,
}