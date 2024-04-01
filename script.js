const localStorageKey = 'to-do-list';


function showDiv() {
    let list = document.getElementById('to-do-list');
    let divList = document.querySelector('.container-body');
   
    divList.hidden = list.children.length === 0;
}


function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue);
    return exists ? true : false;
}


function newTask() {
    let input = document.getElementById('input-new-task');
    let inputFinal = input.value.trim();

    if (!input.value) {
        alert('Digite algo para inserir em sua lista');
    } else if (inputFinal.length === 0) {
        alert('Por favor insira um valor válido');
    } else {
        let taskId = input.getAttribute('data-task-id');
        if (!taskId) {
            if (!validateIfExistsNewTask()) {
                let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
                values.push({
                    name: input.value
                });
                localStorage.setItem(localStorageKey, JSON.stringify(values));
                showValues();
            } else {
                alert('Já existe uma task com essa descrição');
            }
        } else {
            editExistingTask(taskId, input.value);
        }
    }
    input.value = '';
}


function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        let completedClass = values[i].completed ? 'completed-task' : '';
        list.innerHTML += `
        <li>
            <span class="${completedClass}">${values[i]['name']}</span>
            <div style="display:flex; justify-content: space-between; gap: 8px; padding-bottom: 5px; padding-top:10px">
                <button id='button-toggle' onclick='toggleCompleted("${values[i]['name']}")'> ✓ </button>
                <button id='button-edit' onclick='editItem("${values[i]['name']}")'> ../ </button>
                <button id='button-ok' onclick='removeItem("${values[i]['name']}")'> X </button>
            </div>
        </li>`;
    }
    showDiv();
}


function toggleCompleted(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == data);
    values[index].completed = !values[index].completed; 
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}


function removeItem(data) {
    let confirmation = confirm('Deseja realmente excluir? ');
    if (confirmation) {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        let index = values.findIndex(x => x.name == data);
        values.splice(index, 1);
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
}


function editItem(data) {
    let input = document.getElementById('input-new-task');
    input.value = data;
    input.setAttribute('data-task-id', data);
    input.focus();
}


function editExistingTask(taskId, newText) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == taskId);
    if (index !== -1) {
        values[index].name = newText;
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
}


showValues();