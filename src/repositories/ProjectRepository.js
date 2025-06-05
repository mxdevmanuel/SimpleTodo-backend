const db = require('../db/knex');
const assert = require('assert');

class ProjectRepository {
    constructor() {
        this.table = 'project';
    }

    async list() {
        return db.select().from(this.table);
    }

    async create(project) {
        return db.insert({ name: project.name }).into(this.table);
    }

    async update(project) {
        assert(project.id);
        return db(this.table).where({ id: project.id }).update({ name: project.name });
    }

    async remove(id) {
        assert(id);
        return db(this.table).where({ id }).del();
    }
}

module.exports = ProjectRepository;