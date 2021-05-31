import Task from "./task";
import initializeForm from "./form";
import dateStuff from "./dateStuff";
import initializeDOM from "./DOM"

//this module takes care of the list of tasks, display the list, ...
const taskFeature = (function () {
    
    let todoList = [];

    const addTaskToList = (task) => {
        todoList.push(task);
        localStorage.setItem('localList', JSON.stringify(todoList));
        updateTodoListDisplay();
    }

    const updateTodoListDisplay = () => {
        initializeDOM.updateList();
        let index = 0;

        todoList.forEach(item => {
            let task = document.createElement('div');
            task.classList.add('task');
            task.setAttribute('data-index', index);
            item.index = index;
    
            task.innerHTML = initializeDOM.createDOMTask();
            
            const main = task.querySelector('.main');
            let mainTitle = main.querySelector('.main-title');
            let mainDueDate = main.querySelector('.main-dueDate');
            let mainPriority = main.querySelector('.main-priority');
    
            mainTitle.innerText = item.title;
            mainDueDate.innerText = item.dueDate;
            mainPriority.innerText = item.priority;

            const inputComplete = task.querySelector('.input-complete');
            inputComplete.setAttribute("id", ("complete" + index));
            inputComplete.addEventListener("change", checkCompleted);
            if (item.completed) {
                inputComplete.setAttribute("checked", "checked");
                task.classList.toggle('completed');
                const tools = task.querySelector('.tools');
                tools.classList.toggle('completed');
                const deleteButton = task.querySelector('.dlt-button-card');
                deleteButton.classList.toggle('completed');
                const editButton = task.querySelector('.edit-button-card');
                editButton.classList.toggle('completed');
            }

            const tools = task.querySelector('.tools');
            initializeDOM.setPriorityColor(item, tools);

            const editButton = task.querySelector('.edit-button-card');
            editButton.addEventListener('click', openEditMenu);
            const validateButton = task.querySelector('.validate-edit');
            validateButton.addEventListener('click', editTask);
            const closeButton = task.querySelector('.close-edit');
            closeButton.addEventListener('click', closeEditMenu);
            const deleteButton = task.querySelector('.dlt-button-card');
            deleteButton.addEventListener('click', deleteTask);

            appendList(item.dueDate, task);
            index++;
        });
    }

    const submitNewTask = (event) => {
        event.preventDefault();
        let task = Object.create(Task.prototype);

        task.title = event.target.elements['title'].value;
        task.dueDate = event.target.elements['dueDate'].value;
        task.priority = event.target.elements['priority'].value;
        task.completed = false;
        
        addTaskToList(task);
        initializeForm.clearForm(event);
        initializeForm.openForm();
        console.log(todoList);
    }

    const checkCompleted = (event) => {
        let taskIndex = event.currentTarget.parentNode.parentNode.dataset.index;
        todoList[taskIndex].toggleCompleted();
        console.log(todoList);
        initializeDOM.completedDisplay(event);
        localStorage.setItem('localList', JSON.stringify(todoList));
    }

    const openEditMenu = (event) => {
        //disable edit button
        event.currentTarget.disabled = true;
        
        let currentTask = event.currentTarget.parentNode.parentNode;
        const edit = currentTask.querySelector('.edit-task');
        
        //disable delete button
        const deleteButton = currentTask.querySelector('.dlt-button-card');
        deleteButton.disabled = true;

        //display edit menu
        currentTask.classList.toggle("edit");
        edit.classList.toggle("hidden");

        //get the values of the current task
        const tt = edit.querySelector('.task-title');
        const td = edit.querySelector('.task-dueDate');
        const tp = edit.querySelector('.task-priority');
        tt.value = currentTask.querySelector('.main-title').innerText;
        td.value = currentTask.querySelector('.main-dueDate').innerText;
        tp.value = currentTask.querySelector('.main-priority').innerText;
    }

    const editTask = (event) => {
        let currentTask = event.currentTarget.parentNode.parentNode;
        const edit = currentTask.querySelector('.edit-task');
        
        //update values of current task
        const tt = edit.querySelector('.task-title').value;
        const td = edit.querySelector('.task-dueDate').value;
        const tp = edit.querySelector('.task-priority').value;

        //change
        currentTask.querySelector('.main-title').innerText = tt;
        if (td < dateStuff.getTodayDate()) {
            currentTask.querySelector('.main-dueDate').innerText = dateStuff.getTodayDate();
            appendList(td, currentTask);
        } else {
            currentTask.querySelector('.main-dueDate').innerText = td;
            appendList(td, currentTask);
        }
        currentTask.querySelector('.main-priority').innerText = tp;

        let currentTaskIndex = event.currentTarget.parentNode.parentNode.dataset.index;
        todoList[currentTaskIndex].title = tt;
        todoList[currentTaskIndex].dueDate = td;
        todoList[currentTaskIndex].priority = tp;

        const tools = currentTask.querySelector('.tools');
        initializeDOM.setPriorityColor(todoList[currentTaskIndex], tools);
        console.log(todoList);
        currentTask.classList.toggle("edit");
        edit.classList.toggle("hidden");

        //enable edit and delete button
        const editButton = currentTask.querySelector('.edit-button-card');
        editButton.disabled = false;
        const deleteButton = currentTask.querySelector('.dlt-button-card');
        deleteButton.disabled = false;
        localStorage.setItem('localList', JSON.stringify(todoList));
    }

    const closeEditMenu = (event) => {
        let currentTask = event.currentTarget.parentNode.parentNode;
        const edit = currentTask.querySelector('.edit-task');
        currentTask.classList.toggle("edit");
        edit.classList.toggle("hidden");

        //enable edit and delete button
        const editButton = currentTask.querySelector('.edit-button-card');
        editButton.disabled = false;
        const deleteButton = currentTask.querySelector('.dlt-button-card');
        deleteButton.disabled = false;
    }

    const deleteTask = (event) => {
        let taskIndex = event.currentTarget.parentNode.parentNode.dataset.index;
        todoList.splice(taskIndex, 1);
        console.log(todoList);
        localStorage.setItem('localList', JSON.stringify(todoList));
        updateTodoListDisplay();
    }

    const appendList = (date, element) => {
        if (date < dateStuff.getTodayDate()) {
            const pastContent = document.querySelector('.past-content');
            pastContent.append(element);
        } else if (date === dateStuff.getTodayDate()) {
            const todayContent = document.querySelector('.today-content');
            todayContent.append(element);
        } else if (date === dateStuff.getTomorrowDate()) {
            const tomorrowContent = document.querySelector('.tomorrow-content');
            tomorrowContent.append(element);
        } else if (date > dateStuff.getTomorrowDate()) {
            const upcomingContent = document.querySelector('.upcoming-content');
            upcomingContent.append(element);
        }
    }

    const updateNumber = (parent) => {
        // const pastContent = document.querySelector('.past-content');
        // const todayContent = document.querySelector('.today-content');
        // const tomorrowContent = document.querySelector('.tomorrow-content');
        // const upcomingContent = document.querySelector('.upcoming-content');
        const nbPast = document.querySelector('.number-past');
        const nbToday = document.querySelector('.number-today');
        const nbTomorrow = document.querySelector('.number-tomorrow');
        const nbUpcoming = document.querySelector('.number-upcoming');

        let relevantChildren = 0;
        let children = parent.childNodes.length;

        for(let i=0; i < children; i++){
            if(parent.childNodes[i].nodeType != 3){
                relevantChildren++;
            }
        }
        
        if (parent == document.querySelector('.past-content')) {
            return nbPast.textContent = relevantChildren;
        } else if (parent == document.querySelector('.today-content')) {
            return nbToday.textContent = relevantChildren;
        } else if (parent == document.querySelector('.tomorrow-content')) {
            return nbTomorrow.textContent = relevantChildren;
        } else if (parent == document.querySelector('.upcoming-content')) {
            return nbUpcoming.textContent = relevantChildren;
        } 
    }

    const updateCounter = () => {
        let homeCountNumber = 0;
        for(let i =0; i < todoList.length; i++) {
            let item = todoList[i];
            console.log(item);
            if(item.completed == false) {
                homeCountNumber++;
            }
        }
        const counter = document.querySelector('.counter');
        counter.textContent = homeCountNumber;
        // re-set count display
        counter.style.display = 'inline-flex';
        if (counter.textContent < 1) {
            // hide count display if 0
            counter.style.display = 'none';
        }
    }

    //localStorage feature
    function loadStorage() {
        // check if the local library is empty
        if(!localStorage.getItem('localList')) {
            localStorage.setItem('localList', JSON.stringify(todoList));
        } else {
            todoList = JSON.parse(localStorage.getItem('localList'));
            console.log(todoList);
            let tempArray = [];
            todoList.forEach(objectToConvert => {
                let convertedObjectToTask = Object.create(Task.prototype);
                for(const element in objectToConvert) {
                    convertedObjectToTask[element] = objectToConvert[element];
                }
                console.log(convertedObjectToTask);

                tempArray.push(convertedObjectToTask);
                return tempArray;
            });
            todoList = tempArray;
        }
    }

    return {
        loadStorage,
        updateTodoListDisplay,
        submitNewTask,
        updateNumber,
        updateCounter
    }
})();

export default taskFeature