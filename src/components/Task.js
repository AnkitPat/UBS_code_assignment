import React from 'react';

const taskNameToId = name => {
  return `task-${name}`;
}

const Task = ({ name, handleClick }) => {
  return (
    <div
      data-testid={taskNameToId(name)}
      onClick={handleClick}
    >
      <div className={'Card'}>
        <div>{name}</div>
      </div>

    </div>
  );
}

export default Task;
