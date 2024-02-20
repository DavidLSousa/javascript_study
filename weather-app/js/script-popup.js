const popupContainerEl = document.querySelector('[data-js="popup"]')
const btnAddPlaceEl = document.querySelector('[data-js="add-place"]')

const loadPopup = async hrefFromPopupPage => {
  try {
    const rep = await fetch(hrefFromPopupPage)

    if (!rep.ok) throw new Error('404')

    return await rep.text()

  } catch (error) {
    console.log(error.message)
  }
}

const closePopup = divPopup => {
  divPopup.remove()
  popupContainerEl.classList.add('hidden')
}

btnAddPlaceEl.addEventListener('click', async e => {
  e.preventDefault()

  const hrefFromPopupPage = e.target.parentElement.getAttribute('href')

  const htmlPopup = await loadPopup(hrefFromPopupPage)
  
  const divPopup = document.createElement('div')
  divPopup.classList.add('popup')
  popupContainerEl.insertAdjacentElement('afterbegin', divPopup)
  // divPopup.innerHTML = htmlPopup
  $(".popup").html(htmlPopup)
  popupContainerEl.classList.remove('hidden')

  const outPopupEl = document.querySelector('[data-js="out-popup"]')

  outPopupEl.addEventListener('click', e => {
    if (e.target.classList.contains('out-popup')) closePopup(divPopup)
  })
})