const to = promise => promise
  .then(result => [ null, result ])
  .catch(error => [ error ])

const createHandomId = () => Number((Math.random() * 10000).toFixed())

const checkRepetedId = (newId, idList) => idList
  .some(currentId => currentId === newId)

const setNewId = (idList = []) => {
  let newId

  do {
    newId = createHandomId()
  } while (checkRepetedId(newId, idList))

  return { newId, idList: [...idList, newId] }
}
