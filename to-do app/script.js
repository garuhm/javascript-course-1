// load all todos
// skip if key entry is the one for the total amount lifetime

// const todosKeys = Object.keys(localStorage) || {};
// todosKeys.forEach((todoKey) => {
//     console.log(localStorage.getItem(todoKey))
//     const todo = JSON.parse(localStorage.getItem(todoKey));
//     console.log(todo.title)

//     const containerDiv = document.querySelector(".todo-container")

//     const todoDiv = document.createElement("div")
//     todoDiv.classList.add("todo")
//     todoDiv.id = todoKey

//     const checkBox = document.createElement('div');
//     checkBox.classList.add('checkbox');
//     const checkBoxImg = document.createElement('img');
//     checkBoxImg.src = "images/checkbox.svg";
//     checkBoxImg.id="checkbox"
//     checkBoxImg.clicked = "false"
//     checkBox.appendChild(checkBoxImg);

//     const titleDiv = document.createElement('div');
//     const title = document.createElement('p')
//     titleDiv.classList.add('todo-title-container');
//     title.innerHTML = todo.title;
//     titleDiv.appendChild(title)

//     const modify = document.createElement('div');
//     modify.classList.add('todo-modify');
//     const editImg = document.createElement('img');
//     editImg.src = "images/edit.svg";
//     editImg.id = "edit";
//     const deleteImg = document.createElement('img');
//     deleteImg.src = "images/delete.svg";
//     deleteImg.id = "delete";
//     modify.appendChild(editImg);
//     modify.appendChild(deleteImg);

//     todoDiv.appendChild(checkBox);
//     todoDiv.appendChild(titleDiv);
//     todoDiv.appendChild(modify);

//     containerDiv.appendChild(todoDiv)
// })

const doneCheckbox = document.querySelectorAll(".checkbox")
doneCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", function(e) {
        const checkboxImage = checkbox.querySelector("img");
        const clicked = checkboxImage.getAttribute("clicked");
        console.log(clicked)

        if(clicked == "false") {
            checkboxImage.setAttribute("src", "images/checkbox-checked.svg")
            checkboxImage.setAttribute("clicked", "true")
        } else {
            checkboxImage.setAttribute("src", "images/checkbox.svg")
            checkboxImage.setAttribute("clicked", "false")
        }
    })
})
