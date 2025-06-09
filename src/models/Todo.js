class Todo {
    constructor({ id, title, completed, task }) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.task = task ?? null;
    }
}
export default Todo;