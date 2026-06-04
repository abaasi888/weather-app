import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message, onRetry, retryText = 'Try Again' }) => {
  if (!message) return null;
  
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          🔄 {retryText}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;