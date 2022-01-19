'strict mode'

// Reading the ToDos from localStorage
const getSavedTodos = () => {
    const JSONReadTodo = localStorage.getItem('todoList');
    try{
        const savedTodos = JSONReadTodo ? JSON.parse(JSONReadTodo) : [];
        return savedTodos;
    } catch (e){
        return [];
    }
    
}

// Seting the ToDos to localStorage
const saveTodos = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}

// Deleting a todo
const removeTodo = (id) => {
    const todoIndex = todoList.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todoList.splice(todoIndex, 1);
    }
}

// Changing the state of a todo 
const toggleTodo = (id) => {
    const todo = todoList.find((todo) => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed;
    }
}

//render To-Do app

const RenderTodos = (todoList, filter) => {
    const filteredTodos = todoList.filter((todo) => {
        let searchWordMatch = todo.task.toLowerCase().includes(filter.searchWord.toLowerCase())
        let hideCompleteMatch = !filter.hideComplete || !todo.completed
        return searchWordMatch && hideCompleteMatch
    })

    const unFinishedTodos = filteredTodos.filter((todo) => !todo.completed)

    let todosEl = document.querySelector('#todos')
    todosEl.innerHTML = ''
    todosEl.appendChild(generateDomSummary(unFinishedTodos))

    if (filteredTodos.length !== 0) {
        filteredTodos.forEach((todo) => {
            todosEl.appendChild(GenerateTodoDom(todo));
        })
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-do to show'
        todosEl.appendChild(emptyMessage)
    }
}


//Get the Dom element for a single note
const GenerateTodoDom =(todo) => {
    const todoEl = document.createElement('lable');
    const containerEl = document.createElement('div')
    const taskText = document.createElement('span');
    const checkBoxTask = document.createElement('input');
    const deleteButton = document.createElement('button');

    //setup the checkbox
    checkBoxTask.setAttribute('type', 'checkbox');
    checkBoxTask.addEventListener('change',() => {
        toggleTodo(todo.id);
        saveTodos(todoList);
        RenderTodos(todoList, filter);
    })
    containerEl.appendChild(checkBoxTask);

    //setup the text
    taskText.textContent = todo.task;
    containerEl.appendChild(taskText);
    
    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // setup the delete button
    deleteButton.textContent = 'remove';
    deleteButton.classList.add('button','button--text')
    todoEl.appendChild(deleteButton);
    deleteButton.addEventListener('click',() => {
        removeTodo(todo.id);
        saveTodos(todoList);
        RenderTodos(todoList, filter)
    })

    return todoEl;
}

//Getting DOM summary 
const generateDomSummary =(numberOfTodosLeft) => {
    let newHeadline = document.createElement('h2')
    newHeadline.classList.add('list-title')
    newHeadline.textContent = numberOfTodosLeft.length === 1 ? `You have ${numberOfTodosLeft.length} todo left` : `You have ${numberOfTodosLeft.length} todos left`
    return newHeadline;
}