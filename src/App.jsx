import { useReducer, useState } from 'react'
import Board from "./components/Board"

function App() {

  const TYPE_MOVE = 'move'

  const initialBoard = [[null, null, null],[null, null, null],[null, null, null]];
  const initialState = {
    board: initialBoard,
    nextPlayer: 'X',
    winner: null,
  }

  const tttReducer = (state, action) => {

    switch (action.type) {
      case TYPE_MOVE:

        const { y, x } = action.payload
        let board = JSON.parse(JSON.stringify(state.board))

        if (board[y][x] !== null) {
          return state
        }

        board[y][x] = state.nextPlayer
        const nextPlayer = state.nextPlayer === 'X' ? 'O' : 'X'

        return {
          ...state,
          board,
          nextPlayer,
        }

      default:
        return state;
    }
  }
  
  const [state, dispatch] = useReducer(tttReducer, initialState)
  const { board, nextPlayer } = state

  const handleMove = (y, x) => {
    dispatch({
      type: TYPE_MOVE,
      payload: {
        y,
        x,
      }
    })
    
  }


  return (
    <>
      <main>
        <h1>Tic tac toe</h1>
        <Board board={board} onMove={handleMove} />
      </main>
    </>
  )
}

export default App
