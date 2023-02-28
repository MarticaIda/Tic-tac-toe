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

const Players = () => {
  const form = document.querySelector('form')
  const body = document.querySelector('body')
  const players = []
  function createPlayer (name, marker, moves = []) {
    return {
      name,
      marker,
      moves
    }
  }
  let activePlayer
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const player = createPlayer(
      document.getElementById('username').value,
      document.getElementById('marker').value
    )
    players.push(player)
    activePlayer = players[0]
    const greeting = document.createElement('span')
    greeting.textContent = `${player.name} enters the game with ${player.marker}`
    body.appendChild(greeting)
  })
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
      if (cell.textContent === '' && !result.textContent.includes('won')) {
        activePlayer.moves.push(cell.id)
        cell.textContent = activePlayer.marker
      }
      // checking against winning combinations
      board.getWinningCombos().forEach((combo) => {
        const match = combo.every((elem) => activePlayer.moves.includes(elem))
        if (match) {
          activePlayer.moves = []
          result.textContent = `Congrats ${activePlayer.name}, you won!`
        }
      })
      player.switchPlayer()
      console.log(`${activePlayer.name} ` + activePlayer.moves)
    }
  })
}
const game = gameController()

// need to make reset
