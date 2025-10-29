import Header from './Header'

function DesignRoute() {
  const messageStyle = {
    textAlign: 'center',
    marginTop: '120px',
    color: '#333',
    fontSize: '18px',
    lineHeight: '1.6',
  }

  const headingStyle = {
    fontSize: '24px',
    color: '#d9534f',
    marginBottom: '10px',
  }

  return (
    <div className="design-container">
      <Header />
      <div style={messageStyle}>
        <h2 style={headingStyle}>🚧 Design Route Feature</h2>
        <p>Right now, designing your own routes isn’t available.</p>
        <p>We’ll introduce this feature soon — stay tuned!</p>
      </div>
    </div>
  )
}

export default DesignRoute
