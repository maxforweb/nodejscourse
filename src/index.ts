import express, { Router } from 'express';
import { Collection, Db, DeleteResult, InsertOneResult, MongoClient, UpdateResult, WithId } from 'mongodb';
import { v4 } from 'uuid';

const port = 3000;
const router: Router = Router();
const uri = "mongodb+srv://newuser:1Erpa8sXpfJEPx5Q@gocleancluster.ukkxs.mongodb.net/?retryWrites=true&w=majority";
const client: MongoClient = new MongoClient(uri);

interface ITodo {
    id: string,
    label: string,
    done: boolean
}

router.get('/', async function(req: express.Request, res: express.Response): Promise<void> {
    try {
        await client.connect();
        const db: Db = client.db('nodejscourse');
        const todos: WithId<ITodo>[] = await db.collection<ITodo>('todolist').find().toArray();
        res.json(todos); 
    } catch (err) {
        res.json(err);
    } finally {
        client.close();
    }
})

router.post('/create', async function (req: express.Request, res: express.Response): Promise<void> {
    try {
        await client.connect();

        const db: Db = client.db('nodejscourse');
        const collection: Collection<ITodo> = db.collection<ITodo>('todolist');
        const doc: ITodo = {
            id: v4(),
            label: req.body.label,
            done: req.body.done ? req.body.done : false
        };
    
        const newTodo: InsertOneResult<ITodo> = await collection.insertOne(doc);

        res.json(newTodo);
    } catch (err) {
        res.json(err);
    } finally {
        client.close();
    }
})

router.post('/update', async function(req: express.Request, res: express.Response): Promise<void> {
    try {
        await client.connect();

        const db: Db = client.db('nodejscourse');
        const collection: Collection<ITodo> = db.collection<ITodo>('todolist');

        const filter = { id: req.body.id };

        const doc = { 
            $set: {
                label: req.body.label 
            }
        };

        const updatedTodo: UpdateResult = await collection.updateOne(filter, doc);

        res.json(updatedTodo);
    } catch(err) {
        res.json(err);
    } finally {
        client.close();
    }
})

router.post('/complete', async function(req: express.Request, res: express.Response): Promise<void> {
    try {
        await client.connect();

        const db: Db = client.db('nodejscourse');
        const collection: Collection<ITodo> = db.collection<ITodo>('todolist');

        const filter = { id: req.body.id };

        const todo: WithId<ITodo> | null = await collection.findOne(filter);

        const doc = { 
            $set: {
                done: !todo?.done
            }
        };

        const updatedTodo: UpdateResult = await collection.updateOne(filter, doc);

        res.json(updatedTodo);
    } catch(err) {
        res.json(err);
    } finally {
        client.close();
    }
})

router.delete('/delete', async function(req: express.Request, res: express.Response): Promise<void> {
    try {
        await client.connect();

        const db: Db = client.db('nodejscourse');
        const collection: Collection<ITodo> = db.collection<ITodo>('todolist');

        const filter = { id: req.body.id };

        const updatedTodo: DeleteResult = await collection.deleteOne(filter);
        console.log(`Deleted todo `)
        res.json(updatedTodo);
    } catch(err) {
        res.json(err);
    } finally {
        client.close();
    }
})

const app = express();
app.use(express.json());
app.use(router);
app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`)
})