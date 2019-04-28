import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settlements from './Settlements';
import {
  validateRoad,
  validateCity,
  validateSettlement,
} from '../../validators';
import Roads from './Roads';
import './Resource.scss';

const initailState = {
  road: {
    'road-0': false,
    'road-1': false,
    'road-2': false,
    'road-3': false,
    'road-4': false,
    'road-5': false,
  },
  settlement: {
    'settlement-0': false,
    'settlement-1': false,
    'settlement-2': false,
    'settlement-3': false,
    'settlement-4': false,
    'settlement-5': false,
  },
  robber: false,
};

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settlement: { ...initailState.settlement },
      road: { ...initailState.road },
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.validateClick = this.validateClick.bind(this);
  }
  resetState() {
    this.setState({
      settlement: { ...initailState.settlement },
      road: { ...initailState.road },
    });
  }

  renderRobber() {
    const { board, id } = this.props;
    const { hasRobber, diceValue } = board.resources[id];
    return hasRobber || this.state.robber ? (
      <div className="resource-image-robber" />
    ) : (
      <div className="resource-image-number">
        <h3>{diceValue}</h3>
      </div>
    );
  }

  validate(e, id, validator) {
    validator(id) ? this.resetState() : e.stopPropagation();
  }

  handleHoverRoad(hover, type, mode, id) {
    const { road } = this.state;
    if (validateRoad(id) && mode === type) {
      this.setState({ road: { ...road, [hover]: !road[hover] } });
    }
  }

  handleHoverSettlement(hover, type, mode, id) {
    const { settlement } = this.state;
    const correctMode = mode === 'settlement' || mode === 'city';
    const validator = mode === 'city' ? validateCity : validateSettlement;
    if (correctMode && validator(id)) {
      this.setState(
        {
          settlement: { ...settlement, [hover]: !settlement[hover] },
        },
        () => console.log(this.state.settlement)
      );
    }
  }

  handleMouseOver(e) {
    const { hover, type, id } = e.target.dataset;
    const { mode, isTurn } = this.props;
    if (hover && type === 'road') {
      this.handleHoverRoad(hover, type, mode, id);
    } else if (hover && type === 'settlement') {
      this.handleHoverSettlement(hover, type, mode, id);
    } else if (mode === 'move-robber' && isTurn) {
      this.setState({ robber: true });
    }
  }

  handleMouseOut(e) {
    const { hover, type, id } = e.target.dataset;
    const { mode, isTurn } = this.props;
    if (hover && type === 'road') {
      this.handleHoverRoad(hover, type, mode, id);
    } else if (hover && type === 'settlement') {
      this.handleHoverSettlement(hover, type, mode, id);
    } else if (mode === 'move-robber' && isTurn) {
      this.setState({ robber: false });
    }
  }

  validateClick(e) {
    const { type, id } = e.target.dataset;
    const { mode } = this.props;

    if (type === 'road') {
      this.validate(e, id, validateRoad);
    } else if (type === 'settlement') {
      const validator = mode === 'city' ? validateCity : validateSettlement;
      this.validate(e, id, validator);
    }
  }

  render() {
    const { board, id, player } = this.props;
    const { roads, type } = board.resources[id];
    return (
      <div
        onClick={this.validateClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={this.props.style}
        className="resource-container"
        data-type="resource"
      >
        <div className="resource">
          <Roads
            playerNumber={player.playerNumber}
            hover={this.state.road}
            roads={roads}
            board={board}
          />
          <div className={`resource-image ${type}`}>{this.renderRobber()}</div>
        </div>
        <Settlements hover={this.state.settlement} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = ({ board, player, game }) => ({
  board,
  player,
  mode: game.mode,
  isTurn: game.playerTurn === player.playerNumber,
});

export default connect(
  mapStateToProps,
  null
)(Resource);
