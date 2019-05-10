import React from 'react';

function SubmitBtn({ handleSubmit, text, style }) {
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

export default SubmitBtn;
