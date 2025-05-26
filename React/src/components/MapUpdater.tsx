import { useEffect }  from 'react'
import { useMap }     from 'react-leaflet'

type Props = {
  position: [number, number]
}

const MapUpdater = ({ position }: Props) => {
  const map = useMap()

  useEffect(() => {
    map.setView(position, map.getZoom())
  }, [position, map])

  return null
}

export default MapUpdater