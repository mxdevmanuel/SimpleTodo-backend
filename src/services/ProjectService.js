import Project from '../models/Project.js';
import ProjectRepository from '../repositories/ProjectRepository.js';

class ProjectService {
    constructor() {
        this.repository = new ProjectRepository();
    }

    async list() {
        const projects = await this.repository.list();
        return projects.map(project => new Project(project));
    }

    async create(project) {
        const id = await this.repository.create(project);
        return new Project({ ...project, id });
    }

    async update(project) {
        await this.repository.update(project);
        return project;
    }

    async remove(id) {
        await this.repository.remove(id);
    }
}

export default ProjectService;