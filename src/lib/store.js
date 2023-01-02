import { configureStore, createSlice } from '@reduxjs/toolkit'

const initialState = {
    board: Array(3).fill(Array(3).fill(null)),
    nextPlayer: 'X',
    winner: null,
    showReset: false,
}

const tttSlice = createSlice({
    name: "ttt",
    initialState: initialState,
    reducers: {
        move(state, action) {
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
                showReset: true,
            }
        },
        gameEnd(state, action) {
            if (action.payload.winner === 'draw') {
                return {
                    ...state,
                    winner: '-',
                }
            }

            if (action.payload.winner === 'X' || action.payload.winner === 'O') {
                return {
                    ...state,
                    winner: action.payload.winner,
                }
            }
        },
        reset(state) {
            return initialState
        }
    }
})

const store = configureStore({
    reducer: tttSlice.reducer,
})

export { store }
export const { move, gameEnd, reset } = tttSlice.actions
