import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const navigate = useNavigate()

  return (
    <div className="header-section">
      <h1>🚗 Vehicle Tracker</h1>
      <p>GPS Route Simulation & Design</p>
      <div className="action-buttons">
        <button className="view-route-btn" onClick={() => navigate('/')}>View Route</button>
        <button className="design-route-btn" onClick={() => navigate('/design')}>Design Route</button>
      </div>
    </div>
  )
}

export default Header
