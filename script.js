function Gameboard () {
  const board = document.querySelectorAll('.cell')
  // gameboard.forEach((cell) => (cell.textContent = ''))
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = board
  const winningCombos = [
    [c1.id, c2.id, c3.id],
    [c4.id, c5.id, c6.id],
    [c7.id, c8.id, c9.id],
    [c1.id, c4.id, c7.id],
    [c2.id, c5.id, c8.id],
    [c3.id, c6.id, c9.id],
    [c1.id, c5.id, c9.id],
    [c3.id, c5.id, c7.id]
  ]
  const getBoard = () => board
  const getWinningCombos = () => winningCombos
  return {
    getBoard,
    getWinningCombos
  }
}

const Players = (playerX = 'Player X', playerO = 'Player O') => {
  const players = [
    { name: playerX, marker: 'X', moves: [] },
    { name: playerO, marker: 'O', moves: [] }
  ]
  let activePlayer = players[0]
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }

  const getActivePlayer = () => activePlayer

  return {
    switchPlayer,
    getActivePlayer
  }
}

function gameController () {
  const board = Gameboard()
  const player = Players()
  const result = document.getElementById('result')
  board.getBoard().forEach((cell) => {
    cell.addEventListener('click', makeMove)
    function makeMove () {
      const activePlayer = player.getActivePlayer()
      // if (result.textContent.includes('win')) {
      //   activePlayer.moves = []
      // } else 
      if (
        cell.textContent === '' &&
        !result.textContent.includes('win')
      ) {
        activePlayer.moves.push(cell.id)
        cell.textContent = activePlayer.marker
      }
      // checking against winning combinations
      board.getWinningCombos().forEach((combo) => {
        const match = combo.every((elem) => activePlayer.moves.includes(elem))
        if (match) {
          activePlayer.moves = []
          result.textContent = `${activePlayer.name} wins`
        }
      })
      player.switchPlayer()
      console.log(`${activePlayer.name} ` + activePlayer.moves)
    }
  })
}
const game = gameController()
