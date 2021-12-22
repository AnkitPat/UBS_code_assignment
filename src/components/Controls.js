import React from 'react';

const Controls = ({ handleCreateTask, handleDeleteTask, handleMoveTask, selectedCardName, hideForwardButton, hideBackButton }) => {
  const [createTaskName, setCreateTaskName] = React.useState('');
  return (
    <div className='Control'>
      <h1 className='Control-title'>Controls</h1>

      <div className='Control-task'>
        <div className='Control-task-create'>
          <input className='Control-task-input'
            data-testid={'new-task-name-input'}

            placeholder='New task name'
            onChange={event => {
              setCreateTaskName(event.target.value);
            }}
          />
          <button disabled={createTaskName.length === 0} data-testid={'create-task-btn'} className='Control-task-input' onClick={() => handleCreateTask(createTaskName)}>Create</button>
        </div>

        <div className='Control-task-operation'>
          <input className='Control-task-input' placeholder='Selected task name'
            readOnly
            data-testid={'selected-task-field'}
            value={selectedCardName} />
          <button data-testid={'move-back-btn'} disabled={hideBackButton} className='Control-task-input' onClick={() => handleMoveTask(false)}>Move back</button>
          <button data-testid={'move-forward-btn'} disabled={hideForwardButton} className='Control-task-input ' onClick={() => handleMoveTask(true)}>Move forward</button>

          <button data-testid={'delete-btn'} className='Control-task-input' onClick={() => handleDeleteTask()}>Delete</button>
        </div>
      </div>

    </div>
  )
}

export default Controls;
