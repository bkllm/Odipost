// ********** COMPONENTS **********
import {
  Box,
  Typography,
}                           from '@mui/material'
import DashboardMap         from '../components/dashboard/Map'
import DashboardAlerts      from '../components/dashboard/Alerts'
import ActiveVehiclesChart  from '../components/dashboard/charts/ActiveVehicles'
import VehicleStatusPie     from '../components/dashboard/charts/VehiclesStatus'
import KPICards             from '../components/dashboard/KPICards'

const DashboardPage = () => {

  return (
    <>
      {/* ********** TITLE ********** */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Dashboard
      </Typography>


      {/* ********** KPI CARDS ********** */}
      <KPICards />


      {/* ********** DASHBOARD CONTENT ********** */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >

        {/* ********** LEFT PANEL ********** */}
        <Box flex={1}>

          {/* ***** ACTIVE VEHICLES CHART ***** */}
          <ActiveVehiclesChart />

          {/* ***** VEHICLE STATUS PIE ***** */}
          <VehicleStatusPie />

        </Box>


        {/* ********** RIGHT PANEL ********** */}
        <Box flex={1}>

          {/* ***** ALERTS ***** */}
          <DashboardAlerts />

          {/* ***** MAP ***** */}
          <DashboardMap />

        </Box>

      </Box>
    </>
  )
}

export default DashboardPage