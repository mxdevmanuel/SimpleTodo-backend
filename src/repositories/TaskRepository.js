import db from '../db/knex.js';
import assert from 'assert';

class TaskRepository {
    constructor() {
        this.table = 'task';
    }

    async list() {
        return db.select().from(this.table);
    }

    async listByProject(id) {
        assert(id);
        return db.select().from(this.table).where({ project: id });
    }

    async create(task) {
        return db.insert({
            title: task.title,
            description: task.description,
            project: task.project,
            completed: task.completed,
            archived: task.archived
        }).into(this.table);
    }

    async update(task) {
        assert(task.id);
        return db(this.table)
            .returning(['id', 'project']).where({ id: task.id }).update({
                title: task.title,
                description: task.description,
                project: task.project,
                completed: task.completed,
                archived: task.archived
            });
    }

    async remove(id) {
        assert(id);
        return db(this.table).where({ id }).del();
    }
}

export default TaskRepository;