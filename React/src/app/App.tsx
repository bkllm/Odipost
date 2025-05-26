import { Box }    from '@mui/material'
import AppRoutes  from './Routes'
import Sidebar    from './Sidebar'

const App = () => {
  return (
    <Box sx={{ display: 'flex', padding: '20px 40px' }}>

      {/* ************************ SIDEBAR ************************ */}
      <Sidebar />

      {/* ************************ ROUTES ************************ */}
      <Box sx={{ width: '100%'}}>
        <AppRoutes />
      </Box>

    </Box>
  )
}

export default App