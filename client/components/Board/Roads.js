import React, { Fragment } from 'react';
import Road from './Road';

const Roads = ({ roads }) => {
  return (
    <Fragment>
      <div className="road-container top">
        <Road id={roads[0]} />
        <Road id={roads[1]} />
      </div>
      <div className="road-container middle">
        <Road id={roads[4]} />
        <Road id={roads[5]} />
      </div>
      <div className="road-container bottom">
        <Road id={roads[2]} />
        <Road id={roads[3]} />
      </div>
    </Fragment>
  );
};

export default Roads;
