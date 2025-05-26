// ********** COMPONENTS **********
import { Box, Typography, Paper } from '@mui/material'


// ********** PROPS **********
type KPIItem = {
  label: string
  count: number
  color: string
}

type KPIBarProps = {
  items: KPIItem[]
}


// ********** COMPONENT **********
const KPIBar = ({ items }: KPIBarProps) => {

  return (
    // ********** KPI BAR **********
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        p: 2,
        mb: 3,
        flexWrap: 'wrap',
        alignItems: 'center',
        fontSize: 15,
      }}
      elevation={4}
    >
      {/* ******* ITEMS ******* */}
      {items.map(({ label, count, color }) => (
        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          
          {/* ***** COLOR ***** */}
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />
          
          {/* ***** VALUE ***** */}
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {count}
          </Typography>
          
          {/* ***** LABEL ***** */}
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {label}
          </Typography>

        </Box>
      ))}
    </Paper>
  )
}

export default KPIBar