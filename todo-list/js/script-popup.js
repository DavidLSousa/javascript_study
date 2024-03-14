import { setNewId } from './utility-scripts.js'

const resetLocalStorage = (() => {
  localStorage.setItem('ids', JSON.stringify([]))
  localStorage.setItem('indexs', JSON.stringify([]))
})()

const state = (() => {
  let currentId = 0
  let currentIndex = 0

  return {
    getCurrentId: () => currentId,    
    setCurrentId: savedListId => {
      const { newId, idList } = setNewId(savedListId)
      currentId = newId
      return idList
    },

    getCurrentIndex: () => currentIndex,    
    setCurrentIndex: savedListIndex => {
      const { newId, idList } = setNewId(savedListIndex)
      currentIndex = newId
      return idList
    }

  }
})()

const gridTaskListEl = document.querySelector('[data-js="grid-task-list"]')
const btnNewTaskListEl = document.querySelector('[data-js="new-task-list"]')

const popupContainerNewEl = document.querySelector('[data-js="popup-new"]')
const popupContainerAddEl = document.querySelector('[data-js="popup-add"]')
const popupContainerEditEl = document.querySelector('[data-js="popup-edit"]')

const formNewTaskListEl = document.querySelector('[data-form="new-taks-list"]')
const formAddTaskEl = document.querySelector('[data-form="add-taks"]')
const formEditTaskEl = document.querySelector('[data-form="edit-taks"]')

// Funcs
const setColorStatus = taskStatusEdited => {
  switch (taskStatusEdited) {
    case 'PENDENTE':
      return 'yellow'
    case 'CONCLUÍDO':
      return 'green'
    case 'EM ANDAMENTO':
      return 'blue'
  }
}

const openPopup = popup => {
  popup.classList.remove('hidden')
}

const closePopup = popup => {
  popup.classList.add('hidden')
}

const addEventToClosePopup = (popup, namePopup) => { // Close Popup 
  popup.addEventListener('click', e => {
    if (e.target.dataset.js === namePopup) popup.classList.add('hidden')
  })
}

const setValuesInputToEdit = () => {
  const atualContent = document.querySelector(`[data-index-content="${state.getCurrentIndex()}"]`).textContent
  const atualStatus = document.querySelector(`[data-index-status="${state.getCurrentIndex()}"]`).children[0].textContent

  document.querySelector('[data-js="content"]').value = atualContent
  document.querySelector('[data-js="status"]').value = atualStatus
}

const removeTaskList = id => {
  const containerTaskListEl = document.querySelector(`[data-container-id="${id}"]`)
  containerTaskListEl.remove()
}

const removeUnitTask = () => {
  const TaskToRemoveEl = document.querySelector(`[data-index="${state.getCurrentIndex()}"]`)
  TaskToRemoveEl.remove()
}

const getHTMLTaskList = (id, index, taskName, taskContent, taskStatus, colorStatus) => `
    <div data-container-id="${id}" class="relative max-w-md w-full p-4 mx-auto bg-white shadow-md rounded-md mb-4 justify-between">
      <div class="flex items-center justify-between mb-4"> 
        <h2 class="text-2xl font-semibold">${taskName}</h2>
        <button data-id="${id}" data-js="del-task-list" class="p-2 text-gray-600 hover:text-red-500">
          <i data-id="${id}" data-js="del-task-list" class="material-icons">close</i>
        </button>
      </div>

      <div>
        <div class="flex mb-2">
          <ul data-js="task-list" data-id-list="${id}" class="list-none max-w-md w-full">
            <div data-js="task" data-index="${index}" data-task-id="${id}" class="shadow-md rounded-md p-2 mr-2 mb-2 bg-gray-100 flex items-center justify-between">
              <div class="pr-3 max-w-md w-full">
                <p data-index="${index}" data-index-content="${index}" class="text-justify">${taskContent}</p>
                <p data-index="${index}" data-index-status="${index}" class="text-right"><span class="px-2 bg-${colorStatus}-100">${taskStatus}</span></p>
              </div>
              <button data-js="edit-task" data-index="${index}" class="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 flex justify-center items-center">
                <i data-js="edit-task" data-index="${index}" class="material-icons">edit</i>
              </button>
            </div>

          </ul>
        </div>
        
        <div data-js="add-task" data-id="${id}" class="bg-gray-800 rounded-md cursor-pointer hover:bg-gray-600 flex justify-center items-center">
          <button data-js="add-task" data-id="${id}" class="text-white p-2">
            Add Task
          </button>
        </div>
      </div>
    </div>
  `

const getHTMLEditTask = (taskContent, taskStatus, colorStatus, index) => `
    <div class="pr-3 max-w-md w-full">
      <p data-index="${index}" data-index-content="${index}" class="text-justify">${taskContent}</p>
      <p data-index="${index}" data-index-status="${index}" class="text-right"><span class="px-2 bg-${colorStatus}-100">${taskStatus}</span></p>
    </div>
    <button data-js="edit-task" data-index="${index}" class="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 flex justify-center items-center">
      <i data-js="edit-task" data-index="${index}" class="material-icons">edit</i>
    </button>
  `

const getHTMLAddTask = (taskContent, taskStatus, colorStatus, indexToNewTask, id) => `
    <div data-js="task" data-index="${indexToNewTask}" data-task-id="${id}" class="shadow-md rounded-md p-2 mr-2 mb-2 bg-gray-100 flex items-center justify-between">
      <div class="pr-3 max-w-md w-full">
        <p data-index="${indexToNewTask}" data-index-content="${indexToNewTask}" class="text-justify">${taskContent}</p>
        <p data-index="${indexToNewTask}" data-index-status="${indexToNewTask}" class="text-right">
          <span class="px-2 bg-${colorStatus}-100">${taskStatus}</span>
        </p>
      </div>
      <button data-js="edit-task" data-index="${indexToNewTask}" class="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 flex justify-center items-center">
        <i data-js="edit-task" data-index="${indexToNewTask}" class="material-icons">edit</i>
      </button>
    </div>
  `

// Listeners
btnNewTaskListEl.addEventListener('click', () => { // New Task List
  openPopup(popupContainerNewEl)
  addEventToClosePopup(popupContainerNewEl, 'out-popup-new')
})

document.addEventListener('click', e => { // Edit Task
  const { js, index } = e.target.dataset
  if (js !== 'edit-task') return 

  // currentIndex = index

  setValuesInputToEdit()

  openPopup(popupContainerEditEl)
  addEventToClosePopup(popupContainerEditEl, 'out-popup-edit')
})
document.addEventListener('click', e => { // Add Task
  const { js, id } = e.target.dataset
  if (js !== 'add-task') return

  // currentId = id

  openPopup(popupContainerAddEl)
  addEventToClosePopup(popupContainerAddEl, 'out-popup-add')
})
document.addEventListener('click', e => { // Deletes
  const { js, id } = e.target.dataset

  if (js === 'del-task-list') {
    const savedIds = JSON.parse(localStorage.getItem('ids'))
    const remainingIds = savedIds.filter(savedId => savedId !== Number(id))
    localStorage.setItem('ids', JSON.stringify(remainingIds))

    const savedIndexs = JSON.parse(localStorage.getItem('indexs'))
    const listIndexs = Array
      .from(document.querySelectorAll(`[data-task-id="${id}"]`))
      .map(task => Number(task.dataset.index))
    const remainingIndexs = savedIndexs
      .filter(savedIndex => !listIndexs
      .some(index => index === savedIndex))
    localStorage.setItem('indexs', JSON.stringify(remainingIndexs))

    removeTaskList(id)
    return 
  }

  if (js === 'del-task') {
    const savedIndexs = JSON.parse(localStorage.getItem('indexs'))
    const remainingIndexs = savedIndexs
      .filter(savedIndex => savedIndex !== Number(state.getCurrentIndex()))
    localStorage.setItem('indexs', JSON.stringify(remainingIndexs))

    removeUnitTask()
    closePopup(popupContainerEditEl)
    return 
  }
})

formNewTaskListEl.addEventListener('submit', e => { // FORM - New Task List
  e.preventDefault()
  
  const taskName = DOMPurify.sanitize(e.target.taskName.value)
  const taskContent = DOMPurify.sanitize(e.target.taskContent.value)
  const taskStatus = DOMPurify.sanitize(e.target.taskStatus.value.toUpperCase())
  const colorStatus = setColorStatus(taskStatus)

  if (localStorage.getItem('ids')) {
    console.log(state.setCurrentId([]))
  } else {
    state.setCurrentId(JSON.parse(localStorage.getItem('ids')))
  }

  if (localStorage.getItem('ids')) {
    state.setCurrentIndex()
  } else {
    state.setCurrentId(JSON.parse(localStorage.getItem('indexs')))
  }
  
  const id = state.getCurrentId()
  const index = state.getCurrentIndex()

  if (localStorage.getItem('ids')) {
    const savedIds = JSON.parse(localStorage.getItem('ids'))
    savedIds.push(id)
    localStorage.setItem('ids', JSON.stringify(savedIds))

    const savedIndexs = JSON.parse(localStorage.getItem('indexs'))
    savedIndexs.push(index)
    localStorage.setItem('indexs', JSON.stringify(savedIndexs))

  } else { 
    localStorage.setItem('ids', JSON.stringify([ id ]))
    localStorage.setItem('indexs', JSON.stringify([ index ]))
  }


  const htmlTaskList = DOMPurify.sanitize(getHTMLTaskList(id, index, taskName, taskContent, taskStatus, colorStatus))
  gridTaskListEl.innerHTML += htmlTaskList

  e.target.reset()
  closePopup(popupContainerNewEl)
})
formEditTaskEl.addEventListener('submit', e => { // FORM - Edit Task
  e.preventDefault()
  
  const taskContent = DOMPurify.sanitize(e.target.taskContent.value)
  const taskStatus = DOMPurify.sanitize(e.target.taskStatus.value)
  const colorStatus = setColorStatus(taskStatus)
  
  const htmlEditTask = DOMPurify.sanitize(getHTMLEditTask(taskContent, taskStatus, colorStatus, state.getCurrentIndex()))
  
  const taskToEdit = document.querySelectorAll(`[data-index="${state.getCurrentIndex()}"]`)[0]
  taskToEdit.innerHTML = htmlEditTask

  closePopup(popupContainerEditEl)
})
formAddTaskEl.addEventListener('submit', e => { // FORM - Add Task
  e.preventDefault()

  const taskList = document.querySelector(`[data-id-list="${state.getCurrentId()}"]`)
  state.setCurrentIndex(JSON.parse(localStorage.getItem('indexs')))
  const indexToNewTask = state.getCurrentIndex()

  const savedIndexs = JSON.parse(localStorage.getItem('indexs'))
  savedIndexs.push(indexToNewTask)
  localStorage.setItem('indexs', JSON.stringify(savedIndexs))

  const taskContent = DOMPurify.sanitize(e.target.taskContent.value)
  const taskStatus = DOMPurify.sanitize(e.target.taskStatus.value.toUpperCase())
  const colorStatus = setColorStatus(taskStatus)

  const htmlAddTask = DOMPurify.sanitize(getHTMLAddTask(taskContent, taskStatus, colorStatus, indexToNewTask, state.getCurrentId()))
  taskList.innerHTML += htmlAddTask

  e.target.reset()
  closePopup(popupContainerAddEl)
})

/*
  [x] Botão de Excluir Lista
  [x] Botão de Excluir TASK
  [x] Apgar os inputs dos FORMS depois de enviar
  [x] setNewId
  [x] State IIFE para var global
  [x] DOMPurify
  [ ] Local Storage
*/

/* Storage
  [x] Ao remover um alista de task, precisa ser removida o storage todas as task 
      dessa lista
  [ ] Isso realemnte vai ficar salvo no storage?
*/

/*
  Id -> Esta ligado a lista de tarefa
    [x] É definido no New task List
  index -> Esta ligado a cada tarefa da lista
    [x] O primeiro é definido na New Task List
    [x] A partir do segundo é da Add task

  [ ] Ambos precisa ser passados na lista do setNewId para validar como únicos
  
  OBS: PRECISA SE APENAS UM ARRAY, NÃO FAZ DIFERENÇA SE É INDEX OU NÃO, SÓ 
    IMPORTA N SER IGUAL
*/