const form = document.querySelector('.form')
const input = document.querySelector('.input')
const listContainer = document.querySelector('.list-container')

// data-js="item-list"

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.input.value

  addResultInToDOM(inputValue)

  setTodosInLocalStorage()
  
  resetInput(event)
})

listContainer.addEventListener('click', event => {
  if (event.target.classList.contains('bin')) {
    removeItem(event)
    setTodosInLocalStorage()
  }
})

const todoData = JSON.parse(localStorage.getItem('todoData'))
if (todoData) todoData.forEach(item => addResultInToDOM(item))