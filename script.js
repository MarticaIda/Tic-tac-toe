// winning logic
const gameboard = document.querySelectorAll('.cell')

// const gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = gameboard
const winningCombos = [
  [c1, c2, c3],
  [c4, c5, c6],
  [c7, c8, c9],
  [c1, c4, c7],
  [c2, c5, c8],
  [c3, c6, c9],
  [c1, c5, c9],
  [c3, c5, c7]
]

const playerXMoves = [c1, c2, c5, c3]
const playerOMoves = [c4, c6, c7, c9]
winningCombos.forEach((combo) => {
  const match = combo.every((elem) => playerXMoves.includes(elem))
  if (match) {
    console.log('yes')
  }
})

winningCombos.forEach((combo) => {
  const match = combo.every((elem) => playerOMoves.includes(elem))
  if (match) {
    console.log('yes')
  }
})
// players
const playerX = 'Player X'
const playerO = 'Player O'
const players = [
  { name: playerX, piece: 'x' },
  { name: playerO, piece: 'o' }
]
let activePlayer = players[0]
const switchPlayer = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0]
}
function getActivePlayer () {
  return activePlayer
}

// placing game pieces

gameboard.forEach((cell) => {
  cell.addEventListener('click', printId)
  function printId () {
    getActivePlayer()
    if (activePlayer === players[0]) console.log(`${cell.id} - X`)
    else if (activePlayer === players[1]) console.log(`${cell.id} - O`)
    switchPlayer()
  }
})
