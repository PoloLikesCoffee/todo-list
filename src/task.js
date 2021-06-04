class Task {
    constructor(taskData) {
        this._id = taskData.id;
        this._title = taskData.title;
        //this._dueDate = taskData.dueDate;
        //this._priority = taskData.priority;
        this._complete = taskData.complete || false;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    } 

    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value.toString();
    }  

    get complete() {
        return this._complete;
    }
    set complete(value) {
        (value) ? this._complete = true : this._complete = false;
    }

    // get dueDate() {
    //     return this._dueDate;
    // }
    // get priority() {
    //     return this._priority;
    // }

    // set dueDate(value) {
    //     if (value < dateStuff.getTodayDate()) {
    //         alert('Since the date is already passed, default value of today = ' + dateStuff.getTodayDate() + '!');
    //         value = dateStuff.getTodayDate();
    //         this._dueDate = value;
    //     } else {
    //         this._dueDate = value;
    //     }
    // }

    // set priority(value) {
    //     this._priority = value.toString();
    // }
    
    toggleComplete() {
        this._complete = !this._complete; 
    }
}

export default Task