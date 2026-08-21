import api from './api';

async function getTodos(page = 1){
    const response = await api.get(
        `/todos/?page=${page}`
    );
    return response.data;
}

async function getTodo(id) {
    const response = await api.get(
        `/todos/${id}`  
    );
    return response.data;
}

async function createTodo(todoData){
    const response = await api.post(
        '/todos/create/',
        todoData
    );
    return response.data;
}

async function updateTodo(id,todoData){
    const response = await api.patch(
        `/todos/${id}/`,
        todoData
    );
    return response.data;
}

async function deleteTodo(id){
    await api.delete(
        `/todos/${id}/`
    );
}
export {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}