import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Resource.scss';

class Resource extends Component {
  render() {
    const { board, id } = this.props;
    const { roads, settlements, type } = board.resources[id];
    return (
      <div
        onClick={e => console.log(e.target)}
        style={this.props.style}
        className="resource-container"
      >
        <div className="resource">
          <div className="road-container top">
            <div data-road={roads[0]} />
            <div data-road={roads[1]} />
          </div>
          <div className="road-container middle">
            <div data-road={roads[4]} />
            <div data-road={roads[5]} />
          </div>
          <div className="road-container bottom">
            <div data-road={roads[2]} />
            <div data-road={roads[3]} />
          </div>
          <div className={`resource-image ${type}`} />
        </div>
        <div
          className="settlement settlement-1"
          data-settlement={settlements[0]}
        />
        <div
          className="settlement settlement-2"
          data-settlement={settlements[1]}
        />
        <div
          className="settlement settlement-3"
          data-settlement={settlements[2]}
        />
        <div
          className="settlement settlement-4"
          data-settlement={settlements[3]}
        />
        <div
          className="settlement settlement-5"
          data-settlement={settlements[4]}
        />
        <div
          className="settlement settlement-6"
          data-settlement={settlements[5]}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ board }) => ({ board });

export default connect(
  mapStateToProps,
  null
)(Resource);
