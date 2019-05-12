import React, { Component, Fragment } from 'react';
import BuildViewBtn from './BuildViewBtn';
import FlashAlert from '../FlashAlert';
import './Build.scss';
import options from '../Board/gameBoardOptions';

class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }
  canBuy(buildItem) {
    const { resources } = this.props;
    return Object.keys(buildItem).every(
      type => resources[type] >= buildItem[type]
    );
  }

  render() {
    const { playerNumber } = this.props;
    const { cost } = options;
    return (
      <Fragment>
        <div
          className="modal-build"
          onClick={e => {
            const canBuy =
              this.canBuy(cost[e.target.dataset.value]) &&
              e.target.dataset.value;

            if (canBuy) {
              this.props.updateMode(e.target.dataset.value);
              this.props.toggleExitMenu();
            } else {
              this.setState({ message: "You don't have sufficient resources" });
            }
          }}
        >
          {['road', 'settlement', 'city'].map(type => (
            <BuildViewBtn
              key={type}
              resources={cost[type]}
              type={type}
              playerNumber={playerNumber}
            />
          ))}
        </div>
        <FlashAlert
          message={this.state.message}
          handleSubmit={() => this.setState({ message: '' })}
        />
      </Fragment>
    );
  }
}

export default Build;
