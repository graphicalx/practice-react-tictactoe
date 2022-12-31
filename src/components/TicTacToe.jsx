import Board from "./Board"
import { useEffect, useReducer, useState } from 'react'
import { checkGameStatus } from "../lib/logic"
import { TYPE_GAME_END, TYPE_MOVE } from "../lib/consts";

export default function TicTacToe() {

    const initialBoard = [[null, null, null], [null, null, null], [null, null, null]];
    const initialState = {
        board: initialBoard,
        nextPlayer: 'X',
        winner: null,
    }

    const tttReducer = (state, action) => {

        switch (action.type) {
            case TYPE_MOVE:

                if (state.winner !== null) {
                    return state
                }

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

            case TYPE_GAME_END:
                if (action.payload === 'draw') {
                    return {
                        ...state,
                        winner: '-',
                    }
                }

                if (action.payload === 'X' || action.payload === 'O') {
                    return {
                        ...state,
                        winner: action.payload,
                    }
                }

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(tttReducer, initialState)
    const { board, nextPlayer, winner } = state

    const handleMove = (y, x) => {
        dispatch({
            type: TYPE_MOVE,
            payload: {
                y,
                x,
            }
        })
    }

    useEffect(() => {
        checkGameStatus(board, dispatch)
    }, [board])

    let message = ''
    switch (winner) {
        case null:
            message = `It's player ${nextPlayer}'s turn`
            break;
        case 'X':
        case 'O':
            message = winner + ' won!'
            break;
        case '-':
            message = "Its a draw!"
            break;
    }

    return <>
        <Board board={board} winner={winner} onMove={handleMove} />
        <p className={"message" + (winner ? " winner" : '')}>{message}</p>
    </>
}