import dateStuff from "./dateStuff";

//this takes care of creating and deleting task
class Task {
    constructor(taskData) {
        this._title = taskData.title;
        this._dueDate = taskData.dueDate;
        this._priority = taskData.priority;
        this._completed = taskData.completed;
    }

    get title() {
        return this._title;
    }
    get dueDate() {
        return this._dueDate;
    }
    get priority() {
        return this._priority;
    }
    get completed() {
        return this._completed;
    }

    set title(value) {
        this._title = value.toString();
    }  

    set dueDate(value) {
        if (value < dateStuff.getTodayDate()) {
            alert('Since the date is already passed, default value of today = ' + dateStuff.getTodayDate() + '!');
            value = dateStuff.getTodayDate();
            this._dueDate = value;
        } else {
            this._dueDate = value;
        }
    }

    set priority(value) {
        this._priority = value.toString();
    }
    
    set completed(value) {
        (value) ? this._completed = true : this._completed = false;
    }

    toggleCompleted() {
        this._completed = !this._completed; 
    }
}

export default Task