const todos = require('../todo/todos');

const router = require('express').Router();

router.get('/', (request, response) => {
    todos.findAll().then(todos => response.send(todos));
});

router.post('/create', (request, response) => {
    todos.create(request.body.label).then(created => response.send(created));
});

router.put('/update/:id', (request, response) => {
    todos.update(request.params.id, request.body.label).then(updated => {
        if (!updated) {
            return response.status(404).send();
        }
        return response.send(updated);
    });
});

router.delete('/delete/:id', (request, response) => {
    todos.deleteTodo(request.params.id).then(updated => {
        if (!updated) {
            return response.status(404).send();
        }
        return response.send(updated);
    });
});

router.post('/complete/:id', (request, response) => {
    todos.complete(request.params.id, request.body.done).then(updated => {
        if (!updated) {
            return response.status(404).send();
        }
        return response.send(updated);
    });
});

module.exports = router;
