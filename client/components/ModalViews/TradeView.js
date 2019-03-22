import React, { Component, Fragment } from 'react';
import Trade from './Trade';

export class TradeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: {
        forest: 0,
        hill: 0,
        pasture: 0,
        mountain: 0,
        field: 0,
      },
    };
  }
  render() {
    const { resources } = this.state;
    const { player } = this.props;
    return (
      <Fragment>
        <div>
          <Trade resources={resources} player={player} />
        </div>
      </Fragment>
    );
  }
}

export default TradeView;
