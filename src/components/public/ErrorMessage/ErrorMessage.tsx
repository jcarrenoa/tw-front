import React from 'react';
import './ErrorMessage.module.css'

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ErrorMessage;
