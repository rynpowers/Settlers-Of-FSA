import React from 'react';
import SubmitBtn from './SubmitBtn';
import './FlashAlert.scss';

const FlashAlert = ({ message, handleSubmit }) => {
  return (
    <div className={`flash-container ${message && 'flash-container-active'}`}>
      <div className={`flash ${message && 'flash-active'}`}>
        <h2>{message}</h2>
        {handleSubmit && (
          <SubmitBtn
            style={{ transform: 'scale(0.8)' }}
            text="OK"
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default FlashAlert;
