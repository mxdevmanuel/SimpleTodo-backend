class Task {
    constructor({ id, title, description, project, children, completed, archived }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.project = project ?? null;
        this.children = children ?? [];
        this.completed = completed ?? false;
        this.archived = archived ?? false;
    }
}
export default Task;