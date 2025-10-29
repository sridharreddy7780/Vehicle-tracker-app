import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './VehicleMap.css'
import Header from './Header'
import AnimatedMarker from './AnimatedMarker'
import { calculateSpeedKmH } from '../utils'

const INITIAL_CENTER = [17.385044, 78.486671]

const vehicleIcon = L.divIcon({
  className: 'vehicle-icon',
  html: '<span>🚗</span>',
  iconSize: [24, 24],
})

function VehicleMap() {
  const [routeData, setRouteData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/dummy-route.json')
        const data = await response.json()
        setRouteData(data.map(p => ({
          lat: p.latitude,
          lng: p.longitude,
          timestamp: p.timestamp,
        })))
      } catch (error) {
        console.error('Error loading route data:', error)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    if (isPlaying && routeData.length > 0 && currentIndex < routeData.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => prev + 1)
      }, 2000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, currentIndex, routeData])

  const currentPosition = routeData[currentIndex] || routeData[0]
  const fullRouteCoords = routeData.map(p => [p.lat, p.lng])

  const togglePlay = () => setIsPlaying(!isPlaying)
  const resetSimulation = () => {
    setIsPlaying(false)
    setCurrentIndex(0)
  }

  return (
    <div className="map-container">
      <Header />
      <MapContainer center={INITIAL_CENTER} zoom={7} scrollWheelZoom={true} className="map">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routeData.length > 0 && (
          <>
            <Polyline pathOptions={{ color: 'grey', weight: 3, opacity: 0.8 }} positions={fullRouteCoords} />
            <Polyline pathOptions={{ color: 'red', weight: 3, opacity: 0.9 }} positions={fullRouteCoords.slice(0, currentIndex + 1)} />
          </>
        )}
        {currentPosition && (
          <AnimatedMarker position={[currentPosition.lat, currentPosition.lng]} icon={vehicleIcon} />
        )}
      </MapContainer>

      <div className="controls-panel">
        <h2>Vehicle Status</h2>
        {currentPosition && (
          <div className="info">
            <p><strong>Latitude:</strong> {currentPosition.lat?.toFixed(6)}</p>
            <p><strong>Longitude:</strong> {currentPosition.lng?.toFixed(6)}</p>
            <p><strong>Timestamp:</strong> {currentPosition.timestamp ? new Date(currentPosition.timestamp).toLocaleTimeString() : 'N/A'}</p>
            <p><strong>Speed:</strong> {calculateSpeedKmH(currentIndex, routeData)} km/h</p>
          </div>
        )}
        <div className="buttons">
          <button className={`play-btn ${isPlaying ? 'pause' : 'play'}`} onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button className="reset-btn" onClick={resetSimulation}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default VehicleMap
