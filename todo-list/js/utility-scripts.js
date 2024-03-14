const to = promise => promise
  .then(result => [ null, result ])
  .catch(error => [ error ])

const createHandomId = () => Number((Math.random() * 10000).toFixed())

const checkRepetedId = (newId, idList) => idList
  .some(currentId => Number(currentId) === Number(newId))

const setNewId = (...idList) => {
  let newId

  do {
    newId = createHandomId()
  } while (checkRepetedId(newId, idList))

  return { newId, idList: [...idList, newId] }
}


// console.log('Utility testes:')

// const arr1 = [111, 222, 333] 
// const arr2 = [444, 555, 666] 

// console.log(arr1, arr2)

// console.log(setNewId(...arr1))

export {
  to, 
  setNewId
}