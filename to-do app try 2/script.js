let todoCount = JSON.parse(localStorage.getItem("count")) || 0
const todoList = JSON.parse(localStorage.getItem("todos")) || []

function showTodosOnload() {
    const todosContainer = document.querySelector(".todos-container")
    todoList.forEach((entry) => {
        addTodoToHTML(todosContainer, entry)
    })
}
showTodosOnload()

function addTodoToHTML(todosContainer, entry){
    const todo = document.createElement("div")
    todo.classList.add("todo")
    todo.id = entry.id

    const todoData = document.createElement("div")
    todoData.classList.add("todo-data")
    const todoName = document.createElement("p")
    todoName.classList.add("todo-name")
    todoName.innerText = entry.todo
    const todoDate = document.createElement("p")
    todoDate.classList.add("todo-date")
    todoDate.innerHTML = entry.date
    todoData.appendChild(todoName)
    todoData.appendChild(todoDate)

    const deleteBtn = document.createElement("button")
    deleteBtn.type = "button"
    deleteBtn.id = "delete-todo-btn"
    deleteBtn.classList.add("btn")
    deleteBtn.innerHTML = "Delete"

    todo.appendChild(todoData)
    todo.appendChild(deleteBtn)

    todosContainer.appendChild(todo)

    deleteBtnInCode = document.getElementById(`${entry.id}`).querySelector("#delete-todo-btn")
    deleteBtn.addEventListener("click", function(e){
        deleteBtn.classList.add("clicked");
        setTimeout(() => {
            deleteTodo(document.getElementById(`${entry.id}`))
        }, 300)
    })
}

function addTodo() {
    const todoName = document.querySelector("#todo-name-input").value
    const todoDate = document.querySelector("#todo-date-input").value.replaceAll("-", "/")
    if(todoName && todoDate){
        const newTodo = {
            id: todoCount + 1,
            todo: todoName,
            date: todoDate
        }
        todoList.push(newTodo);
        todoCount++;

        localStorage.setItem("count", JSON.stringify(todoCount));
        localStorage.setItem("todos", JSON.stringify(todoList));

        addTodoToHTML(document.querySelector(".todos-container"), newTodo)
    }
}

function deleteTodo(todo) {
    const todoInList = todoList.find(entry => entry.id == todo.id);
    const index = todoList.indexOf(todoInList);
    todoList.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(todoList));
    const todosContainer = document.querySelector(".todos-container")
    todosContainer.removeChild(todo)
}

const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
    btn.addEventListener("click", function(e){
        btn.classList.add("clicked");
        setTimeout(() => {
            btn.classList.remove("clicked")
        }, 600)
    })
})

const addBtn = document.querySelector("#add-todo-btn");
addBtn.addEventListener(("click"), function(e) {
    addTodo();
})