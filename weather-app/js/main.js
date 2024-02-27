/*
É possivel melhor o mecanismo de busca das cidades? Prodondo nomes ou corrigindo
  Precisa verificar se o nome da cidae é válido antes de salvar no local storage

COMO PRECISAR DE MENOS DATA-ID
*/ 

const formWeather = document.querySelector('[data-js="form-weather"]')
const gridPlaces = document.querySelector('[data-js="gridPlaces"]')

// Verifications
const checkRepetedCity = (cities, cityName) => {
  return cities.some(({ cityName: currentCityName }) =>  
    currentCityName.toLowerCase() === cityName.toLowerCase())
}

const getArrWithoutClickedCity = (cities, cityName) => {
  return cities.filter(({ cityName: currentCityName }) => 
    currentCityName.toLowerCase() !== cityName.toLowerCase())
}

// DOM
const setColor = IsDayTime => {
  return IsDayTime 
    ? [ 'from-yellow-300', 'to-yellow-50' ]
    : [ 'from-gray-700', 'to-blue-300' ]
}

const getHTMLCityCard = ({
  WeatherText, 
  WeatherIcon, 
  Temperature,
  colorBgInitial, 
  colorBgFinal,
  newId,
  cityName
  }) => `
  <div data-id="${newId}" data-js="item-list" class="relative max-w-md w-full p-4 mx-auto bg-gradient-to-r ${colorBgInitial} ${colorBgFinal} shadow-md rounded-md mb-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center"> 
        <button>
          <img data-id="${newId}" data-js="pin-fix" data-city="${cityName}" class="transform rotate-45 mr-2" src="./assets/icons_google/push_pin.svg" alt="">
        </button>
        <h2 class="text-2xl font-semibold">${cityName}</h2>
      </div>
      <button class="p-2 text-gray-600 hover:text-red-500">
        <i data-id="${newId}" data-js="close-card" class="material-icons">close</i>
      </button>
    </div>
    <div class="flex flex-col items-center">
      <div class="flex items-center justify-evenly w-full">
        <img src="./assets/icons/${WeatherIcon}.svg" alt="icon-weather">
        <p class="text-5xl">${Temperature.Metric.Value}</p>
      </div>
      <div class="text-center">
        <p class="text-xl">${WeatherText}</p>
      </div>
    </div>
  </div>
  `

const addCitiestoDOM = async citiesInfo => {
  const citiesCards = []

  for (let i = 0; i < citiesInfo.length; i++) {
    const { cityName, cityId: newId } = citiesInfo[i]

    const {
      WeatherText,
      WeatherIcon,
      Temperature,
      colorBgInitial,
      colorBgFinal,
    } = await fecthAPI(cityName)

    const currentCityInfo = {
      WeatherText,
      WeatherIcon,
      Temperature,
      colorBgInitial,
      colorBgFinal,
      newId,
      cityName,
    }

    const cityCard = getHTMLCityCard(currentCityInfo)
    citiesCards.push(cityCard)
  }

  gridPlaces.innerHTML += citiesCards.join(" ")
}

const addCitytoDOM = async cityName => {
  const {
    WeatherText,
    WeatherIcon,
    Temperature,
    colorBgInitial,
    colorBgFinal,
  } = await fecthAPI(cityName)

  const newId = getNewId()

  const currentCityInfo = {
    WeatherText,
    WeatherIcon,
    Temperature,
    colorBgInitial,
    colorBgFinal,
    newId,
    cityName,
  }

  const cityCard = getHTMLCityCard(currentCityInfo)

  gridPlaces.innerHTML += cityCard
}

// API
const fecthAPI = async cityName => {
  const [{ IsDayTime , WeatherText, WeatherIcon, Temperature }] = await 
  fecthCityInfo(cityName)
  const [ colorBgInitial, colorBgFinal ] = setColor(IsDayTime)

  return {
    WeatherText, 
    WeatherIcon, 
    Temperature, 
    colorBgInitial, 
    colorBgFinal
  }
}

// ID
const getNewId = () => {
  const currentIdList = Array.from(document
    .querySelectorAll('[data-js="item-list"]'))
    .map(cityEl => Number(cityEl.dataset.id))
  
  const { newId } = setNewId(currentIdList)

  return newId
}

const getIdToRemove = idToCheck => {
  const currentIdList = Array.from(document
    .querySelectorAll('[data-js="item-list"]'))
    .map(cityEl => Number(cityEl.dataset.id))

  const [ idCardToRemove ] = currentIdList.filter(id => id === Number(idToCheck))

  return idCardToRemove
}

// Storage
const setStorage = stringify => localStorage.setItem('citiesInfo', stringify)

const removeCityFromStorage = idCardToRemove => {
  const citiesAdded = JSON.parse(localStorage.getItem('citiesInfo'))
  if (!citiesAdded) return 

  const remainingCities = citiesAdded
    .filter(({ cityId }) => Number(cityId) !== Number(idCardToRemove))

  setStorage(JSON.stringify(remainingCities))
}

// Reset
const resetInput = e => {
  e.target.reset()
  e.target.input.focus()
}

// Functions listeners
const handleInput = async e => {
  e.preventDefault()
  const inputCityName = e.target.input.value.trim()

  if (!inputCityName) return alert('input inválido')

  addCitytoDOM(inputCityName)

  resetInput(e)
}

const handleStorage = e => { 
  const { js, city: cityName, id: cityId } = e.target.dataset

  if (!(js === 'pin-fix')) return

  const citiesAdded = JSON.parse(localStorage.getItem('citiesInfo'))
  const storageIsEmpty = !localStorage.getItem('citiesInfo')
  
  if (storageIsEmpty)
    return setStorage(JSON.stringify([{ cityName, cityId }]))

  if (checkRepetedCity(citiesAdded, cityName)) 
    return setStorage(JSON.stringify(getArrWithoutClickedCity(citiesAdded, cityName)))

  const newCityToAddToStorage = { cityName, cityId }
  citiesAdded.push(newCityToAddToStorage)

  setStorage(JSON.stringify(citiesAdded))
}

const removeCity = e => { 
  const { js, id } = e.target.dataset

  if (!(js === 'close-card')) return

  const idCardToRemove = getIdToRemove(id)
  
  const cardToRemove = document.querySelector(`[data-id="${idCardToRemove}"]`)
  cardToRemove.remove()

  removeCityFromStorage(idCardToRemove)
}

// Listeners
formWeather.addEventListener('submit', handleInput)
document.addEventListener('click', handleStorage)
document.addEventListener('click', removeCity) 

const init = (() => {
  if (JSON.parse(localStorage.getItem('citiesInfo')).length) {
    const citysadded = JSON.parse(localStorage.getItem('citiesInfo'))
    addCitiestoDOM(citysadded) 
  }
})()