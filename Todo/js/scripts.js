// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');

const todoDate = document.querySelector('#todo-date');

const todoCriador = document.querySelector('#todo-criador');

const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditiBtn = document.querySelector('#cancel-edit-btn');

const searchInput = document.querySelector('#search-input');
const eraseBtn = document.querySelector('#erase-button');
const filterBtn = document.querySelector('#filter-select');

//Salvar na memoria para edição
let oldInputValue;

//Funções
const saveTodo = (text, done = 0, save = 1) => {
  //Criação da div com uma classe
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  //Botões de Edição / Criar parte do HTML  em js
  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish-todo');
  // doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  doneBtn.innerHTML = ' <img src="image/verificar.png" alt="Executado" />';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-todo');
  editBtn.innerHTML = '<img src="image/editar.png" alt="Editar" />';
  todo.appendChild(editBtn);

  const deletBtn = document.createElement('button');
  deletBtn.classList.add('remove-todo');
  deletBtn.innerHTML = '<img src="image/lixo.png" alt="Exluir" />';
  todo.appendChild(deletBtn);

  // utilizando dados da localStorage
  if (done) {
    todo.classList.add('done');
  }
  if (save) {
    saveTodoLocalStorage({ text, done });
  }

  //Adicionar todo o todo a lista  da Div
  todoList.appendChild(todo);

  //Deixa input vazio apos enviar o texto
  todoInput.value = '';
  todoDate.value = '';
  todoCriador.value = '';
  //Focar na caixa do input apos cadastrar
  todoInput.focus();
  todoDate.focus();
  todoCriador.focus();
};

//Esconder itens para a edição
const toggleForms = () => {
  editForm.classList.toggle('hide');
  todoForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll('.todo');

  todos.forEach((todo) => {
    //Selecionando o elemnto depois a propriedade
    let todoTitle = todo.querySelector('h3');

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;

      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

//Função de busca
const getSearchTodos = (search) => {
  const todos = document.querySelectorAll('.todo');

  todos.forEach((todo) => {
    //Selecionando o elemnto depois a propriedade
    let todoTitle = todo.querySelector('h3').innerText.toLowerCase();

    const normalizedSearch = search.toLowerCase();

    todo.style.display = 'flex';

    //Verficar todos que não inclue o search
    if (!todoTitle.includes(normalizedSearch)) {
      //chamada de classe em css no java
      todo.style.display = 'none';
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll('.todo');

  switch (filterValue) {
    //Todos
    case 'all':
      todos.forEach((todo) => (todo.style.display = 'flex'));
      break;

    //feito
    case 'done':
      todos.forEach((todo) =>
        todo.classList.contains('done')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none'),
      );
      break;

    //A fazer
    case 'todo':
      todos.forEach((todo) =>
        !todo.classList.contains('done')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none'),
      );
      break;

    default:
      break;
  }
};

//Eventos

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;
  const inputValue2 = todoDate.value;
  const inputValue3 = todoCriador.value;

  if ((inputValue, inputValue2, inputValue3)) {
    console.log(inputValue);
    // Salvar o todo
    saveTodo(inputValue2.concat(' - ', inputValue3, ': ', inputValue));
  }
});

document.addEventListener('click', (e) => {
  const targetEl = e.target;
  //Selecionar o elemento pai Div mais proximo
  const parentEl = targetEl.closest('div');
  let todoTitle;

  //Salvar na memoria para edição
  if (parentEl && parentEl.querySelector('h3')) {
    todoTitle = parentEl.querySelector('h3').innerText;
  }

  //Completrar tarefas
  if (targetEl.classList.contains('finish-todo')) {
    //toggle serve para habilitar e/ou desabilitar a função
    parentEl.classList.toggle('done');

    updateTodoStatusLocalStorage(todoTitle);
  }

  //Remove tarefas
  if (targetEl.classList.contains('remove-todo')) {
    parentEl.remove();

    removeTodoLocalStorage(todoTitle);
  }

  //Editar tarefas
  if (targetEl.classList.contains('edit-todo')) {
    toggleForms();

    //Salvar na memoria para edição
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

//Botão de cancelar tarefa
cancelEditiBtn.addEventListener('click', (e) => {
  //preventDefault par anão enviar formulario ao clicar no botão
  e.preventDefault();

  toggleForms();
});

//Caixa de edição de tarefas
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    // atualizar
    updateTodo(editInputValue);
  }

  toggleForms();
});

searchInput.addEventListener('keyup', (e) => {
  const search = e.target.value;

  getSearchTodos(search);
});

//Botão de limpeza caixa de pesquisa
eraseBtn.addEventListener('click', (e) => {
  e.preventDefault();

  //Zerar o campo de pesquisa value
  searchInput.value = '';

  searchInput.dispatchEvent(new Event('keyup'));
});

filterBtn.addEventListener('change', (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filterTodos = todos.filter((todo) => todo.text !== todoText);

  localStorage.setItem('todos', JSON.stringify(filterTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null,
  );

  localStorage.setItem('todos', JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null,
  );

  localStorage.setItem('todos', JSON.stringify(todos));
};

loadTodos();
