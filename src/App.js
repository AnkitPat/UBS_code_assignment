import React, { Component } from 'react';
import './App.css';

import Controls from './components/Controls';
import Board from './components/Board';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stagesNames: [
        {
          id: 1,
          title: 'Backlog',
          cardIds: ['task-0', 'task-1', 'task-2', 'task-3']
        },
        {
          id: 2,
          title: 'To Do',
          cardIds: ['task-4', 'task-5', 'task-6']
        },
        {
          id: 3,
          title: 'Ongoing',
          cardIds: ['task-7', 'task-8']
        },
        {
          id: 4,
          title: 'Done',
          cardIds: ['task-9']
        }

      ],
      cards: [
        {
          id: 'task-0',
          name: 'task 0',
          stageId: 1
        },
        {
          id: 'task-1',
          name: 'task 1',
          stageId: 1
        },
        {
          id: 'task-2',
          name: 'task 2',
          stageId: 1
        },
        {
          id: 'task-3',
          name: 'task 3',
          stageId: 1
        },
        {
          id: 'task-4',
          name: 'task 4',
          stageId: 2
        },
        {
          id: 'task-5',
          name: 'task 5',
          stageId: 2
        },
        {
          id: 'task-6',
          name: 'task 6',
          stageId: 2
        },
        {
          id: 'task-7',
          name: 'task 7',
          stageId: 3
        },
        {
          id: 'task-8',
          name: 'task 8',
          stageId: 3
        },
        {
          id: 'task-9',
          name: 'task 9',
          stageId: 4
        }
      ],
      selectedCardName: ''
    };

  }

  /**
   * 
   * 
   * Function to add task-name
   * Conditions,
   * If task-name is empty
   * If task-is not found
   * If task-already exists
   * @param {*} taskName 
   */
  addTask= (taskName) => {
    if (taskName.length > 0) {
      const index = this.state.cards.findIndex(card => card.name === taskName);
      if (index === -1) {
        const tempStateName = this.state.stagesNames;
        tempStateName[0].cardIds = tempStateName[0].cardIds.concat(taskName)
        console.log(tempStateName)
        this.setState({
          cards: this.state.cards.concat({
            id: taskName,
            name: taskName,
            stageId: 1
          }),
          stagesNames: tempStateName
        })
      } else {
        alert('task-already exists');
      }
    } else {
      alert('Please enter task-name');
    }
  }

   /**
   * 
   * 
   * Function to add task-name
   * Conditions,
   * If task-name is empty
   * If task-is not found
   */
  deleteTask= () => {
    if (this.state.selectedCardName.length > 0) {
      const card = this.state.cards.find(card => card.name === this.state.selectedCardName);
      if (card) {
        this.setState({
          cards: this.state.cards.filter(innerCard => innerCard.name !== card.name),
          stagesNames: this.state.stagesNames.map(stageName => {
            if (stageName.id === card.stageId) {
              return { ...stageName, cardIds: stageName.cardIds.filter(cardId => cardId !== card.id) }
            }
            return stageName
          })
        })
      } else {
        alert('task-not found');

      }
    } else {
      alert('Please enter task-name');
    }

    this.setState({
      selectedCardName: ''
    })
  }

   /**
   * 
   * 
   * Function to add task-name
   * Conditions,
   * If task-name is empty
   * If task-is not found
   * If forward, check stageId should be less than 4
   * If back, check stageId should be greater than 1
   * @param {*} isForward 
   */
  handleMove = (isForward) => {
    if (this.state.selectedCardName.length > 0) {
      const card = this.state.cards.find(card => card.name === this.state.selectedCardName);

      if (card) {
        if (isForward) {
          if (card.stageId < 4) {
            const nextStageId = card.stageId + 1
            this.setState({
              cards: this.state.cards.map(innerCard => {
                if (innerCard.id === card.id) {
                  return { ...card, stageId: nextStageId }
                }
                return innerCard;
              }),
              stagesNames: this.state.stagesNames.map(stageName => {
                if (stageName.id === card.stageId) {
                  return { ...stageName, cardIds: stageName.cardIds.filter(cardId => cardId !== card.id) }
                } else if (stageName.id === nextStageId) {
                  return { ...stageName, cardIds: stageName.cardIds.concat(card.id) }
                }
                return stageName;
              })
            })
          } else {
            alert('Card is at max level');
          }

        } else {
          if (card.stageId > 1) {
            const nextStageId = card.stageId - 1
            this.setState({
              cards: this.state.cards.map(innerCard => {
                if (innerCard.id === card.id) {
                  return { ...card, stageId: nextStageId }
                }
                return innerCard;
              }),
              stagesNames: this.state.stagesNames.map(stageName => {
                if (stageName.id === card.stageId) {
                  return { ...stageName, cardIds: stageName.cardIds.filter(cardId => cardId !== card.id) }
                } else if (stageName.id === nextStageId) {
                  return { ...stageName, cardIds: stageName.cardIds.concat(card.id) }
                }
                return stageName;
              })
            })
          } else {
            alert('Card is at min level');
          }
        }

      } else {
        alert('task-not found');

      }
    } else {
      alert('Please enter task-name');
    }
  }

  // Function to check if selected task-is able to move forward
  isAbleToForward = () => {
    const card = this.state.cards.find(card => card.name === this.state.selectedCardName);
    if (card) {
      return card.stageId !== 4
    }
    return true;
  }

  // Function to check if selected task-is able to move back
  isAbleToBack = () => {
    const card = this.state.cards.find(card => card.name === this.state.selectedCardName);
    if (card) {
      return card.stageId !== 1
    }
    return true;
  }

  render() {
    return (
      <div className="App">
        <Controls selectedCardName={this.state.selectedCardName} handleCreateTask={(taskName) => this.addTask(taskName)} handleDeleteTask={() => this.deleteTask()} handleMoveTask={(isForward) => this.handleMove(isForward)}
          hideForwardButton={!this.isAbleToForward()}
          hideBackButton={!this.isAbleToBack()}
        />
        <Board
          stagesNames={this.state.stagesNames}
          cards={this.state.cards}
          selectedCardName={(name) => this.setState({ selectedCardName: name })} />
      </div>
    );
  }
}

export default App;
