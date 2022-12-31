import { TYPE_GAME_END, TYPE_MOVE } from "../lib/consts";

const checkGameStatus = (board, dispatch) => {

    let hasResult = false;
    // horizontals & verticals
    for (let i = 0; i <= 2; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== null) {
            dispatch({
                type: TYPE_GAME_END,
                payload: board[i][0],
            })
            hasResult = true
            break
        }

        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== null) {
            dispatch({
                type: TYPE_GAME_END,
                payload: board[0][i],
            })
            hasResult = true
            break
        }
    }

    // diagonals
    if ((board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null)
    ) {
        dispatch({
            type: TYPE_GAME_END,
            payload: board[1][1],
        })
        hasResult = true
    }

    if (hasResult) {
        return
    }

    // No moves left
    if (board.reduce(
        (a, c) => a + c.reduce(
            (a1, c1) => a1 + ((c1 !== null) ? 1 : 0), 0), 0)
        === 9) {
        dispatch({
            type: TYPE_GAME_END,
            payload: 'draw',
        })
        return
    }
}

export { checkGameStatus }