// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
        const editInput = document.querySelector("#edit-input");
const cancelEditiBtn = document.querySelector("#cancel-edit-btn");

//Salvar na memoria para edição
let oldInputValue;

//Funções
const saveTodo = (text) => {

    //Criação da div com uma classe
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    //Botões de Edição / Criar parte do HTML  em js
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deletBtn = document.createElement("button");
    deletBtn.classList.add("remove-todo");
    deletBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deletBtn);
    

    //Adicionar todo o todo a lista  da Div
    todoList.appendChild(todo);

    //Deixa input vazio apos enviar o texto
    todoInput.value = "";
    //Focar na caixa do input apos cadastrar
    todoInput.focus();
};

//Esconder itens para a edição
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")  ;
    
    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};

//Eventos

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        console.log(inputValue);
        // Salvar o todo
        saveTodo(inputValue);
    }
});


document.addEventListener("click", (e) => {

    const targetEl = e.target;
    //Selecionar o elemento pai Div mais proximo
    const parentEl = targetEl.closest("div");
    let todoTitle;

    //Salvar na memoria para edição
    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    //Completrar tarefas
    if (targetEl.classList.contains("finish-todo")) {
        //toggle serve para habilitar e/ou desabilitar a função
        parentEl.classList.toggle("done");
    }
    
    //Remove tarefas
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    //Editar tarefas
    if(targetEl.classList.contains("edit-todo")) {
        toggleForms();

        //Salvar na memoria para edição
        editInput.value =  todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditiBtn.addEventListener("click", (e) => {
    //preventDefault par anão enviar formulario ao clicar no botão
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue) {
        // atualizar
        updateTodo(editInputValue)
    }

    toggleForms();

});