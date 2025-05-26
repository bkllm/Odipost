import HTTP                   from '../httpClient'
import type { Location }      from '../../models'
import type { ApiResponse }   from '../../models/response'

// ******************   GET   ****************** 
const getAll = async (): Promise<Location[]> => {
  const   res = await HTTP.get<Location[]>(`/VehicleLocations/simulate/all`)
  return  res.data
}

const getVehicleById = async (vehicleId: number): Promise<ApiResponse<Location>> => {
  const   res = await HTTP.get<ApiResponse<Location>>(`/VehicleLocations/simulate/${vehicleId}`)
  return  res.data
}

export const LocationManager = {
  getAll,
  getVehicleById,
}