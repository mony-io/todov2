import { Module } from 'vuex';
import { fetchTodos, addTodo, removeTodo, toggleTodo } from '../services/todoService';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[]; 
}

const todo: Module<TodoState, {}> = {
  namespaced: true,
  state: {
    todos: fetchTodos(),
  },
  
  mutations: {
    setTodos(state, todos: Todo[]) {
      state.todos = todos;
    },

    addTodo(state, todo: Todo) {
      state.todos.push(todo);
    },

    removeTodo(state, id: number) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },

    toggleTodo(state, id: number) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },

  actions: {
    fetchTodos({ commit }) {
      const todos = fetchTodos();
      commit('setTodos', todos);
    },

    addTodo({ commit }, text: string) {
      const todo = addTodo(text);
      commit('addTodo', todo);
    },

    removeTodo({ commit }, id: number) {
      removeTodo(id);
      commit('removeTodo', id);
    },

    toggleTodo({ commit }, id: number) {
      toggleTodo(id);
      commit('toggleTodo', id);
    },
  },
};

export default todo;
