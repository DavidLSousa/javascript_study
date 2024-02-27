/*
- Precisa ajustar a ação no erro da fecthForGetKey
*/

const fecthForGetKey = async () => {
  const [ error, result ] = await to(fetch('http://localhost:3000/key'))

  if (error) return log(error.message)

  const { apikey } = await result.json()
  return apikey
}

const getUrlData = async inputValue => {
  const apiKey = await fecthForGetKey()
  return `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${inputValue}&language=pt-br`
}

const getUrlCityInfo = async key => {
  const apiKey = await fecthForGetKey()
  return `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${apiKey}&language=pt-BR`
}

const fetchAPI = async url => {
  const [ error, result ] = await to(fetch(url))

  if (error) return error.message

  return await result.json()
}

// Featch Weather

const fetchWeatherData = async inputValue => await fetchAPI(await getUrlData(inputValue))

const fecthCityInfo = async inputValue => {
  const [{ Key }] = await fetchWeatherData(inputValue)
  
  return await fetchAPI(await getUrlCityInfo(Key)) 
}