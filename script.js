window.onload = function () {
  const gameboard = document.querySelectorAll('.cell')
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = gameboard
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

  let playerXMoves = []
  let playerOMoves = []

  const result = document.getElementById('result')
  // placing game pieces

  gameboard.forEach((cell) => {
    cell.addEventListener('click', makeMove)
    function makeMove () {
      getActivePlayer()
      if (cell.textContent === '') {
        if (activePlayer === players[0]) {
          playerXMoves.push(cell.id)
          cell.textContent = 'X'
        } else if (activePlayer === players[1]) {
          playerOMoves.push(cell.id)
          cell.textContent = 'O'
        }
      }
      // checking against winning combinations
      winningCombos.forEach((combo) => {
        const match = combo.every((elem) => playerXMoves.includes(elem))
        if (match) {
          // stop the game, reset gameboard, +clear player moves arrays
          playerXMoves = []
          playerOMoves = []
          result.textContent = 'X wins'
        }
      })
      winningCombos.forEach((combo) => {
        const match = combo.every((elem) => playerOMoves.includes(elem))
        if (match) {
          playerXMoves = []
          playerOMoves = []
          result.textContent = 'O wins'
        }
      })
      if (result.textContent.includes('win')) {
        console.log('shit')
        gameboard.forEach((cell) => (cell.textContent = ''))
        result.textContent = ''
      }
      switchPlayer()
      console.log(playerXMoves)
      console.log(playerOMoves)
    }
  })
}
