import Board from "./Board"
import { useEffect } from 'react'
import { checkGameStatus } from "../lib/logic"
import { useSelector, useDispatch } from "react-redux"
import { move, gameEnd, reset } from "../lib/store"

export default function TicTacToe() {

    const {board, nextPlayer, winner, showReset} = useSelector(state => state)

    const dispatch = useDispatch()

    const handleMove = (y, x) => {
        dispatch(move({
            y,
            x
        }))
    }

    const handleReset = () => {
        dispatch(reset())
    }

    useEffect(() => {
        checkGameStatus(board, dispatch, gameEnd)
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
        {showReset && <button className="reset" onClick={handleReset}>Start over</button>}
        <p className={"message" + (winner ? " winner" : '')}>{message}</p>
    </>
}