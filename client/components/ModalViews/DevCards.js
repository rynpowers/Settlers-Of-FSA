import React from 'react';
import { ResourcePanel } from '../ResourceComponents';
import Card from './Card';
import options from '../Board/gameBoardOptions';

const DevCards = ({ devCards, cantPlay, devCardPlayed, handleSubmit }) => {
  const cost = options.cost.dev;
  return (
    <div className="card-container">
      <Card classes="card-active" key="button" handleClick={handleSubmit}>
        <h2>Buy Card</h2>
        <ResourcePanel resources={cost} />
      </Card>
      {!devCardPlayed &&
        Object.keys(devCards)
          .filter(card => devCards[card])
          .map(card => (
            <Card
              key={card}
              quantity={devCards[card]}
              classes={`card-${card} card-active`}
              handleClick={() => this.setState({ selectedCard: card })}
            />
          ))}
      {Object.keys(cantPlay).map(card => (
        <Card key={card} classes={`card-${card}`} quantity={cantPlay[card]}>
          <div className="card-cover">
            <h2>Play Next Turn</h2>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DevCards;
