import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import {
  Build,
  TradeView,
  Robber,
  DevModal,
  Monopoly,
  YearOfPlenty,
} from './ModalViews';
import './Modal.scss';
import { ResourcePanel } from './ResourceComponents';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitTrade = this.handleSubmitTrade.bind(this);
  }
  renderModalView(view) {
    switch (view) {
      case 'build':
        return <Build {...this.props} />;
      case 'trade':
        return <TradeView {...this.props} />;
      case 'robber':
        return <Robber {...this.props} />;
      case 'dev':
        return <DevModal {...this.props} />;
      case 'monopoly':
        return <Monopoly {...this.props} />;
      case 'yearOfPlenty':
        return <YearOfPlenty {...this.props} />;
      case 'roll':
        return (
          <ResourcePanel
            {...this.props}
            style={{ height: '25rem' }}
            handleSubmit={args => console.log(args)}
          />
        );
      default:
    }
  }

  render() {
    const { game, playerNumber, updateMode } = this.props;
    const views = [
      'trade',
      'build',
      !game.responded[playerNumber] && 'robber',
      'dev',
      'monopoly',
      'yearOfPlenty',
      'roll',
    ];
    const modalActive = views.includes(game.mode);
    return (
      <div className={`modal ${modalActive && 'modal-active'}`}>
        {this.renderModalView(game.mode)}
        <div onClick={() => updateMode('')} className="modal-close">
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu, player, game }) => ({
  modal: menu.modal,
  playerNumber: player.playerNumber,
  totalResources: Object.keys(player.resources).reduce(
    (a, v) => a + player.resources[v],
    0
  ),
  player,
  resources: player.resources,
  game,
  name: game.name,
});

export default connect(
  mapStateToProps,
  {
    updateMode: actions.updateMode,
    reset: actions.reset,
    toggleExitMenu: actions.toggleExitMenu,
  }
)(Modal);
