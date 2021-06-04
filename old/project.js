class Project {
    constructor(projectData) {
        this._title = projectData.title;
    }

    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value.toString();
    }
}

export default Project