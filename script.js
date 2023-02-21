/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
function Game (playerOne = 'playerOne', playerTwo = 'playerTwo') {
  const players = [
    { name: playerOne, piece: 'x' },
    { name: playerTwo, piece: 'o' }
  ]
  let activePlayer = players[0]
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }
  const getActivePlayer = () => activePlayer
  function makeMove (row, column, piece) {
    console.log(`${getActivePlayer().name} put ${piece} at ${row} in ${column}`)
    switchPlayer()
  }
  return { makeMove }
}
const play = Game()

const moves = []
const o = document.getElementById('o')
const x = document.getElementById('x')
o.textContent = 'o'
x.textContent = 'x'
const moveBtn = document.querySelector('#moveBtn')
moveBtn.addEventListener('click', makeMove)
function makeMove () {
  const validInput = /[OoXx0]/
  const input = document.querySelector('#move')
  const move = input.value
  if (validInput.test(move)) moves.push(move)
  else alert('Xs and Os only!')
  console.log(move)
  console.log(moves)
  clearInput()
  function clearInput () {
    if (move !== '') {
      input.value = ''
    }
  }
}
const resultBtn = document.querySelector('#resultBtn')
resultBtn.addEventListener('click', countMoves)
function countMoves () {
  const countXs = function (array, value) {
    let count = 0
    array.forEach(function (val) {
      return val === value && count++
    })
    return count
  }
  const countOs = function (array, value) {
    let count = 0
    array.forEach((val) => val === value && count++)
    return count
  }
  const numOfX = countXs(moves, 'x')
  const numOfO = countOs(moves, 'o')
  if (numOfX > numOfO) {
    console.log('X won')
  } else if (numOfX === numOfO) {
    console.log("It's a tie")
  } else {
    console.log('O won')
  }
}

const squares = document.querySelectorAll('.cell')
const icons = document.querySelectorAll('img')

icons.forEach((item) => {
  item.addEventListener('dragstart', handleDragStart)
  item.addEventListener('dragend', handleDragEnd)
  // item.addEventListener('drop', handleDrop)
})

squares.forEach((square) => {
  square.addEventListener('dragenter', handleDragEnter)
  square.addEventListener('dragleave', handleDragLeave)
  square.addEventListener('drop', handleDrop)
})

function handleDragStart (e) {
  e.preventDefault()
  this.style.opacity = '0.4'
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text', e.target.id)
  return e.target.id
}

function handleDragEnd (e) {
  this.style.opacity = '1'
}
function handleDragEnter (e) {
  this.classList.add('over')
}
function handleDragLeave (e) {
  this.classList.remove('over')
}
function handleDrop (e) {
  e.preventDefault()
  const piece = e.dataTransfer.getData('text')
  e.target.appendChild(document.getElementById(piece))
  const square = e.target.idd
  return { piece, square }
}

// const Player = function (name, age) {
//   this.name = name
//   this.age = age
//   let rating = this.age / 5
//   Object.defineProperty(this, 'rating', {
//     get: function () {
//       return rating
//     },
//     set: function (value) {
//       rating = value
//     }
//   })
// }

// const t = new Player('Ben', 33)
// console.log(t.rating)
// t.rating = 50
// console.log(t.rating)
