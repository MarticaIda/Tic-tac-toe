/* eslint-disable semi */
// eslint-disable-next-line no-unused-vars
const game = (() => {
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

  const cells = document.querySelectorAll('.cell')
  const icons = document.querySelectorAll('img')
  let dragSrcEl = null
  function handleDragStart (e) {
    this.style.opacity = '0.4'
    dragSrcEl = this
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', this.innerHTML)
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
    console.log("hello")
    if (e.stopPropagation) {
      e.stopPropagation()
    }
    if (dragSrcEl !== this) {
      this.innerHTML = dragSrcEl.innerHTML
      dragSrcEl.innerHTML = e.dataTransfer.getData('text/html');

      console.log('hello')
      console.log(dragSrcEl.innerHTML)
      console.log(this.innerHTML)
      // const elem = this.textContent
      // arr.push(elem)
      console.log(this.textContent)
    }
    return false
  }
  cells.forEach((cell) => {
    cell.addEventListener('dragenter', handleDragEnter, false)
    cell.addEventListener('dragleave', handleDragLeave, false)
    cell.addEventListener('drop', handleDrop, false)
  })
  icons.forEach((item) => {
    item.addEventListener('dragstart', handleDragStart, false)
    item.addEventListener('dragend', handleDragEnd, false)
    item.addEventListener('drop', handleDrop, false)
  })
})()

// const Player = (name, age) => {
//   // let win = //game won
//   const getName = () => name
//   const getAge = () => age
//   const setRating = () => {
//     console.log('rating')
//     // rating += win;
//     // return rating
//   }
//   return { name, age, setRating }
// }
