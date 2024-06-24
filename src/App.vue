<template>
  <div id="app">
    <h1>Todo List</h1>
    <AddForm />
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AddForm from './components/AddForm.vue';
import TodoList from './components/TodoList.vue';

export default defineComponent({
  name: 'App',
  components: {
    AddForm,
    TodoList,
  },
});
</script>

<style>
  @import './style.css';
</style>