import Router from 'express'
import TodoController from '../controllers/todoController.js'

const router = new Router()

router.post('/create', TodoController.create)
router.get('/', TodoController.getAll)
router.put('/update', TodoController.update)
router.delete('/delete', TodoController.delete)
router.put('/complete', TodoController.complete)
router.put('/uncomplete', TodoController.uncomplete)

export default router
