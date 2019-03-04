import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderSettlements } from './Settlement';
import * as validators from '../../validators';
import Roads from './Roads';
import './Resource.scss';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      road: {
        'road-0': false,
        'road-1': false,
        'road-2': false,
        'road-3': false,
        'road-4': false,
        'road-5': false,
      },
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleHover(hover, type, mode, id) {
    const { road } = this.state;
    if (validators.validateRoad(id) && mode === type) {
      this.setState({ road: { ...road, [hover]: !road[hover] } });
    }
  }

  handleMouseOver(e) {
    const { hover, type, id } = e.target.dataset;
    const { mode } = this.props;
    if (hover && type === 'road') {
      this.handleHover(hover, type, mode, id);
    }
  }

  handleMouseOut(e) {
    const { hover, type, id } = e.target.dataset;
    const { mode } = this.props;
    if (hover && type === 'road') {
      this.handleHover(hover, type, mode, id);
    }
  }

  validateClick(e) {
    const { type, id } = e.target.dataset;

    if (type === 'road') {
      !validators.validateRoad(id) && e.stopPropagation();
    }
  }

  render() {
    const { board, id, player } = this.props;
    const { roads, type, diceValue, hasRobber } = board.resources[id];
    return (
      <div
        onClick={this.validateClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={this.props.style}
        className="resource-container"
      >
        <div className="resource">
          <Roads
            playerNumber={player.playerNumber}
            hover={this.state.road}
            roads={roads}
            board={board}
          />
          <div className={`resource-image ${type}`}>
            {hasRobber ? (
              <div className="resource-image-robber" />
            ) : (
              <div className="resource-image-number">
                <h3>{diceValue}</h3>
              </div>
            )}
          </div>
        </div>
        {renderSettlements({ ...this.props })}
      </div>
    );
  }
}

const mapStateToProps = ({ board, player, localState }) => ({
  board,
  player,
  mode: localState.mode,
});

export default connect(
  mapStateToProps,
  null
)(Resource);
