import { useLocation, Link as RouterLink }                                from 'react-router'
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText }  from '@mui/material'

// ********** ICONS **********
import DashboardIcon      from '@mui/icons-material/Dashboard'
import DirectionsCarIcon  from '@mui/icons-material/DirectionsCar'
import PeopleIcon         from '@mui/icons-material/People'
import LogoIcon           from '../assets/odipost-logo.png'


const Sidebar = () => {

  // ********** DATA **********
  const { pathname }  = useLocation()
  const drawerWidth   = 180
  const navItems      = [
    { label: 'Dashboard', path: '/',          icon: <DashboardIcon /> },
    { label: 'Vehicles',  path: '/vehicles',  icon: <DirectionsCarIcon /> },
    { label: 'Drivers',   path: '/drivers',   icon: <PeopleIcon /> },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#1B4679',
          color: 'white',
        },
      }}
    >

      {/* ********** LOGO ********** */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 3 }}>
        <img src={LogoIcon} alt="Odipost logo" style={{ height: '50px' }} />
      </Box>

      {/* ********** NAV ********** */}
      <List>
        {navItems.map((item) => {

          const isActive = pathname !== '/' && item.path === '/' ? false : pathname.includes(item.path)

          return (
            <ListItemButton
              key={item.path}
              component={RouterLink}
              to={item.path}
              sx={{
                color: 'white',
                backgroundColor: isActive ? '#163967' : 'inherit',
                '&:hover': {
                  backgroundColor: '#163967',
                  color: 'white',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
        })}
      </List>
      
    </Drawer>
  )
}

export default Sidebar