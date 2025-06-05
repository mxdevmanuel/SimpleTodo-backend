const TaskService = require('../services/TaskService');

class TaskController {
    constructor() {
        this.service = new TaskService();
    }

    async list(req, res) {
        const tasks = await this.service.list();
        res.json(tasks);
    }

    async listByProject(req, res) {
        const { id } = req.params;
        const tasks = await this.service.listByProject(id);
        res.json(tasks);
    }

    async create(req, res) {
        const task = await this.service.create(req.body);
        res.status(201).json(task);
    }

    async update(req, res) {
        const task = await this.service.update(req.body);
        res.json(task);
    }

    async remove(req, res) {
        const { id } = req.params;
        await this.service.remove(id);
        res.status(204).send();
    }
}

module.exports = TaskController;