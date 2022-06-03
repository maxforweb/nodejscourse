const { connect } = require('../config/db.config');
const { Todo } = require('../model/todo.model');

class TodoService {

    constructor() {
        connect();
    }

    async getTodos() {
        const todos = await Todo.find({});
        return todos;
    }

    async createTodo(todo) {
        let data = {};
        try {
            data = await Todo.create(todo);
        } catch(err) {
            console.log('error', err);
        }
        return data;
    }

    async updateTodo(todo) {
        let data = {};
        try {
            data = await Todo.updateOne(todo);
        } catch(err) {
            console.log('error', err);
        }
        return todo;
    }

    async deleteTodo(todoId) {
        let data = {};
        try {
            data = await Todo.deleteOne({_id : todoId});
        } catch(err) {
            console.log('error', err);
        }
        return todoId;
    }

}

module.exports = new TodoService();