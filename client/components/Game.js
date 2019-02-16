import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { store } from '../store';
import { setBoardThunk } from '../store/actions';
import './Game.scss';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    socket.on('connect', () => socket.emit('join-game', this.props.game));
    socket.on('dispatch', action => {
      console.log('catching dispatch from server', action);
      store.dispatch(action);
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="form-container">
        <form
          className={this.props.board}
          onSubmit={e => {
            e.preventDefault();
            this.props.setBoardThunk(this.state.color);
            console.log('submitting');
          }}
        >
          <input
            name="color"
            value={this.state.color}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ game, board }) => ({ game, board });

export default connect(
  mapStateToProps,
  { setBoardThunk }
)(Game);
