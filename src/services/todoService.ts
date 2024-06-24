interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let nextId = 1;

export function fetchTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}

export function saveTodos(todos: Todo[]): void {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function addTodo(text: string): Todo {
  const todo: Todo = { id: nextId++, text, completed: false };
  const todos = fetchTodos();
  todos.push(todo);
  saveTodos(todos);
  return todo;
}

export function removeTodo(id: number): void {
  let todos = fetchTodos();
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos(todos);
}

export function toggleTodo(id: number): void {
  const todos = fetchTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
}
