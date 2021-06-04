import Project from "./project"
import Task from "./task"

//module - interaction 
const initializeControl = (function () {
    const local_storage_project_key = 'task.projects';
    const local_storage_selected_project_id_key = 'task.selectedProjectId';
    let myProject = [];
    let selectedProjectId = localStorage.getItem(local_storage_selected_project_id_key);

    //project feature
    const selectProject = (event) => {
        if(event.target.tagName.toLowerCase() === 'li') {
            selectedProjectId = event.target.dataset.listId;
            saveAndRender();
        }
    }

    const deleteProject = (event) => {
        myProject = myProject.filter(project => project.id !== selectedProjectId);
        selectedProjectId = null;
        saveAndRender();
    }

    const submitProject = (event) => {
        event.preventDefault();
        const newProjectInput = document.querySelector('[data-new-project-input]');
        const projectName = newProjectInput.value;
        if (projectName == null || projectName === '') return;
        const project = createProject(projectName);
        newProjectInput.value = null;
        myProject.push(project);
        saveAndRender();
    }

    const createProject = (name) => {
        let project = Object.create(Project.prototype);
        project.id = Date.now().toString();
        project.name = name;
        project.tasks = [];
        return project;
    }

    const saveProject = () => {
        localStorage.setItem(local_storage_project_key, JSON.stringify(myProject));
        localStorage.setItem(local_storage_selected_project_id_key, selectedProjectId);
    }

    const renderProject = (container) => {
        myProject.forEach(project => {
            const projectEl = document.createElement('li');
            projectEl.dataset.listId = project.id;
            projectEl.classList.add('project-name');
            projectEl.innerText = project.name;
            if (project.id === selectedProjectId) {
                projectEl.classList.add('active-list');
            }
            container.appendChild(projectEl);
        });
    }

    //task feature
    const selectTask = (event) => {
        //toggle complete
        if(event.target.dataset.input === 'input') {
            console.log('Toggle complete!');
            const selectedProject = myProject.find(project => project.id === selectedProjectId);
            const selectedTask = selectedProject.tasks.find(task => task.id === event.target.id);
            // //selectedTask.complete = event.target.checked;
            selectedTask.toggleComplete();
            saveProject();
            renderTaskCount(selectedProject);
        }
        //open edit mode
        if (event.target.parentNode.dataset.editTask === 'edit') {
            console.log('Open edit mode!');
            if (event.target.classList.contains('fa-pencil-alt')) {
                event.target.classList.remove('fa-pencil-alt');
                event.target.classList.add('fa-times');
            } else {
                event.target.classList.remove('fa-times');
                event.target.classList.add('fa-pencil-alt');
            }
            const currentTask = event.target.parentNode.parentNode;
            const taskName = currentTask.querySelector('p').innerText;
            const editContainer = currentTask.querySelector('[data-edit-task-container]');
            editContainer.classList.toggle('hidden');
            const editInput = editContainer.querySelector('[data-edit-task-input]');
            editInput.value = taskName;
            //animation
            editContainer.classList.add("appear");
            setTimeout(function() {
                editContainer.classList.remove("appear");
            }, 200);
        }
        //edit and save modification
        if (event.target.parentNode.dataset.validateEditTask === 'validate') {
            console.log("Edited!");
            const currentTask = event.target.parentNode.parentNode.parentNode;
            const editContainer = currentTask.querySelector('[data-edit-task-container]');
            const editInput = editContainer.querySelector('[data-edit-task-input]').value;
            currentTask.querySelector('p').innerText = editInput;
            editContainer.classList.toggle('hidden');

            if (event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.fas').classList.contains('fa-times')) {
                event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.fas').classList.remove('fa-times');
                event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.fas').classList.add('fa-pencil-alt');
            } else {
                event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.fas').classList.remove('fa-pencil-alt');
                event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.fas').classList.add('fa-times');
            }
            
            //save locally
            const selectedProject = myProject.find(project => project.id === selectedProjectId);
            const selectedTask = selectedProject.tasks.find(task => task.id === event.target.parentNode.id);
            selectedTask.name = editInput;
            saveProject();
        }
        
    }

    const clearCompleteTask = (event) => {
        const selectedProjet = myProject.find(project => project.id === selectedProjectId);
        selectedProjet.tasks = selectedProjet.tasks.filter(task => !task.complete);
        saveAndRender();
    }

    const submitTask = (event) => {
        event.preventDefault();
        const newTaskInput = document.querySelector('[data-new-task-input]');
        const taskName = newTaskInput.value;
        if (taskName == null || taskName === '') return;
        const task = createTask(taskName);
        newTaskInput.value = null;
        const selectedProject = myProject.find(project => project.id === selectedProjectId);
        selectedProject.tasks.push(task);
        saveAndRender();
    }

    const createTask = (name) => {
        let task = Object.create(Task.prototype);
        task.id = Date.now().toString();
        task.name = name;
        task.complete = false;
        return task;
    }

    const renderTaskCount = (selectedElement) => {
        const incompleteTaskCounter = selectedElement.tasks.filter(task => !task.complete).length;
        const taskString = incompleteTaskCounter === 1 ? "task" : "tasks";

        const projectCountEl = document.querySelector('[data-project-counter]');
        projectCountEl.innerText = `${incompleteTaskCounter} ${taskString} remaining.`;
        const tooltip = document.querySelector('.counter-container');
        //animation
        tooltip.classList.add("bubble");
        setTimeout(function() {
            tooltip.classList.remove("bubble");
        }, 500);
    }

    const renderTask = (currentProject) => {
        const tasksContainer = document.querySelector('[data-tasks]');
        const taskTemplate = document.getElementById('task-template');
        currentProject.tasks.forEach(task => {
            const taskElement = document.importNode(taskTemplate.content, true);
            const checkbox = taskElement.querySelector('input');
            checkbox.id = task.id;
            checkbox.checked = task.complete;
            const label = taskElement.querySelector('label');
            label.htmlFor = task.id;
            const p = label.querySelector('p');
            p.innerText = task.name;
            //label.append(task.name);
            const validate = taskElement.querySelector('.validate');
            validate.id = task.id;
            tasksContainer.appendChild(taskElement);
        });
    }

    //global feature
    const saveAndRender = () => {
        saveProject();
        render();
    }

    const isEmpty = (elem) => { 
        return document.querySelector(elem).innerHTML.trim() == "";
    }

    const render = () => {
        const projectList = document.querySelector('[data-projects]');
        clearElement(projectList);
        renderProject(projectList);

        const tasksContainer = document.querySelector('[data-tasks]');
        const projectTitleEl = document.querySelector('[data-project-title]');
        const selectedProject = myProject.find(project => project.id === selectedProjectId);
        const projectDisplayContainer = document.querySelector('[data-project-display-container]');

        if(isEmpty('.project-container ul')) {
            console.log('empty!');
            projectDisplayContainer.style.display = 'none';
        } else if (!isEmpty('.project-container ul') && selectedProject == null) {
            projectDisplayContainer.style.display = 'none';
        } else {

            projectDisplayContainer.style.display = '';
            projectTitleEl.innerText = selectedProject.name;
            renderTaskCount(selectedProject);
            clearElement(tasksContainer);
            renderTask(selectedProject);
            //animation
            projectDisplayContainer.classList.add("animate");
            setTimeout(function() {
                projectDisplayContainer.classList.remove("animate");
            }, 500);
        }

        // if (selectedProject == null) {
        //     projectDisplayContainer.getElementsByClassName.display = 'none';
        // } else {
        //     projectDisplayContainer.style.display = '';
        //     renderTaskCount(selectedProject);
        //     clearElement(tasksContainer);
        //     renderTask(selectedProject);
        // }
        
        //console.log(isEmpty('.project-container ul'));
        
        //display the tasks of the selected project
        
        // if(isEmpty('.project-container ul')) {
        //     //console.log('empty!');
        //     projectDisplayContainer.style.display = 'none';
        // } else {
        //     //console.log('not empty!');
        //     projectDisplayContainer.style.display = '';
        //     //const projectTitleEl = document.querySelector('[data-project-title]');
        //     const tasksContainer = document.querySelector('[data-tasks]');
        //     //projectTitleEl.innerText = selectedProject.name;
        //     renderTaskCount(selectedProject);
        //     clearElement(tasksContainer);
        //     renderTask(selectedProject);
        // }

        // if (selectedProject === undefined && selectedProjectId == null) {
        //     projectDisplayContainer.style.display = 'none';
        // } else {
        //     projectDisplayContainer.style.display = '';
        //     //const projectTitleEl = document.querySelector('[data-project-title]');
        //     const tasksContainer = document.querySelector('[data-tasks]');
        //     //projectTitleEl.innerText = selectedProject.name;
        //     renderTaskCount(selectedProject);
        //     clearElement(tasksContainer);
        //     renderTask(selectedProject);
        // }
    }

    const loadStorage = () => {
        if(!localStorage.getItem(local_storage_project_key)) {
            localStorage.setItem(local_storage_project_key, JSON.stringify(myProject));
        } else {
            myProject = JSON.parse(localStorage.getItem(local_storage_project_key));
            let tempArray = [];
            myProject.forEach(objectToConvert => {
                let convertedObjectToProject = Object.create(Project.prototype);
                for(const element in objectToConvert) {
                    convertedObjectToProject[element] = objectToConvert[element];
                    
                    //tasks inside each project
                    if (Array.isArray(objectToConvert[element])) {
                        let temp = [];
                        objectToConvert[element].forEach(object => {
                            let convertedObjectToTask = Object.create(Task.prototype);
                            for (const el in object) {
                                convertedObjectToTask[el] = object[el];
                            }
                            temp.push(convertedObjectToTask);
                            return temp;
                        });
                        objectToConvert[element].splice(0, objectToConvert[element].length, ...temp);
                        //objectToConvert[element] = temp;
                    }
                }
                tempArray.push(convertedObjectToProject);
                return tempArray;
            });
            myProject = tempArray;
        }
    }

    const clearElement = (element) => {
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    return {
        render,
        submitProject,
        selectProject,
        deleteProject,
        submitTask,
        selectTask,
        clearCompleteTask,
        loadStorage
    };

})();

export default initializeControl