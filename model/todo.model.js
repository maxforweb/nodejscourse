const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({ 
    label: 'string',
    done: 'boolean'
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = {
    Todo
}