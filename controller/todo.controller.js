const todoService  = require('../service/todo.service');

class TodoController {

    async getTodos() {
        return await todoService.getTodos();
    }

    async createTodo(todo) {
        return await todoService.createTodo(todo);
    }

    async updateTodo(todo) {
        return await todoService.updateTodo(todo);
    }

    async deleteTodo(todoId) {
        return await todoService.deleteTodo(todoId);
    }
}
module.exports = new TodoController();