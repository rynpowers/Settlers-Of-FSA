import React, { Component, Fragment } from 'react';
import Trade from './Trade';

const initResources = {
  forest: 0,
  hill: 0,
  pasture: 0,
  mountain: 0,
  field: 0,
};

export class TradeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resources: { ...initResources },
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(type, val) {
    this.setState(prevState => ({
      resources: {
        ...prevState.resources,
        [type]: prevState.resources[type] + val,
      },
    }));
  }

  handleSubmit() {
    const resources = Object.keys(this.state.resources).reduce((a, v) => {
      const val = this.state.resources[v];
      a[v] = val ? val * -1 : val;
      return a;
    }, {});

    this.setState({ resources: { ...initResources } }, () => {
      this.props.handleSubmitCB(resources);
    });
  }

  render() {
    return (
      <Fragment>
        <Trade
          hidden={this.props.hidden}
          resources={this.state.resources}
          player={this.props.player}
          handleClick={this.handleClick}
        />
        {!this.props.hidden && (
          <button
            onClick={this.handleSubmit}
            type="submit"
            className="trade-btn trade-submit"
          >
            Send
          </button>
        )}
      </Fragment>
    );
  }
}

export default TradeCreate;
