document.addEventListener('DOMContentLoaded', function () {
  loadTodos();
});

function addTodo() {
  const taskInput = document.getElementById('task');
  const categoryInput = document.getElementById('category');
  const deadlineInput = document.getElementById('deadline');

  if (taskInput.value !== '') {
    const todo = {
      task: taskInput.value,
      category: categoryInput.value,
      deadline: deadlineInput.value || 'No Deadline',
    };

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    loadTodos();
    taskInput.value = '';
  }
}

function loadTodos() {
  const todosContainer = document.getElementById('todos');
  todosContainer.innerHTML = '';

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  todos.forEach(function (todo, index) {
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
      <strong>${todo.task}</strong> - ${todo.category} - Deadline: ${todo.deadline}
      <button onclick="editTodo(${index})">Edit</button>
      <button onclick="deleteTodo(${index})">Delete</button>
    `;
    todosContainer.appendChild(todoItem);
  });
}

function deleteTodo(index) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  loadTodos();
}

function editTodo(index) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTask = prompt('Edit the to-do:', todos[index].task);
  
  if (updatedTask !== null) {
    todos[index].task = updatedTask;
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
  }
}

function filterToDo(category) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    if (category !== 'all') {
      todos = todos.filter(todo => todo.category === category);
    }
  
    loadFilteredToDo(todos);
  }
  
  function loadFilteredToDo(filteredTodos) {
    const todosContainer = document.getElementById('todos');
    todosContainer.innerHTML = '';
  
    filteredTodos.forEach(function (todo, index) {
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';
      todoItem.innerHTML = `
        <strong>${todo.task}</strong> - ${todo.category} - Deadline: ${todo.deadline}
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
      `;
      todosContainer.appendChild(todoItem);
    });
  }
  