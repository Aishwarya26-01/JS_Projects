// const TodosRemaining = document.querySelector('.TodosRemaining');
// const TodosDone = document.querySelector('.TodosDone');

function saveToLocalStorage(event) {
    event.preventDefault();
    const todoName = event.target.todo.value;
    const des = event.target.description.value;

    const obj = {
        todoName,
        des
    }
     axios.post("https://crudcrud.com/api/a22475f1cae341fca332146d25028717/todo", obj)
     .then((response) => {
        showTodoOnScreen(response.data)
     })
     .catch((error) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
        console.log(error)
     })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/a22475f1cae341fca332146d25028717/todo")
    .then((response) => {
        for(var i=0; i<response.data.length; i++) {
            showTodoOnScreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error);
    })
})

function showTodoOnScreen(todo) {
    document.getElementById('todoName').value='';
    document.getElementById('des').value='';
    
    const parentNode = document.getElementById('listOfTodo');
    const childHtml = `<li id='${todo._id}'>${todo.todoName}
                    <button onclick=deleteTodo('${todo._id}')>&#x2717</button>
                    <button onclick=addTodo('${todo.todoName}','${todo.des}','${todo._id}')>&#x2713</button>
                    </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHtml;
}

// function addTodo(todoName, des, todoId) {
// }

function deleteTodo(todoId) {
    axios.delete(`https://crudcrud.com/api/a22475f1cae341fca332146d25028717/todo/${todoId}`)
    .then((response) => {
        removeTodoFromScreen(todoId);
    })
    .catch((error) => {
        console.log(error);
    })
}

function removeTodoFromScreen(todoId) {
    const parentNode = document.getElementById('listOfTodo');
    const childNodeToBeDeleted = document.getElementById(todoId);
    parentNode.removeChild(childNodeToBeDeleted);
}