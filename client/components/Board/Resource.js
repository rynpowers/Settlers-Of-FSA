import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderSettlements } from './Settlement';
import './Resource.scss';

class Resource extends Component {
  render() {
    const { board, id } = this.props;
    const { roads, type } = board.resources[id];
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
        {renderSettlements({ ...this.props })}
      </div>
    );
  }
}

const mapStateToProps = ({ board, player }) => ({ board, player });

export default connect(
  mapStateToProps,
  null
)(Resource);
