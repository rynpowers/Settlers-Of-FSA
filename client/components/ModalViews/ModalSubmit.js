import React from 'react';

function ModalSubmit({ handleSubmit, text }) {
  return (
    <button onClick={handleSubmit} type="submit" className="modal-submit">
      {text}
    </button>
  );
}

export default ModalSubmit;
