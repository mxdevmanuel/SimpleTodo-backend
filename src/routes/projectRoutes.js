import express from 'express';
import ProjectController from '../controllers/ProjectController.js';
import { createProjectSchema, editProjectSchema } from '../validators/projectValidator.js';

const projectController = new ProjectController();
const router = express.Router();

function validateCreateProject(req, res, next) {
  createProjectSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

function validateEditProject(req, res, next) {
  editProjectSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch(err => res.status(400).json({ errors: err.errors }));
}

router.get('/', (req, res) => projectController.list(req, res));
router.get('/:id', (req, res) => projectController.get(req, res));
router.post('/', validateCreateProject, (req, res) => projectController.create(req, res));
router.put('/:id', validateEditProject, (req, res) => projectController.update(req, res));
router.delete('/:id', (req, res) => projectController.remove(req, res));

export default router;