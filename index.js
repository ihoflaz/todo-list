// SELECTORS//
const toDoInput = document.querySelector(".addClass");
const toDoButton = document.querySelector(".addButton");
const toDoList = document.querySelector(".toDoList1");
const toDoFilter = document.querySelector(".findTodo");






//Alerts//
const alertSuccess = document.querySelector(".alert-success");
const alertEmpty = document.querySelector(".alert-empty");







//Events//
document.addEventListener("DOMContentLoaded", function(){
    getTodos();
})
toDoButton.addEventListener("click", addTodo);
toDoList.addEventListener("click", deletecheck);
toDoFilter.addEventListener("click", filtertodo);



function addTodo(e){

e.preventDefault();

const isEmpty = srt => !srt.trim().length

if(isEmpty(toDoInput.value)){

    alertEmpty.style.display = "block";
    setTimeout(() => {
        alertEmpty.style.display ="none";
        
    }, 3000);
    toDoInput.value ="";
}else {
     alertSuccess.style.display = "block";
     setTimeout(() => {
        alertSuccess.style.display ="none";
     }, 1500);
     saveLocalTodos(toDoInput.value);

     const toDoDiv = document.createElement("div");
     toDoDiv.classList.add("todo");
     
     
     
     
     // create complete buton//
     const completedButton = document.createElement("button");
     completedButton.innerHTML =  "<i class= 'fa-sharp fa-solid fa-check' > </i>";
     completedButton.classList.add("complete-btn");
     toDoDiv.appendChild(completedButton); 
     
     // add new toDo
     const newTodo = document.createElement("li");
     newTodo.innerText = toDoInput.value;
     newTodo.classList.add("item");
     toDoDiv.appendChild(newTodo);
     
     
     // create x button//
     const xButton = document.createElement("button");
     xButton.innerHTML = "<i class='fa fa-minus-circle'></i>";
     xButton.classList.add("trash-btn");
     toDoDiv.appendChild(xButton);
     
     // append to toDo List//
     
     toDoList.appendChild(toDoDiv);
     
     toDoInput.value = "";
    
}



}

function deletecheck(e){

    const item = e.target;

    if(item.classList[0] === "trash-btn"){

        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocaleStorage(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove;
        })
    }

    if(item.classList[0]=== "complete-btn"){

        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


function filtertodo(e){
    const todos = toDoList.childNodes;
    todos.forEach(function(item){
          switch (e.target.value) {
            case "all":
            item.style.display = "flex";
                break;
            case "completed" :
                if(item.classList.contains("completed")){
                    item.style.display = "flex";
                }else{
                    item.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!item.classList.contains("completed")){
                    item.style.display = "flex";
                }else {
                    item.style.display = "none";
                }  
                break;  
          }


    })
}    

function saveLocalTodos (todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    } 

    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos))
}
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    todos.forEach((todo)=> {
        const toDoDiv = document.createElement("div");
     toDoDiv.classList.add("todo");
     
     
     
     
     // create complete buton//
     const completedButton = document.createElement("button");
     completedButton.innerHTML =  "<i class= 'fa-sharp fa-solid fa-check' > </i>";
     completedButton.classList.add("complete-btn");
     toDoDiv.appendChild(completedButton); 
     
     // add new toDo
     const newTodo = document.createElement("li");
     newTodo.innerText = todo;
     newTodo.classList.add("item");
     toDoDiv.appendChild(newTodo);
     
     
     // create x button//
     const xButton = document.createElement("button");
     xButton.innerHTML = "<i class='fa fa-minus-circle'></i>";
     xButton.classList.add("trash-btn");
     toDoDiv.appendChild(xButton);
     


    })
}


function removeLocaleStorage(todo) {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"))
    } 
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}