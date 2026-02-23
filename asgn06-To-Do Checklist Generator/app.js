let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  todos.push({
    id: Date.now(),
    text,
    completed: false,
    editing: false,
  });

  todoInput.value = "";
  saveTodos();
  renderTodos();
}

function toggleComplete(id) {
  const todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}

function startEdit(id) {
  todos.forEach((t) => (t.editing = false));
  const todo = todos.find((t) => t.id === id);
  todo.editing = true;
  renderTodos();
}

function saveEdit(id, newText) {
  if (newText.trim() === "") return;
  const todo = todos.find((t) => t.id === id);
  todo.text = newText.trim();
  todo.editing = false;
  saveTodos();
  renderTodos();
}

function setFilter(newFilter) {
  filter = newFilter;
  renderTodos();
}

function getFilteredTodos() {
  if (filter === "active") return todos.filter((t) => !t.completed);
  if (filter === "completed") return todos.filter((t) => t.completed);
  return todos;
}

function renderTodos() {
  todoList.innerHTML = "";

  getFilteredTodos().forEach((todo) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onclick = () => toggleComplete(todo.id);

    li.appendChild(checkbox);

    if (todo.editing) {
      const editInput = document.createElement("input");
      editInput.value = todo.text;
      editInput.onkeydown = (e) => {
        if (e.key === "Enter") saveEdit(todo.id, editInput.value);
      };

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.className = "small";
      saveBtn.onclick = () => saveEdit(todo.id, editInput.value);

      li.append(editInput, saveBtn);
    } else {
      const span = document.createElement("span");
      span.textContent = todo.text;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "small";
      editBtn.onclick = () => startEdit(todo.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "small";
      deleteBtn.onclick = () => deleteTodo(todo.id);

      li.append(span, editBtn, deleteBtn);
    }

    todoList.appendChild(li);
  });
}

renderTodos();
