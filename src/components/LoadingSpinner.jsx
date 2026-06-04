import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading weather data...' }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="spinner-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;