const calculate = inputValue => {
  try {
    const hasLetters = /[a-z]+/g.test(inputValue)
    return hasLetters ? 'Expressão inválida :(' : eval(inputValue)
  } catch (error) {
    return 'Expressão inválida :('
  }
}

const resolve = inputValue => {
  const count = inputValue
  const result = calculate(inputValue)

  if (result === undefined) return inputValue = 0
  if (result === 'Expressão inválida :(') return result
  
  inputValue = result

  return `${count} = ${result}`
}

const addResultInToDOM = fullEquation => {
  results.innerHTML += `
    <div class="row item-list">
      <blockquote data-js="item" class="column column-100">${fullEquation}</blockquote>
      <span class="bin">x</span>
    </div>`

  
}

const clear = () => ''
const del = inputValue => [...inputValue].slice(0, -1).join('')

const setInfoInLocalStorage = () => {
  const listOfResults = document.querySelectorAll('[data-js="item"]')
    const data = Array.from(listOfResults)
      .map((item, index) => ( { [index]: item.innerText } ))
    localStorage.setItem('listResults', JSON.stringify(data))
}