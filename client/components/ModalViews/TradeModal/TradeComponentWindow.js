import React, { Component } from 'react';
import Chat from './Chat';

class TradeComponentWindow extends Component {
  render() {
    return (
      <div className="trade">
        <div className="trade-windows">
          <div className="trade-windows-create">
            {this.props.renderComponentOne()}
          </div>
          <div className="trade-windows-offers">
            {this.props.renderComponentTwo()}
          </div>
        </div>
        <div className="trade-chat">
          <Chat player={this.props.player} game={this.props.game} />
        </div>
      </div>
    );
  }
}

export default TradeComponentWindow;
