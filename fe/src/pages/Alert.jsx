import React, { useState } from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div style={{
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #c3e6cb',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {message}
      <button onClick={onClose} style={{
        marginLeft: '15px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#155724',
      }}>
        ✖
      </button>
    </div>
  );
}

const App2 = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      {showAlert && <Alert message="Success! This is a success alert." onClose={() => setShowAlert(false)} />}
      <button onClick={() => setShowAlert(true)} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Show Alert
      </button>
    </div>
  );
}

export default App2;
