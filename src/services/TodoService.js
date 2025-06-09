import Todo from '../models/Todo.js';
import TodoRepository from '../repositories/TodoRepository.js';

class TodoService {
    constructor() {
        this.repository = new TodoRepository();
    }
    async list() {
        const todos = await this.repository.list();
        return todos.map(todo => new Todo(todo));
    }
    async listByParent(id) {
        const todos = await this.repository.listByParent(id);
        return todos.map(todo => new Todo(todo));
    }
    async create(todo) {
        const _todo = new Todo(todo);
        const id = await this.repository.create(_todo);
        _todo.id = id;
        return _todo;
    }
    async update(todo) {
        await this.repository.update(todo);
        return todo;
    }
    async remove(id) {
        await this.repository.remove(id);
    }
}
export default TodoService;