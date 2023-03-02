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
  const players = []

  // const markX = createMarker('imgs/x.png')
  // const markO = createMarker('imgs/okta.png')
  function createPlayer (name, marker, moves = []) {
    return {
      name,
      marker,
      moves,
      createMarker (imgSrc) {
        const mark = document.createElement('IMG')
        mark.setAttribute('src', imgSrc)
        mark.setAttribute('width', '100')
        mark.setAttribute('alt', 'marker')
        return mark
      }
    }
  }
  let activePlayer
  const alert = document.getElementById('alert')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('username').value
    const marker = document.getElementById('marker').value
    const player = createPlayer(name, marker)
    if (player.marker === 'X') {
      player.createMarker('imgs/x.png')
    } else if (player.marker === 'O') {
      player.createMarker('imgs/okta.png')
    }
    console.log(player)
    if (players.length === 0) {
      players.push(player)
      alert.textContent = `${player.name} enters the game with ${player.marker}`
    } else {
      if (players.length >= 2) {
        alert.textContent = 'The game has already started'
      } else if (
        players.length < 2 &&
        (players[0].marker === '' || players[0].marker !== player.marker)
      ) {
        players.push(player)
        alert.textContent = `${player.name} enters the game with ${player.marker}`
      } else {
        alert.textContent = 'This marker is taken. Please choose another marker'
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
    alert.textContent = ''
  }
  return {
    switchPlayer,
    getActivePlayer,
    resetPlayers,
    alert
  }
}

function gameController () {
  const board = Gameboard()
  const player = Players()
  const result = player.alert
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
        cell.appendChild(activePlayer.createMarker())
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
