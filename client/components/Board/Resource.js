import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Resource.scss';

class Resource extends Component {
  isOwnerRoad(id, player) {
    const { roads } = this.props.board;
    return roads[id].player === player.playerNumber
      ? `player-${player.playerNumber}`
      : '';
  }
  render() {
    const { board, id, player } = this.props;
    const { roads, settlements, type } = board.resources[id];
    return (
      <div style={this.props.style} className="resource-container">
        <div className="resource">
          <div className="road-container top">
            <div
              data-road={roads[0]}
              data-type="road"
              className={`player-${board.roads[roads[0]].player}`}
            />
            <div
              data-road={roads[1]}
              data-type="road"
              className={`player-${board.roads[roads[1]].player}`}
            />
          </div>
          <div className="road-container middle">
            <div
              data-road={roads[4]}
              data-type="road"
              className={`player-${board.roads[roads[4]].player}`}
            />
            <div
              data-road={roads[5]}
              data-type="road"
              className={`player-${board.roads[roads[5]].player}`}
            />
          </div>
          <div className="road-container bottom">
            <div
              data-road={roads[2]}
              data-type="road"
              className={`player-${board.roads[roads[2]].player}`}
            />
            <div
              data-road={roads[3]}
              data-type="road"
              className={`player-${board.roads[roads[3]].player}`}
            />
          </div>
          <div className={`resource-image ${type}`} />
        </div>
        <div
          className="settlement settlement-1"
          data-settlement={settlements[0]}
          data-type="settlement"
        />
        <div
          className="settlement settlement-2"
          data-settlement={settlements[1]}
          data-type="settlement"
        />
        <div
          className="settlement settlement-3"
          data-settlement={settlements[2]}
          data-type="settlement"
        />
        <div
          className="settlement settlement-4"
          data-settlement={settlements[3]}
          data-type="settlement"
        />
        <div
          className="settlement settlement-5"
          data-settlement={settlements[4]}
          data-type="settlement"
        />
        <div
          className="settlement settlement-6"
          data-settlement={settlements[5]}
          data-type="settlement"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ board, player }) => ({ board, player });

export default connect(
  mapStateToProps,
  null
)(Resource);
