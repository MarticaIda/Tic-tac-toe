function Gameboard () {
  const grid = document.querySelector('grid')
  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cell.setAttribute('id', i)
    cell.setAttribute('class', 'cell')
  }
  const board = document.querySelectorAll('.cell')
  const getBoard = () => board
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
  const getWinningCombos = () => winningCombos
  const resetBoard = () => {
    board.forEach((cell) => (cell.textContent = ''))
    Players().resetPlayers()
  }
  return {
    getBoard,
    getWinningCombos,
    resetBoard
  }
}

const Players = () => {
  const form = document.querySelector('form')
  const body = document.querySelector('body')
  let players = []
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
      if (players.length >= 2) {
        greeting.textContent = 'The game has already started'
        body.appendChild(greeting)
      } else if (
        players.length < 2 &&
        (players[0].marker === '' || players[0].marker !== player.marker)
      ) {
        console.log(players)
        players.push(player)
        greeting.textContent = `${player.name} enters the OTHER game with ${player.marker}`
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
  const resetPlayers = () => {
    players = []
    for (const player of players) {
      player.moves = []
    } // !!!!!!!!
  }
  return {
    switchPlayer,
    getActivePlayer,
    resetPlayers
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
      if (cell.textContent === '' && !result.textContent.includes('won')) {
        activePlayer.moves.push(cell.id)
        cell.textContent = activePlayer.marker
      }
      // checking against winning combinations
      board.getWinningCombos().forEach((combo) => {
        const match = combo.every((elem) => activePlayer.moves.includes(elem))
        if (match) {
          result.textContent = `Congrats ${activePlayer.name}, you won!`
          board.resetBoard()
        }
      })
      player.switchPlayer()
      console.log(`${activePlayer.name} ` + activePlayer.moves)
    }
  })
}
const game = gameController()

// need to make reset
