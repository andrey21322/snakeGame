function GameOver({startGame}) {
  return (
    <>
        <div className='gameOverDiv'>
        <div>Game over</div>
        <button className='paBtn' onClick={startGame}>Play Again</button>
        </div>
    </>
  )
}

export default GameOver;
