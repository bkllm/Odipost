import type { Driver }    from '../../models'
import { getStatusColor } from '../../utils/getStatusColor'

// ********** COMPONENTS **********
import {
  Box,
  Typography,
  Divider,
  Chip,
  Avatar,
  Stack,
}                 from '@mui/material'
import AvatarImg  from '../../assets/avatar.png'


// ********** PROPS **********
type Props = {
  driver: Driver
}


const DriverDetails = ({ driver }: Props) => {

  // ********** DATA **********
  const statusColor = getStatusColor(driver.status)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 3,
      }}
    >

      {/* ******************** LEFT PANEL ******************** */}
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', minWidth: 250 }}>

        {/* ********** PROFILE IMAGE ********** */}
        <Avatar
          src={AvatarImg}
          alt="Driver"
          sx={{ width: 100, height: 100, borderRadius: 2 }}
        />


        {/* ********** DRIVER INFO ********** */}
        <Stack spacing={0.5}>
          <Typography variant="body2">
            <strong>Email:</strong> {driver.email}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> {driver.phone}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <strong>Status:</strong>&nbsp;
            <Chip label={driver.status} color={statusColor} size="small" />
          </Box>
        </Stack>

      </Box>


      {/* ******************** VERTICAL DIVIDER ******************** */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: 'none', md: 'block' } }}
      />


      {/* ******************** RIGHT PANEL ******************** */}
      <Box flex={1}>

        {/* ********** ADDRESS ********** */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Address
        </Typography>

        <Typography>
          {driver.address}, {driver.postalCode} {driver.city}
        </Typography>

        {/* Tu peux ajouter d'autres infos ici si nécessaire */}

      </Box>

    </Box>
  )
}

export default DriverDetails