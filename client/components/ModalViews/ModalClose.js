import React from 'react';

function ModalClose({ handleClick }) {
  return (
    <div onClick={handleClick} className="modal-close">
      <div />
    </div>
  );
}

export default ModalClose;
