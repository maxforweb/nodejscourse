const {MongoClient} = require('mongodb');

const connectToDb = () => MongoClient.connect(process.env.MONGO_TODO_DB_URL);

const connectTodoCollection = db => {
    const dbo = db.db('todo');
    return dbo.collection('todos');
};

const findOne = (collection, filter = {}) => {
    return collection.find(filter, {limit: 1, sort: {'id': -1}})
        .toArray()
        .then(todos => todos[0]);
}

const create = (label) => {
    return connectToDb().then(db => {
        const collection = connectTodoCollection(db);
        return findOne(collection).then(todo => {
            const document = {
                'id': todo.id + 1,
                'label': label,
                'done': false
            };
            return collection.insertOne({...document}).then(() => {
                db.close();
                return document;
            });
        });
    });
};

const update = (id, label) => {
    return updateFields(id, 'label', label)
}

const complete = (id, done) => {
    return updateFields(id, 'done', done)
}

const updateFields = (id, fieldName, fieldValue) => {
    return connectToDb().then(db => {
        const collection = connectTodoCollection(db);
        return findOne(collection, {'id': +id}).then(todo => {
            if (!todo) {
                return null;
            }
            todo[fieldName] = fieldValue;

            return collection.findOneAndUpdate({'id': +id}, {
                $set: {...todo}
            }).then(r => {
                db.close();
                return removeInternalId(todo);
            });
        });
    });
}


const deleteTodo = (id) => {
    return connectToDb().then(db => {
        const collection = connectTodoCollection(db);
        return findOne(collection, {'id': +id}).then(todo => {
            if (!todo) {
                return null;
            }

            return collection.deleteOne({'id': +id}).then(r => {
                db.close();
                return removeInternalId(todo);
            });
        });
    });
}

const findAll = () => {
    return connectToDb().then(db => {
        const collection = connectTodoCollection(db);
        return collection.find().map(todo => removeInternalId(todo)).toArray();
    });
}

const removeInternalId = todoFromDb => {
    const {_id, ...todo} = todoFromDb;
    return todo;
};

exports.create = create;
exports.update = update;
exports.findAll = findAll;
exports.deleteTodo = deleteTodo;
exports.complete = complete;
