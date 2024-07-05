<template>
    <div class="todo-list">
        <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import TodoItem from './TodoItem.vue';

export default defineComponent({
    name: 'TodoList',
    components: {
        TodoItem,
    },
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch('todo/fetchTodos');
        });

        const todos = computed(() => store.state.todo.todos);

        return {
            todos,
        };
    },
});
</script>

<style scoped>
.todo-list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 405px;
    overflow: hidden;
    margin: 0 auto;
}

@media (max-width: 600px) {
    .todo-list {
        padding: 5px;
    }
}
</style>
