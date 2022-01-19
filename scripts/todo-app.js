'strict mode'

let todoList = getSavedTodos()

const filter = {
  searchWord : '',
  hideComplete : false
}

RenderTodos(todoList, filter)

document.querySelector('#add-todo').addEventListener('submit',(e) =>{
  e.preventDefault()
  let taskName = e.target.elements.textTodo.value.trim();
  if (taskName !== ''){
    todoList.push({
      id : uuidv4(),
      task : taskName,
      completed : false
    })
    RenderTodos(todoList,filter)
    saveTodos(todoList)
    taskName = '';
  } else {
    alert('Please add some title to your task')
  }
  
})

document.querySelector('#search-todo').addEventListener('input',(e) =>{
 filter.searchWord = e.target.value
 RenderTodos(todoList,filter)
})

document.querySelector('#hide-complete').addEventListener('change',(e) => {
  filter.hideComplete = e.target.checked
  RenderTodos(todoList,filter)
})
  
