const addBtn = document.getElementById("button");
const editButton = addBtn.innerText;
const inputBar = document.getElementById("inputBar");
const recordsDisplay = document.getElementById("listGroup");
let userArray = [];
let edit_id = null;

let objstr = localStorage.getItem('users');
if (objstr != null) {
    userArray = JSON.parse(objstr);
}

displayTodo();

addBtn.onclick = () => {
    const name = inputBar.value.trim();
    if (name === '') {
        alert('Please enter a task.');
        return;
    }

    if (edit_id !== null) {
        userArray[edit_id].name = name; 
        edit_id = null;
    } else {
        userArray.push({ 'name': name }); 
    }

    saveTodo();
    inputBar.value = '';
    addBtn.innerText = editButton;
};

function saveTodo() {
    localStorage.setItem('users', JSON.stringify(userArray));
    displayTodo();
}

function displayTodo() {
    let statement = '';
    userArray.forEach((user, index) => {
        statement += `<li class="listitems">
            <span class="content">${user.name}</span>
            <img class="editicon" src="./images/edit.png" onclick='editTodo(${index})'>
            <img class="deleteicon" src="./images/delete icon.png" onclick='deleteTodo(${index})'>
        </li>`;
    });
    recordsDisplay.innerHTML = statement;
}

function editTodo(id) {
    edit_id = id;
    inputBar.value = userArray[id].name;
    addBtn.innerText = 'Edit';
}

function deleteTodo(id) {
    userArray.splice(id, 1);
    saveTodo();
}