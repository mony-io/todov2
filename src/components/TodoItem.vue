<template>
    <div class="todo-item">
        <input type="checkbox" v-model="completed" @change="toggleTodo" />
        <span :class="{ completed: completed }">{{ todo.text }}</span>
        <button @click="removeTodo" class="remove-button">Remove</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'TodoItem',
    props: {
        todo: {
            type: Object as () => { id: number, text: string, completed: boolean },
            required: true,
        },
    },
    setup(props) {
        const store = useStore();
        const completed = ref(props.todo.completed);

        watch(() => props.todo.completed, (newVal) => {
            completed.value = newVal;
        });

        const toggleTodo = () => {
            store.dispatch('todo/toggleTodo', props.todo.id);
        };

        const removeTodo = () => {
            store.dispatch('todo/removeTodo', props.todo.id);
        };

        return {
            completed,
            toggleTodo,
            removeTodo,
        };
    },
});
</script>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
}

.todo-item input[type="checkbox"] {
    margin-right: 10px;
}

.todo-item .completed {
    text-decoration: line-through;
    color: #888;
}

.todo-item .remove-button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
}

.todo-item .remove-button:hover {
    background-color: #c0392b;
}
</style>
