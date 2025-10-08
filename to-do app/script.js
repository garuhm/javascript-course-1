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
//     modify.classList.add('todo-modify-btns');
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

const addNewTop = document.querySelector(".plus");
addNewTop.addEventListener("click", function(e) {
    if(!addNewTop.classList.contains("clicked")){
        addNewTop.classList.add("clicked")
        const todoContainer = document.querySelector(".todo-container");
        const reset = document.querySelector(".reset");
        const topItems = document.querySelector(".top-items")
        
        setTimeout(() => {
            todoContainer.classList.add("adding");
            topItems.classList.add("adding");
            reset.setAttribute("inactive", "true")
        }, 300)
    }
})

const cancelNew = document.querySelector(".add-buttons .cancel");
cancelNew.addEventListener("click", function(e) {
    cancelNew.classList.add("clicked");
    const reset = document.querySelector(".reset");

    setTimeout(() => {
        todoContainer.classList.remove("adding");
        todoContainer.classList.add("going-back");
        reset.setAttribute("inactive", "false");
        addNewTop.classList.remove("clicked");
    }, 250)

    setTimeout(() => {
        todoContainer.getAnimations().forEach(anim => anim.cancel())
        todoContainer.classList.remove("going-back");
        cancelNew.classList.remove("clicked")
    }, 2000)
})

const todoContainer = document.querySelector(".todo-container")

const doneCheckbox = document.querySelectorAll(".checkbox")
doneCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", function(e) {
        const checkboxImage = checkbox.querySelector("img");
        const clicked = checkboxImage.getAttribute("clicked");

        if(clicked == "false") {
            checkboxImage.setAttribute("src", "images/checkbox-checked.svg")
            checkboxImage.setAttribute("clicked", "true")
            checkbox.setAttribute("clicked", "true")
        } else {
            checkboxImage.setAttribute("src", "images/checkbox.svg")
            checkboxImage.setAttribute("clicked", "false")
            checkbox.setAttribute("clicked", "false")
        }
    })
})

const editEntry = document.querySelectorAll(".todo-modify-btns #edit");
editEntry.forEach((editBtn) => {
    editBtn.addEventListener("click", function(e) {
        const todo = editBtn.parentElement.parentElement.parentElement;
        if(!todo.classList.contains("editing")) {
            todo.classList.add("editing");
        }
    })
})

const deleteEntry = document.querySelectorAll(".todo-modify-btns #delete");
deleteEntry.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function(e) {
        const todo = deleteBtn.parentElement.parentElement.parentElement;
        const moveUpHeight = todo.offsetHeight

        const duration = 1600;

        let moveUpKeyframes = [
            {transform: `translateY(calc(-${moveUpHeight}px - 14px))`}
        ]
        const moveUpAnimation = {
            duration: duration,
            iterations: 1,
            easing: "ease",
            fill: "forwards"
        }

        let deleteKeyframes = [
            {transform: `translateY(calc(-${moveUpHeight}px - 14px))`, opacity: "0"},
        ]
        const deleteAnimation = {
            duration: duration,
            iterations: 1,
            easing: "ease",
            fill: "forwards"
        }
        
        const todos = todo.parentElement;
        const todosHeight = todos.offsetHeight;
        const resizeHeight= todosHeight - moveUpHeight;
        
        const resizeKeyframes = [
            {height: `${todosHeight}px`},
            {height: `calc(${resizeHeight}px - 15px)`}
        ]
        const resizeAnimation = {
            duration: duration,
            iterations: 1,
            easing: "ease",
            fill: "forwards"
        }
        
        todo.setAttribute("deleting", "true")
        const notDeleted = todos.querySelectorAll(".todo");
        
        let below = -1;
        for(let i = 0; i < notDeleted.length; i++){
            if(notDeleted[i].hasAttribute("deleting")) {
                below = i;
                if(moveUpHeight > 86.39){
                    console.log("here")
                    const todoInfo = todo.querySelector(".todo-info");
                    const todoTitleContainer = todoInfo.querySelector(".todo-title-container");

                    todo.style.gridTemplateRows = "1fr 0fr"
                    todoInfo.style.gridTemplateRows = "1fr";
                    todoTitleContainer.style.height = "100%";
                    todoTitleContainer.style.marginBottom = "14px";
                }
                todo.animate(deleteKeyframes, deleteAnimation)
                todos.animate(resizeKeyframes, resizeAnimation)
            }
            if(below !== -1 && i > below){
                if(i == notDeleted.length-1){
                    moveUpKeyframes = {transform: `translateY(calc(-${moveUpHeight}px - 14px))`, marginBottom: "0px"}
                }
                notDeleted[i].animate(moveUpKeyframes, moveUpAnimation)
                notDeleted[i].setAttribute("moving-up", "true")
            }
        }      

        setTimeout(() => {
            
            notDeleted.forEach((notDeletedTodo) => {
                if(!notDeletedTodo.classList.contains("deleting")) {
                    notDeletedTodo.removeAttribute("moving-up")
                    notDeletedTodo.getAnimations().forEach(anim => anim.cancel())
                }
            });
            todos.getAnimations().forEach(anim => anim.cancel())
            todo.remove();
        }, duration)
    })
})

const cancelEditBtns = document.querySelectorAll(".todo-edit-form-btns .cancel");
cancelEditBtns.forEach((cancelEditBtn) => {
    cancelEditBtn.addEventListener("click", function(e) {
        cancelEditBtn.classList.add("clicked");

        setTimeout(() => {
            const todo = cancelEditBtn.parentElement.parentElement.parentElement;
            todo.getAnimations().forEach(anim => anim.cancel())
            todo.classList.remove("editing");
            todo.setAttribute("cancel-edit", 'true');
    
            setTimeout(() => {
                todo.getAnimations().forEach(anim => anim.cancel())
                todo.setAttribute("cancel-edit", "false");
                cancelEditBtn.classList.remove("clicked");
            }, 1500)
        }, 250)

    })
})