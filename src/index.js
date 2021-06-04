import initializeDOM from "./layout"
import initializeControl from "./controller"

initializeDOM.createLayout();
initializeControl.loadStorage();
initializeControl.render();

//event listeners
    //project
    const newProjectForm = document.querySelector('[data-new-project-form]');
    newProjectForm.addEventListener('submit', initializeControl.submitProject);

    const projectContainer = document.querySelector('[data-projects]');
    projectContainer.addEventListener('click', initializeControl.selectProject);

    const deleteProjectButton = document.querySelector('[data-delete-project-button]');
    deleteProjectButton.addEventListener('click', initializeControl.deleteProject);

    //task
    const newTaskForm = document.querySelector('[data-new-task-form]');
    newTaskForm.addEventListener('submit', initializeControl.submitTask);

    const tasksContainer = document.querySelector('[data-tasks]');
    tasksContainer.addEventListener('click', initializeControl.selectTask);

    const clearCompleteTaskButton = document.querySelector('[data-clear-complete-tasks-button]');
    clearCompleteTaskButton.addEventListener('click', initializeControl.clearCompleteTask);

