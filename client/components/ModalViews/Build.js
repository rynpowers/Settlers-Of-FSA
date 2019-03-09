import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMode, toggleExitMenu } from '../../store/actions';
import './Build.scss';

class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      road: false,
      settlement: false,
      city: false,
    };

    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleMouseOver(e) {
    if (e.target.dataset.button) {
      this.setState({ [e.target.dataset.value]: true });
    }
  }

  handleMouseOut(e) {
    if (e.target.dataset.button) {
      this.setState({ [e.target.dataset.value]: false });
    }
  }

  render() {
    const { road, settlement, city } = this.state;
    const { playerNumber } = this.props;
    return (
      <div
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={e => {
          if (e.target.dataset.value) {
            this.props.updateMode(e.target.dataset.value);
            this.props.toggleExitMenu();
          }
        }}
        className="modal-build-view"
      >
        <div
          className={`${road && `player-${playerNumber}`}`}
          data-value="road"
          data-button={true}
        >
          Road
        </div>
        <div
          className={`${settlement && `player-${playerNumber}`}`}
          data-value="settlement"
          data-button={true}
        >
          Settlement
        </div>
        <div
          className={`${city && `player-${playerNumber}`}`}
          data-value="city"
          data-button={true}
        >
          City
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  playerNumber: player.playerNumber,
});

export default connect(
  mapStateToProps,
  { updateMode, toggleExitMenu }
)(Build);
