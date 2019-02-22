import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Resource.scss';

class Resource extends Component {
  render() {
    const { board, id } = this.props;
    const { roads, settlements, type } = board.resources[id];
    if (id === 8) console.log(settlements);
    return (
      <div style={this.props.style} className="resource-container">
        <div className="resource">
          <div className="road-container top">
            <div
              data-id={roads[0]}
              data-type="road"
              className={`player-${board.roads[roads[0]].player}`}
            />
            <div
              data-id={roads[1]}
              data-type="road"
              className={`player-${board.roads[roads[1]].player}`}
            />
          </div>
          <div className="road-container middle">
            <div
              data-id={roads[4]}
              data-type="road"
              className={`player-${board.roads[roads[4]].player}`}
            />
            <div
              data-id={roads[5]}
              data-type="road"
              className={`player-${board.roads[roads[5]].player}`}
            />
          </div>
          <div className="road-container bottom">
            <div
              data-id={roads[2]}
              data-type="road"
              className={`player-${board.roads[roads[2]].player}`}
            />
            <div
              data-id={roads[3]}
              data-type="road"
              className={`player-${board.roads[roads[3]].player}`}
            />
          </div>
          <div className={`resource-image ${type}`} />
        </div>
        <div
          className={`settlement settlement-0 player-${
            board.settlements[settlements[0]].player
          } build-${board.settlements[settlements[0]].build}`}
          data-id={settlements[0]}
          data-type="settlement"
        />
        <div
          className={`settlement settlement-1 player-${
            board.settlements[settlements[1]].player
          } build-${board.settlements[settlements[1]].build}`}
          data-id={settlements[1]}
          data-type="settlement"
        />
        <div
          className={`settlement settlement-2 player-${
            board.settlements[settlements[2]].player
          } build-${board.settlements[settlements[2]].build}`}
          data-id={settlements[2]}
          data-type="settlement"
        />
        <div
          className={`settlement settlement-3 player-${
            board.settlements[settlements[3]].player
          } build-${board.settlements[settlements[3]].build}`}
          data-id={settlements[3]}
          data-type="settlement"
        />
        <div
          className={`settlement settlement-4 player-${
            board.settlements[settlements[4]].player
          } build-${board.settlements[settlements[4]].build}`}
          data-id={settlements[4]}
          data-type="settlement"
        />
        <div
          className={`settlement settlement-5 player-${
            board.settlements[settlements[5]].player
          } build-${board.settlements[settlements[5]].build}`}
          data-id={settlements[5]}
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
