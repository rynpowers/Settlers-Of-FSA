import React, { Component } from 'react';
import './Resource.scss';

class Resource extends Component {
  render() {
    return (
      <div style={this.props.style} className="resource-container">
        <div className="resource">
          <div className="road-container top">
            <div />
            <div />
          </div>
          <div className="road-container bottom">
            <div />
            <div />
          </div>
          <div className="road-container middle">
            <div />
            <div />
          </div>
          <div className="dessert" />
        </div>
        <div className="settlement settlement-1" />
        <div className="settlement settlement-2" />
        <div className="settlement settlement-3" />
        <div className="settlement settlement-4" />
        <div className="settlement settlement-5" />
        <div className="settlement settlement-6" />
      </div>
    );
  }
}

export default Resource;
