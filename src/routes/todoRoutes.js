import express from 'express';
import TodoController from '../controllers/TodoController.js';
import { createTodoSchema, editTodoSchema } from '../validators/todoValidator.js';
const router = express.Router();
const todoController = new TodoController();

function validateCreateTodo(req, res, next) {
  createTodoSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

function validateEditTodo(req, res, next) {
  editTodoSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

router.get('/', (req, res) => todoController.list(req, res));
router.get('/task/:id', (req, res) => todoController.listByParent(req, res));
router.post('/', validateCreateTodo, (req, res) => todoController.create(req, res));
router.put('/:id', validateEditTodo, (req, res) => todoController.update(req, res));
router.delete('/:id', (req, res) => todoController.remove(req, res));

export default router;