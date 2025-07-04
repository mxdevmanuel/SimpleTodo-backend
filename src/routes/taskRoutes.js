import express from 'express';
import TaskController from '../controllers/TaskController.js';
import { createTaskSchema, editTaskSchema } from '../validators/taskValidator.js';

const taskController = new TaskController();
const router = express.Router();

function validateCreateTask(req, res, next) {
  createTaskSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

function validateEditTask(req, res, next) {
  editTaskSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

router.get('/', (req, res) => taskController.list(req, res));
router.get('/project/:id', (req, res) => taskController.listByProject(req, res));
router.post('/', validateCreateTask, (req, res) => taskController.create(req, res));
router.put('/:id', validateEditTask, (req, res) => taskController.update(req, res));
router.delete('/:id', (req, res) => taskController.remove(req, res));

export default router;