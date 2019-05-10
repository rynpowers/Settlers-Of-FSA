import React, { Component } from 'react';
import SubmitBtn from '../SubmitBtn';

const initialState = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

const withResourceState = WrappedComponent => {
  return class ResourceComponent extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;

      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick(resource, num) {
      this.setState(prev => ({ [resource]: prev[resource] + num }));
    }

    handleSubmit() {
      this.props.handleSubmit(this.state);
      this.setState({ ...initialState });
    }

    render() {
      const { handleClickInc, handleClickDec } = this.props;
      return (
        <div className="resource-component-panel-container">
          <WrappedComponent
            {...this.props}
            updateResources={this.state}
            handleClickInc={handleClickInc}
            handleClickDec={handleClickDec}
            handleClick={this.handleClick}
          />
          <SubmitBtn
            style={{ alignSelf: 'flex-end' }}
            text="Submit"
            handleSubmit={this.handleSubmit}
          />
        </div>
      );
    }
  };
};

export default withResourceState;
