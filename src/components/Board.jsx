const Board = ({ board, winner, onMove }) => {

    const handleBoxClick = (e, x, y) => {
        onMove(y,x)
    }

    return <>
    <div className={"board" + (winner ? ' won' : '')}>
        {[0,1,2].map(y => <div key={'y' + y} className="row">
            {[0,1,2].map(x => <div key={'x' + x} className="col" onClick={e => {handleBoxClick(e, x, y)}}>{ board[y][x] }</div>)}
        </div>)}
    </div>
    </>
}

export default Board