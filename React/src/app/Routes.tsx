import { Routes, Route }  from 'react-router'
import DashboardPage      from '../pages/dashboard'
import VehiclesPage       from '../pages/vehicles'
import DriversPage        from '../pages/drivers'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"         element={<DashboardPage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/drivers"  element={<DriversPage />} />
    </Routes>
  )
}

export default AppRoutes