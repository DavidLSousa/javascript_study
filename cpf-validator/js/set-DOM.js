const addResultInToDOM = inputValue => {
  listContainer.innerHTML += `
  <div" class="item-list">
    <li data-js="item-list">${inputValue}</li>
    <span class="bin">x</span>
  </div>`
}

const resetInput = event => {
  event.target.reset()
  event.target.input.focus()
}

const removeItem = event => {
  const clickedElement = event.target.parentElement
  
  clickedElement.remove()
}

const setTodosInLocalStorage = () => {
  const cpfData = document.querySelectorAll('[data-js="item-list"]')

  const data = Array.from(cpfData).map(todo => todo.textContent)

  localStorage.setItem('cpfData', JSON.stringify(data))
}