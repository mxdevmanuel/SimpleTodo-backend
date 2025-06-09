import db from '../db/knex.js';
import assert from 'assert';

class TodoRepository {
    constructor() {
        this.table = 'todo';
    }
    async list() {
        return db.select().from(this.table);
    }
    async listByParent(id) {
        assert(id);
        return db.select().from(this.table).where({ task: id });
    }
    async create(todo) {
        return db.insert({
            title: todo.title,
            completed: todo.completed,
            task: todo.task
        }).into(this.table);
    }
    async update(todo) {
        assert(todo.id);
        return db(this.table).where({ id: todo.id }).update({
            title: todo.title,
            completed: todo.completed,
            task: todo.task
        });
    }
    async remove(id) {
        assert(id);
        return db(this.table).where({ id }).del();
    }
}
export default TodoRepository;