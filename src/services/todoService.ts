interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let nextId = initializeNextId();

function initializeNextId(): number {
  const todos = fetchTodos();
  if (todos.length === 0) {
    return 1;
  }
  const maxId = Math.max(...todos.map(todo => todo.id));
  return maxId + 1;
}

function fetchTodos(): Todo[] {
  const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
  const uniqueTodos = Array.from(new Map(todos.map(todo => [todo.id, todo])).values());
  if (uniqueTodos.length !== todos.length) {
    saveTodos(uniqueTodos);
  }
  return uniqueTodos;
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(text: string): Todo {
  const todo: Todo = { id: nextId++, text, completed: false };
  const todos = fetchTodos();
  todos.push(todo);
  saveTodos(todos);
  return todo;
}

function removeTodo(id: number): void {
  let todos = fetchTodos();
  todos = todos.filter(todo => todo.id !== id);
  saveTodos(todos);
}

function toggleTodo(id: number): void {
  const todos = fetchTodos();
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
}

export { fetchTodos, saveTodos, addTodo, removeTodo, toggleTodo };
