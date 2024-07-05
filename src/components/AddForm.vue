<template>
    <div>
        <input v-model="newTodoText" @keyup.enter="addTodo" @input="onInputChange"
            :class="{ 'error-border': isTodoEmpty && isSubmitted }" placeholder="What needs to be done?" />
        <button @click="addTodo">Add Todo</button>
        <p v-if="isTodoEmpty && isSubmitted" style="color: red;">This field is required</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'AddForm',
    setup() {
        const store = useStore();
        const newTodoText = ref('');
        const isSubmitted = ref(false);

        const isTodoEmpty = computed(() => !newTodoText.value.trim());

        const addTodo = () => {
            isSubmitted.value = true;
            if (!isTodoEmpty.value) {
                store.dispatch('todo/addTodo', newTodoText.value);
                newTodoText.value = '';
                isSubmitted.value = false;
            }
        };

        const onInputChange = () => {
            isSubmitted.value = false;
        };

        return {
            newTodoText,
            addTodo,
            isTodoEmpty,
            isSubmitted,
            onInputChange,
        };
    },
});
</script>

<style scoped>
input {
    margin-right: 6px;
    padding: 10px 5px;
    width: 300px;
}

button {
    padding: 9px;
}

.error-border {
    border: 1px solid red;
}
</style>
