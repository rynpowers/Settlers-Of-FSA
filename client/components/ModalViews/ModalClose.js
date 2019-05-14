import React from 'react';

function ModalClose({ handleClick, hidden }) {
  return (
    <div
      style={{ visibility: `${hidden ? 'hidden' : 'visible'}` }}
      onClick={handleClick}
      className="modal-close"
    >
      <div />
    </div>
  );
}

export default ModalClose;
