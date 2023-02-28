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
    const greeting = document.createElement('span')
    const name = document.getElementById('username').value
    const marker = document.getElementById('marker').value
    const player = createPlayer(name, marker)
    if (players.length === 0) {
      players.push(player)
      greeting.textContent = `${player.name} enters the game with ${player.marker}`
      body.appendChild(greeting)
    } else {
      if (players[0].marker === '' || players[0].marker !== player.marker) {
        players.push(player)
        greeting.textContent = `${player.name} enters the game with ${player.marker}`
        body.appendChild(greeting)
      } else {
        greeting.textContent =
          'This marker is taken. Please choose another marker'
        body.appendChild(greeting)
      }
    }
    activePlayer = players[0]
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
