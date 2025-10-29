import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VehicleMap from './components/VehicleMap'
import DesignRoute from './components/DesignRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleMap />} />
        <Route path="/design" element={<DesignRoute />} />
      </Routes>
    </Router>
  )
}

export default App
