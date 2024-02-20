const form = document.querySelector('.form')
const input = document.querySelector('.input')
const results = document.querySelector('.results')

form.addEventListener('click', event => {
  event.preventDefault()

  const lastClickedBtn = event.target.textContent
  
  if (lastClickedBtn === 'C') return input.value = clear()
  if (lastClickedBtn === 'del') return input.value = del(input.value)

  if (lastClickedBtn === 'x') {
    event.target.parentElement.remove()

    setInfoInLocalStorage()
  }

  if (lastClickedBtn === '=') {
    const fullEquation = resolve(input.value)
    addResultInToDOM(fullEquation)

    setInfoInLocalStorage()
    return
  }

  if (event.target.classList.contains('button')) input.value += lastClickedBtn
})

const listResults = JSON.parse(localStorage.getItem('listResults'))

if (listResults) {
  listResults.forEach((item, index) => {
    console.log(item[index])
    addResultInToDOM(item[index])
  });
}