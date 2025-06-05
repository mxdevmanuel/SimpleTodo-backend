const ProjectService = require('../services/ProjectService');

class ProjectController {
    constructor() {
        this.service = new ProjectService();
    }

    async list(req, res) {
        const projects = await this.service.list();
        res.json(projects);
    }

    async create(req, res) {
        const project = await this.service.create(req.body);
        res.status(201).json(project);
    }

    async update(req, res) {
        const project = await this.service.update(req.body);
        res.json(project);
    }

    async remove(req, res) {
        const { id } = req.params;
        await this.service.remove(id);
        res.status(204).send();
    }
}

module.exports = ProjectController;