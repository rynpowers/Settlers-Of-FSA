import React, { Component } from 'react';
import { connect } from 'react-redux';
import Settlements from './Settlements';
import Roads from './Roads';
import Robber from './Robber';
import './Resource.scss';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getParent(e) {
    let elem = e.target;
    while (elem.dataset.type !== 'robber') {
      elem = elem.parentNode;
    }
    return elem;
  }

  handleMouseOver() {
    const { isTurn, mode } = this.props;
    if (mode === 'move-robber' && isTurn) this.setState({ hover: true });
  }

  handleMouseOut() {
    this.setState({ hover: false });
  }

  handleClick(e) {
    const { board, id, mode } = this.props;
    const resource = board.resources[id];

    if (mode === 'move-robber') {
      resource.hasRobber && e.stopPropagation();
      e.target = this.getParent(e);
    }
  }

  render() {
    const { board, id } = this.props;
    const { roads, type, settlements } = board.resources[id];
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
        style={this.props.style}
        className="resource-container"
        data-type="robber"
        data-id={id}
      >
        <div className="resource">
          <Roads roads={roads} />
          <div className={`resource-image ${type}`}>
            <Robber board={board} id={id} hover={this.state.hover} />
          </div>
        </div>
        <Settlements settlements={settlements} {...this.props} />
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
