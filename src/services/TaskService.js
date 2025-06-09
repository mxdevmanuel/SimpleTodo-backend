import Task from '../models/Task.js';
import TaskRepository from '../repositories/TaskRepository.js';

class TaskService {
    constructor() {
        this.repository = new TaskRepository();
    }

    async list() {
        const tasks = await this.repository.list();
        return tasks.map(task => new Task(task));
    }

    async listByProject(id) {
        const tasks = await this.repository.listByProject(id);
        return tasks.map(task => new Task(task));
    }

    async create(task) {
        const _task = new Task({ ...task })
        const id = await this.repository.create(_task);
        _task.id = id;
        return _task;
    }

    async update(task) {
        await this.repository.update(task);
        return task;
    }

    async remove(id) {
        await this.repository.remove(id);
    }
}

export default TaskService;