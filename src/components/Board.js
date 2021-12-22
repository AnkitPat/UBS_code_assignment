import React from 'react';

import Stage from './Stage';
import Task from './Task';

const Board = ({ stagesNames, cards, selectedCardName }) => {
  return (
    <div className="Board">
      <h1 className='Board-title'>Kanban board</h1>
      {stagesNames.map((stagesName, index) => (
        <Stage
          key={stagesName.id}
          index={index}
          title={stagesName.title}
        >
          {stagesName.cardIds
            .map(cardId => cards.find(card => card.id === cardId))
            .map((card, index) => {
              return (
                <Task
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  handleClick={() => selectedCardName(card.name)}
                />
              )
            })}
        </Stage>
      ))}

    </div>
  );
}

export default Board;
