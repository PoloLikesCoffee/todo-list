import initializeControl from "./controller"

//Module - layout app
const initializeDOM = (function () {
    
    const createHeader = () => {
        const header = document.createElement('div');
        header.innerHTML = `Todo List`;
        header.classList.add('header');

        return header;
    }

    const createProjectContainer = () => {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        projectContainer.innerHTML = `
            <h2 class="project-list-title">私のリスト</h2>
            <ul class="project-list" data-projects>
            
            </ul>
            
            <form action="" data-new-project-form>
                <input 
                    type="text" 
                    class="new project"
                    maxlength="22"
                    data-new-project-input
                    placeholder="新しいプロジェクト名"
                    aria-label="new project name"
                />
                <button class="btn create" aria-label="create new project"><i class="fas fa-folder-plus"></i></button>
            </form>
        `;

        return projectContainer;
    }

    const createTodoContainer = () => {
        const todoContainer = document.createElement('div');
        todoContainer.classList.add('task-container');
        todoContainer.setAttribute('data-project-display-container', '');

        todoContainer.innerHTML = `
            <div class="todo-header">
                <h2 class="project-title" data-project-title></h2>
                <div class="counter-container">
                    <p class="task-counter" data-project-counter></p>
                    <span class="triangle"></span>
                </div>
            </div>

            <div class="todo-body">
                <div class="tasks" data-tasks>
                
                </div>

                <div class="new-task-creator">
                    <form action="" data-new-task-form>
                        <input 
                            type="text" 
                            data-new-task-input
                            maxlength="40"
                            class="new task"
                            placeholder="新しいタスク名"
                            aria-label="new task name"
                        />
                        <button class="btn create create-task" aria-label="create new task"><i class="fas fa-plus"></i></button>
                    </form>
                </div>

            </div>

            <div class="delete-stuff">
                <button class="btn delete" data-clear-complete-tasks-button><i class="fas fa-tasks"></i> Clear completed tasks</button>
                <button class="btn delete" data-delete-project-button><i class="fa fa-minus-square"></i> Delete project</button>
            </div>

            <template id="task-template">
                <div class="task">
                    <input
                        data-input="input"
                        type="checkbox" />
                    <label>
                        <span class="custom-checkbox"></span>
                        <p></p>
                    </label>
                    <button class="btn edit" data-edit-task="edit"><i class="fas fa-pencil-alt"></i></button>
                    <div class="edit-container hidden" data-edit-task-container>
                        
                        <button class="btn validate" data-validate-edit-task="validate"><i class="fas fa-check"></i></button>
                        <input type="text" maxlength="40" data-edit-task-input>
                        <!--<textarea rows="1" cols="20" maxlength="20" data-edit-task-input>-->
                        
                    </div>
                </div>
            </template>
        `;
        return todoContainer;
    }

    const createLayout = () => {
        const content = document.getElementById('content');

        content.append(createHeader(), createProjectContainer(), createTodoContainer());
    }

    return {
        createLayout
    };
})();

export default initializeDOM