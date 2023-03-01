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
  const players = []
  function createPlayer (name, marker, moves = []) {
    return {
      name,
      marker,
      moves
    }
  }
  let activePlayer
  const greeting = document.createElement('span')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
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
        players.push(player)
        greeting.textContent = `${player.name} enters the game with ${player.marker}`
        body.appendChild(greeting)
      } else {
        greeting.textContent =
          'This marker is taken. Please choose another marker'
        body.appendChild(greeting)
      }
    }
    if (players[0].marker === 'X') {
      activePlayer = players[0]
    } else {
      activePlayer = players[1]
    }
    form.reset()
  })

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }

  const getActivePlayer = () => activePlayer
  const resetPlayers = () => {
    players.length = 0
    greeting.textContent = ''
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
  const restartBtn = document.getElementById('restart')
  function restart () {
    board.resetBoard()
    player.resetPlayers()
    result.textContent = ''
  }
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
        }
      })
      player.switchPlayer()
      console.log(`${activePlayer.name} ` + activePlayer.moves)
    }
  })
  restartBtn.addEventListener('click', restart)
}
const game = gameController()
