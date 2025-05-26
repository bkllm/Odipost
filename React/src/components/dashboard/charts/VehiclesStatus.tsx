import { useEffect, useState }  from 'react'
import { apiManager }           from '../../../api/apiManager'
import type { VehicleStats }    from '../../../models/kpi'

// ********** COMPONENTS **********
import {
  PieChart, Pie, Cell,
  Tooltip, Legend,
  ResponsiveContainer
}                               from 'recharts'
import { Box, Typography }      from '@mui/material'


// ********** COLORS **********
const STATUS_COLORS: Record<string, string> = {
  Available:    '#4caf50',
  InUse:        '#f44336',
  Maintenance:  '#ff9800',
  Unavailable:  '#6c757d',
}

type PieDataPoint = { 
  name:   string 
  value:  number 
}

const VehicleStatusPie = () => {

  // ********** STATE **********
  const [data, setData]       = useState<PieDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  // ********** FETCH **********
  useEffect(() => {
    apiManager.kpi.getVehicleStats()
      .then((stats: VehicleStats) => {
        const formatted = [
          { name: 'Available', value: stats.available },
          { name: 'InUse', value: stats.inUse },
          { name: 'Maintenance', value: stats.maintenance },
          { name: 'Unavailable', value: stats.unavailable },
        ]
        setData(formatted)
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
        Vehicle Status Overview
      </Typography>

      <Box sx={{
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
        height: 240,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {loading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : error ? (
          <Typography color="error">Failed to load data</Typography>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name] || '#999'}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  )
}

export default VehicleStatusPie