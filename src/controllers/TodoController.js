const TodoService = require('../services/TodoService');

class TodoController {
    constructor() {
        this.service = new TodoService();
    }
    async list(req, res) {
        const todos = await this.service.list();
        res.json(todos);
    }
    async listByParent(req, res) {
        const { id } = req.params;
        const todos = await this.service.listByParent(id);
        res.json(todos);
    }
    async create(req, res) {
        const todo = await this.service.create(req.body);
        res.status(201).json(todo);
    }
    async update(req, res) {
        const todo = await this.service.update(req.body);
        res.json(todo);
    }
    async remove(req, res) {
        const { id } = req.params;
        await this.service.remove(id);
        res.status(204).send();
    }
}
module.exports = TodoController;