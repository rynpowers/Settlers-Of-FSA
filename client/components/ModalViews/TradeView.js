import React, { Component, Fragment } from 'react';
import { ResourceView } from '../ResourceComponents';
import TradeComponentWindow from './TradeComponentWindow';
import TradeOffer from './TradeOffer';
import ModalClose from './ModalClose';
import socket from '../../socket';
import './TradeView.scss';

export class TradeView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTrade: 0 };
    this.handleTradeAction = this.handleTradeAction.bind(this);
  }

  componentDidMount() {
    const { name } = this.props;
    socket.emit('update', { type: 'trade', action: 'initiate', game: name });
  }

  componentWillUnmount() {
    const { name } = this.props;
    socket.removeAllListeners('trades');
    socket.emit('update', { type: 'trade', game: name });
  }

  handleTradeAction(playerNumber, action) {
    const { name } = this.props;
    socket.emit('update', {
      player: playerNumber,
      type: 'trade',
      action,
      game: name,
    });
  }

  render() {
    const { selectedTrade } = this.state;
    const { isTurn, trades, resources } = this.props;

    console.log(selectedTrade);

    return (
      <TradeComponentWindow
        {...this.props}
        renderComponentOne={() => (
          <Fragment>
            <ModalClose
              hidden={!selectedTrade}
              handleClick={() => this.setState({ selectedTrade: 0 })}
            />
            <ResourceView
              updateResources={trades[selectedTrade]}
              resources={resources}
            />
          </Fragment>
        )}
        renderComponentTwo={() =>
          Object.keys(trades).map(trade => (
            <TradeOffer
              key={trade}
              trade={trade}
              isTurn={isTurn}
              resources={trades[trade]}
              selectedTrade={selectedTrade}
              handleViewTrade={() => this.setState({ selectedTrade: trade })}
              handleTradeAction={this.handleTradeAction}
            />
          ))
        }
      />
    );
  }
}

export default TradeView;
