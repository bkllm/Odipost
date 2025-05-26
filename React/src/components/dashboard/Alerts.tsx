import { useEffect, useState }    from 'react'
import type { DailyAlert }        from '../../models'
import { apiManager }             from '../../api/apiManager'

// ********** COMPONENTS **********
import { 
  Box, 
  Typography, 
  Stack 
} from '@mui/material'


const STATUS_STYLES: Record<DailyAlert['status'], { bg: string; border: string; icon: string }> = {
  warning: {
    bg: '#fff8e1',
    border: '#ffecb3',
    icon: '⚠️',
  },
  error: {
    bg: '#ffebee',
    border: '#ffcdd2',
    icon: '🚫',
  },
  success: {
    bg: '#e8f5e9',
    border: '#c8e6c9',
    icon: '✅',
  },
  info: {
    bg: '#e3f2fd',
    border: '#90caf9',
    icon: 'ℹ️',
  },
}


const DashboardAlerts = () => {

  // ********** DATA **********
  const [alerts, setAlerts] = useState<DailyAlert[]>([])

  // ********** ON MOUNT **********
  useEffect(() => {
    apiManager.alerts.getDailyAlerts()
    .then(setAlerts)
    .catch(console.error)
  }, [])

  return (
    <Box mb={3}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Alerts
      </Typography>

      <Stack spacing={1}>
        {alerts.map((alert, index) => {
          const style = STATUS_STYLES[alert.status]

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: style.bg,
                border: `1px solid ${style.border}`,
                borderRadius: 1,
                px: 2,
                py: 1,
              }}
            >
              <Typography sx={{ fontSize: 18, mr: 1 }}>{style.icon}</Typography>
              <Typography fontSize={14}>{alert.message}</Typography>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default DashboardAlerts