import { useEffect, useState }    from 'react'
import { apiManager }             from '../../api/apiManager'
import type { Vehicle, Location } from '../../models'
import { getStatusColor }         from '../../utils/getStatusColor'

// ********** COMPONENTS **********
import {
  Typography,
  Box,
  Chip,
  Divider,
}                                                 from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapUpdater                                 from './../MapUpdater'
import L                                          from 'leaflet'

// ********** ICONS & ASSETS **********
import carImage     from '../../assets/Car.png'
import vanImage     from '../../assets/Van.png'
import truckImage   from '../../assets/Truck.png'
import carIcon      from '../../assets/icons/Car.png'
import vanIcon      from '../../assets/icons/Van.png'
import truckIcon    from '../../assets/icons/Truck.png'

const vehicleImages: Record<string, string> = {
  Car: carImage,
  Van: vanImage,
  Truck: truckImage,
}

const vehicleIcons: Record<string, L.Icon> = {
  Car: new L.Icon({
    iconUrl: carIcon,
    iconSize: [32, 24],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Van: new L.Icon({
    iconUrl: vanIcon,
    iconSize: [32, 24],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
  Truck: new L.Icon({
    iconUrl: truckIcon,
    iconSize: [32, 24],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  }),
}


// ********** MAP CONFIG **********
const center: [number, number] = [50.85, 4.35] // Bruxelles
const MAPBOX_TOKEN             = import.meta.env.VITE_MAPBOX_TOKEN


// ********** PROPS **********
type Props = { vehicle: Vehicle }


// ********** COMPONENT **********
const VehicleDetails = ({ vehicle }: Props) => {

  // ********** DATA **********
  const [location, setLocation] = useState<Location | null>(null)
  const statusColor             = getStatusColor(vehicle.status)


  // ********** EFFECTS **********
  useEffect(() => {
    const fetchLocation = () => {
      apiManager.location.getVehicleById(vehicle.id)
      .then((res) => setLocation(res.data))
      .catch(console.error)
    }
    fetchLocation()
    const intervalId = setInterval(fetchLocation, 3000)
    return () => clearInterval(intervalId)
  }, [vehicle.id])


  return (
    <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>

      <Box width={{ md: '30%' }}>

        {/* ******************** VEHICLE INFO ******************** */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Vehicle Info
        </Typography>

        <img
          src={vehicleImages[vehicle.type] || truckImage}
          alt="Vehicle"
          style={{
            width: '100%',
            maxHeight: 160,
            objectFit: 'cover',
            borderRadius: 8,
            marginBottom: 16,
          }}
        />

        <Typography><strong>Brand:</strong> {vehicle.brand}</Typography>
        <Typography><strong>Model:</strong> {vehicle.model}</Typography>
        <Typography><strong>Type:</strong> {vehicle.type}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <strong>Status:</strong>&nbsp;<Chip label={vehicle.status} color={statusColor} size="small" />
        </Box>
        
        {/* ***** LOCATION ***** */}
        <Typography sx={{ mt: 1 }}><strong>Last Location:</strong> Brussel</Typography>
        <Typography variant="body2" color="text.secondary">
          {location ? new Date(location.timestamp).toLocaleString() : 'N/A'}
        </Typography>
        

        <Divider sx={{ my: 2 }} />

        
        {/* ******************** VEHICLE INFO ******************** */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Driver Info
        </Typography>

        {vehicle.currentDriver ? (
          <>
            <Typography><strong>Name:</strong> {vehicle.currentDriver.firstName} {vehicle.currentDriver.lastName}</Typography>
            <Typography><strong>Email:</strong> {vehicle.currentDriver.email}</Typography>
            <Typography><strong>Phone:</strong> {vehicle.currentDriver.phone}</Typography>
            <Typography><strong>Status:</strong> {vehicle.currentDriver.status}</Typography>
          </>
        ) : <em style={{ color: '#888' }}>Unassigned</em>}

      </Box>

      <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

      {/* ******************** MAP ******************** */}
      <Box sx={{ flex: 1 }}>

        <Typography variant="h6" fontWeight={600} gutterBottom>
          Location
        </Typography>

        <MapContainer
          center={location ? [location.latitude, location.longitude] : center}
          zoom={12}
          style={{ height: '90%', width: '100%', borderRadius: 8 }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
            attribution='© <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          
          {location && (
            <>
              <MapUpdater position={[location.latitude, location.longitude]} />
              <Marker 
                position={[location.latitude, location.longitude]}
                icon={vehicleIcons[vehicle.type] || vehicleIcons['Truck']}
              >
                <Popup>{vehicle.licensePlate} – {vehicle.brand}</Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      </Box>

    </Box>
  )
}

export default VehicleDetails