import React, { Fragment } from 'react';
import ModalClose from './ModalClose';

function TradeView({ playerNumber, handleClick }) {
  return (
    <Fragment>
      <ModalClose handleClick={() => handleClick('')} />
      <div style={{ display: 'flex' }}>
        <div
          onClick={() => handleClick('trading')}
          className={`modal-build-view modal-build-view-btn modal-build-view-btn-${playerNumber}`}
        >
          Players
        </div>
        <div
          onClick={() => handleClick('bank')}
          className={`modal-build-view modal-build-view-btn modal-build-view-btn-${playerNumber}`}
        >
          Bank
        </div>
      </div>
    </Fragment>
  );
}

export default TradeView;
