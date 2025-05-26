import { 
  useEffect, 
  useState, 
  useRef 
}                                 from 'react'
import { apiManager }             from '../../api/apiManager'
import type { Location }          from '../../models'
import type { Map as LeafletMap } from 'leaflet'

// ********** COMPONENTS **********
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
}                 from 'react-leaflet'
import {
  Box,
  Typography }    from '@mui/material'
import L          from 'leaflet'

// ********** ICONS **********
import truckIcon  from '../../assets/icons/truck.png'
import vanIcon    from '../../assets/icons/van.png'
import carIcon    from '../../assets/icons/car.png'

const vehicleIcons: Record<string, L.Icon> = {
  Truck: new L.Icon({
    iconUrl:      truckIcon,
    iconSize:     [32, 24],
    iconAnchor:   [16, 32],
    popupAnchor:  [0, -32],
  }),
  Van: new L.Icon({
    iconUrl:      vanIcon,
    iconSize:     [32, 20],
    iconAnchor:   [16, 32],
    popupAnchor:  [0, -32],
  }),
  Car: new L.Icon({
    iconUrl:      carIcon,
    iconSize:     [32, 20],
    iconAnchor:   [16, 32],
    popupAnchor:  [0, -32],
  }),
}


// ********** MAP CONFIG **********
const center: [number, number] = [50.85, 4.35] // Bruxelles
const MAPBOX_TOKEN             = import.meta.env.VITE_MAPBOX_TOKEN
const SetMapRef                = ({ mapRef }: { mapRef: React.RefObject<L.Map | null> }) => {
  const map = useMap()

  useEffect(() => {
    mapRef.current = map
  }, [map])

  return null
}



const DashboardMap = () => {

  // ********** DATA **********
  const [vehicles, setVehicles] = useState<Location[]>([])
  const mapRef                  = useRef<LeafletMap | null>(null)

  // ********** EFFECTS **********
  useEffect(() => {
    const fetchData = () => {
      apiManager.location.getAll()
      .then(setVehicles)
      .catch(console.error)
    }

    fetchData()
    const intervalId = setInterval(fetchData, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      {/* ********** TITLE ********** */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Map
      </Typography>

      <Box
        sx={{
          height: 300,
          minWidth: '40%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 2,
        }}
      >
        
        <MapContainer
          center={center}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <SetMapRef mapRef={mapRef} />

          <TileLayer
            attribution='© <a href="https://www.mapbox.com/">Mapbox</a>'
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
            tileSize={512}
            zoomOffset={-1}
          />

          {/* ********** MARKERS ********** */}
          {vehicles && vehicles.map((v) => (
            <Marker
              key={v.vehicleId}
              position={[v.latitude, v.longitude]}
              icon={vehicleIcons[v.type] || vehicleIcons['Truck']}
              eventHandlers={{
                click: () => {
                  if (mapRef.current) {
                    mapRef.current.flyTo([v.latitude, v.longitude], 14, {
                      duration: 1.5,
                    })
                  }
                }
              }}
            >
              {/* ***** POPUP ***** */}
              <Popup>
                <div style={{ lineHeight: 1.2 }}>
                  <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
                    {v.licensePlate}
                  </Typography>
                  
                  <Typography variant="caption">
                    Brand: {v.brand}
                  </Typography><br />

                  <Typography variant="caption">
                    Driver: {v.driverName}
                  </Typography>
                </div>
              </Popup>
            </Marker>
          ))}

        </MapContainer>

      </Box>
    </>
  )
}

export default DashboardMap