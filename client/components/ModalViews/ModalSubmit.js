import React from 'react';

function ModalSubmit({ handleSubmit, text, style }) {
  return (
    <button
      style={style}
      onClick={handleSubmit}
      type="submit"
      className="modal-submit"
    >
      {text}
    </button>
  );
}

export default ModalSubmit;
