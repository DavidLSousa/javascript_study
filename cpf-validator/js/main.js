const form = document.querySelector('.form')
const input = document.querySelector('.input')
const listContainer = document.querySelector('.list-container')

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.input.value

  const validateCPF = new ValidateCPF()
  validateCPF.cpf = inputValue
  const isValid = validateCPF.initValidation() ? ' é válido' : ' é inválido'

  addResultInToDOM(inputValue + isValid)

  setTodosInLocalStorage()
  
  resetInput(event)
})

listContainer.addEventListener('click', event => {
  if (event.target.classList.contains('bin')) {
    removeItem(event)
    setTodosInLocalStorage()
  }
})

const cpfData = JSON.parse(localStorage.getItem('cpfData'))
if (cpfData) cpfData.forEach(item => addResultInToDOM(item))