import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settlements from './Settlements';
import Roads from './Roads';
import './Resource.scss';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robber: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  renderRobber() {
    const { board, id } = this.props;
    const { hasRobber, diceValue } = board.resources[id];
    return hasRobber || this.state.robber ? (
      <div className="resource-image-robber" data-type="robber" data-id={id} />
    ) : (
      diceValue && (
        <div className="resource-image-number">
          <h3>{diceValue}</h3>
        </div>
      )
    );
  }

  handleMouseOver() {
    const { mode, isTurn } = this.props;
    if (mode === 'move-robber' && isTurn) {
      this.setState({ robber: true });
    }
  }

  handleMouseOut() {
    this.setState({ robber: false });
  }

  render() {
    const { board, id } = this.props;
    const { roads, type } = board.resources[id];
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        style={this.props.style}
        className="resource-container"
        data-type="resource"
      >
        <div className="resource">
          <Roads roads={roads} board={board} />
          <div
            className={`resource-image ${type}`}
            data-type="resource"
            data-id={id}
          >
            {this.renderRobber()}
          </div>
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
