import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'

export default function EventMap({ link }) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  // https://github.com/visgl/react-map-gl
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    width: '100%',
    height: '500px',
  })

  // run on page load (once, see [])
  useEffect(() => {
    const lat = 47.1111
    const lng = 18.2222
    setLat(lat)
    setLng(lng)
    setViewport({ ...viewport, latitude: lat, longitude: lng })
    setLoading(false)
  }, [])

  if (loading) return false

  console.log(lat, lng)

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={link.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" height={30} width={30} alt=""></Image>
      </Marker>
    </ReactMapGl>
  )
}
