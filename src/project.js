class Project {
    constructor(projectData) {
        this._id = projectData.id;
        this._name = projectData.name;
        this._tasks = projectData.tasks || [];
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value.toString();
    }

    get tasks() {
        return this._tasks;
    }
    set tasks(value) {
        this._tasks = value;
    }
}

export default Project