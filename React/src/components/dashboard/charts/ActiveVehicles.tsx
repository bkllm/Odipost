import { useEffect, useState }  from 'react'
import { apiManager }           from '../../../api/apiManager'
import type { ActiveVehicle }   from '../../../models/kpi'

// ********** COMPONENTS **********
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
}                               from 'recharts'
import { Box, Typography }      from '@mui/material'


const ActiveVehiclesChart = () => {

  // ********** STATE **********
  const [data, setData]         = useState<ActiveVehicle[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  // ********** FETCH **********
  useEffect(() => {
    apiManager.kpi.getActiveVehiclesDaily()
    .then((res) => {
      setData(res)
      setLoading(false)
    })
    .catch((err) => {
      console.error(err)
      setError(true)
      setLoading(false)
    })
  }, [])

  return (
    <Box mb={3}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Active Vehicles per Day
      </Typography>

      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 1,
          p: 2,
          height: 240,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : error ? (
          <Typography color="error">Failed to load data</Typography>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                  })
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                name="Active Vehicles"
                type="monotone"
                dataKey="count"
                stroke="#1976d2"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  )
}

export default ActiveVehiclesChart