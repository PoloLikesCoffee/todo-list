import initializeForm from "./form";
import taskFeature from "./taskFeature";
import projectFeature from "./projectFeature";

//this module takes care of the creation of the element of the html
const initializeDOM = (function () {
    
    //header
    const createHeader = () => {
        const header = document.createElement('div');
        header.innerHTML = `Todo<br> List`;
        header.classList.add('header');

        return header;
    }
    
    //sidebar
    const createSideBar = () => {
        const sideBar = document.createElement('div');
        sideBar.id = 'sidebar';

        const sideBarContent = ['Home', 'Projects'];
        sideBarContent.forEach(item => {
        let sideBarItem = document.createElement('div');
        sideBarItem.classList.add('sidebar-item');
        sideBarItem.setAttribute('data-tab', item);
        sideBarItem.innerText = item;
        if (item == 'Home') {
            const counter = document.createElement('p');
            counter.classList.add('counter');
            counter.innerText = '0';
            sideBarItem.appendChild(counter);
        }
        // if (item == sideBarContent[0]) {
        //     sideBarItem.classList.add('active');
        // }
        sideBar.appendChild(sideBarItem);
    });

        return sideBar;
    }
    const clickOnNavItems = () => {
        const navItems = document.querySelectorAll('.sidebar-item');
        navItems.forEach(item => {
            item.addEventListener('click', handlePage);
        });
    }
    const handlePage = (event) => {
        // if (event.target.classList.contains('active')) {
        //     return;
        // }
        const main = document.querySelector('.list-content');
        const project = document.querySelector('.project-content');
        const subBar = document.getElementById('sub-bar');
        switch(event.target.dataset.tab) {
            case 'Home':
                main.style.display ='flex';
                project.style.display ='none';
                subBar.style.display = 'none';
                console.log('home');
                break;
            case 'Projects':
                main.style.display ='none';
                project.style.display ='flex';
                subBar.style.display = 'flex';
                console.log('projects');
                clickOnSub();
                break;
        }
        // let activeNavItem = document.querySelector('.active');
        // activeNavItem.classList.remove('active');
        // event.target.classList.add('active');
    }

    //sub bar 
    const createSubBar = () => {
        const subBar = document.createElement('div');
        subBar.id = 'sub-bar';

        return subBar;
    }
    const clickOnSub = () => {
        const subItems = document.querySelectorAll('.sub-bar-item');
        subItems.forEach(item => {
            //console.log(item);
            item.addEventListener('click', handleSubPage);
        });
    }
    const handleSubPage = (event) => {
        
        // if (event.target.classList.contains('active')) {
        //     return;
        // }
       
        const projectContent = document.querySelector('.project-content');
        const currentProjectH2 = document.querySelector(`[data-h2 = '${event.currentTarget.dataset.sub}']`);
        const currentProjectContent = document.querySelector(`[data-content = '${event.currentTarget.dataset.sub}']`);
        //console.log(currentProject);
        //console.log(projectContent);

        projectContent.prepend(currentProjectH2, currentProjectContent);

        // let activeSubItem = document.querySelector('.active');
        // activeSubItem.classList.remove('active');
    
        // event.target.classList.add('active');
    }

    //todo list main content and project main content
    const createListContent = () => {
        const listContent = document.createElement('div');
        listContent.classList.add('list-content');
        
        //todo list sub categories
        const pastH2 = document.createElement('h2');
        pastH2.innerHTML = `Past <p class="number-past"></p>`;
        listContent.appendChild(pastH2);

        const pastContent = document.createElement('div');
        pastContent.classList.add('past-content');
        listContent.appendChild(pastContent);

        const todayH2 = document.createElement('h2');
        todayH2.innerHTML = `Today <p class="number-today"></p>`;
        listContent.appendChild(todayH2);
        
        const todayContent = document.createElement('div');
        todayContent.classList.add('today-content');
        listContent.appendChild(todayContent);

        const tomorrowH2 = document.createElement('h2');
        tomorrowH2.innerHTML = `Tomorrow <p class="number-tomorrow"></p>`;
        listContent.appendChild(tomorrowH2);

        const tomorrowContent = document.createElement('div');
        tomorrowContent.classList.add('tomorrow-content');
        listContent.appendChild(tomorrowContent);
        
        const upcomingH2 = document.createElement('h2');
        upcomingH2.innerHTML = `Upcoming <p class="number-upcoming"></p>`;
        listContent.appendChild(upcomingH2);

        const upcomingContent = document.createElement('div');
        upcomingContent.classList.add('upcoming-content');
        listContent.appendChild(upcomingContent);

        return listContent;
    }
    const createProjectContent = () => {
        const projectContent = document.createElement('div');
        projectContent.classList.add('project-content');
        return projectContent;
    }
    
    //add button for task and for project
    const createAddButton = () => {
        const addBtn = document.createElement('button');
        addBtn.setAttribute('title', "Add");
        addBtn.innerHTML = `<i class="fa fa-plus"></i>`;
        addBtn.classList.add('add-button');
        addBtn.addEventListener('click', initializeForm.openForm);
        return addBtn;
    }
    const newProjectButton = () => {
        const add = document.createElement('div');
        add.classList.add('new-project');
        add.innerHTML = `<i class="fa fa-plus"></i> add new project`;
        add.addEventListener('click', initializeForm.openProjectForm);
        return add;
    }

    //form for task and for project
    const createForm = () => {
        const form = document.createElement('div');
        form.id = 'form';
        form.innerHTML = `
            <form id="form-task" class="hidden" action="#">
                <div class="tools-form">
                    <button type="submit" class="validate"><i class="fa fa-check"></i></button>
                </div>
                <div class="main-form">
                    <input type="text" id="title" name="title" placeholder="The title of the task.." autocomplete="off" required>
                    
                    <!--<label for="description"></label>
                    <textarea id="description" name="description" rows="3" placeholder="The dexcription of the task" autocomplete="off"></textarea>-->

                    <input type="date" id="dueDate" name="dueDate" required>

                    <select id="priority" name="priority" required>
                        <option value="" selected disabled hidden>Priority?</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </form>`;

            form.addEventListener('submit', taskFeature.submitNewTask);

        return form;
    }
    const createProjectForm = () => {
        const formProject = document.createElement('div');
        formProject.id = 'project-form';
        formProject.innerHTML = `
            <form id="project" class="hidden" action="#">
                <div class="tools-project-form">
                    <button type="submit" class="validate"><i class="fa fa-check"></i></button>
                </div>
                <div class="main-form-project">
                    <input type="text" id="project-title" name="project-title" placeholder="The project's name.." autocomplete="off" required>
                </div>
            </form>`;

            formProject.addEventListener('submit', projectFeature.submitNewProject);

        return formProject;
    }

    //Todo list update
    const updateList = () => {
        const pastContent = document.querySelector('.past-content');
        pastContent.innerHTML = '';
        const todayContent = document.querySelector('.today-content');
        todayContent.innerHTML = '';
        const tomorrowContent = document.querySelector('.tomorrow-content');
        tomorrowContent.innerHTML = '';
        const upcomingContent = document.querySelector('.upcoming-content');
        upcomingContent.innerHTML = '';
    }
    //create task
    const createDOMTask = () => {
        const taskCard = `
        <div class="main">
            <input type="checkbox" class="input-complete" name="complete">

            <div class="main-title"></div>
            
            <div class="main-dueDate"></div>

            <div class="main-priority"></div>
            
        </div>
        <div class="tools">
            <button class="edit-button-card"><i class="fa fa-edit"></i></button>
            <button class="dlt-button-card"><i class="fa fa-trash"></i></button>
        </div>
        <div class="edit-task hidden">
            <input type="text" class="task-title hidden" name="title" autocomplete="off">
            <input type="date" class="task-dueDate hidden" name="dueDate">
            <select class="task-priority hidden" name="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button class="validate-edit"><i class="fa fa-check"></i></button>
            <button class="close-edit"><i class="fa fa-times"></i></button>
        </div>
        `;
        return taskCard;
    }
    //set priority color to task
    const setPriorityColor = (item, tools) => {
        if (tools.classList.contains('low') || tools.classList.contains('medium') || tools.classList.contains('high')) {
            tools.classList.remove('low', 'medium', 'high');
            if (item.priority =='low') {
                tools.classList.add('low');
            } else if (item.priority =='medium') {
                tools.classList.add('medium');
            } else if (item.priority =='high') {
                tools.classList.add('high');
            }
        } else {
            if (item.priority =='low') {
                tools.classList.add('low');
            } else if (item.priority =='medium') {
                tools.classList.add('medium');
            } else if (item.priority =='high') {
                tools.classList.add('high');
            }
        }
    }
    //update completed tasks display
    const completedDisplay = (event) => {
        let currentTask = event.currentTarget.parentNode.parentNode;
        currentTask.classList.toggle('completed');
        const tools = currentTask.querySelector('.tools');
        tools.classList.toggle('completed');
        const deleteButton = currentTask.querySelector('.dlt-button-card');
        deleteButton.classList.toggle('completed');
        const editButton = currentTask.querySelector('.edit-button-card');
        editButton.classList.toggle('completed');
    }
    //append elements
    const createLayout = () => {
        const content = document.getElementById('content');
        // const headerEl = createHeader();
        // const sideBarEl = createSideBar();
        // const subBarEl = createSubBar();
        // const listContentEl = createListContent();
        // const projectContentEl = createProjectContent();
        // const btnEl = createAddButton();
        // const formEl = createForm();
        // const projectFormEl = createProjectForm();
        // const newProjectBtnEl = newProjectButton();
        content.append(createHeader(), createSideBar(), createSubBar(), createListContent(), createProjectContent());
        content.append(createAddButton(), createForm(), createProjectForm(), newProjectButton());
        clickOnNavItems();
    }

    return {
        createLayout, 
        updateList,
        createDOMTask,
        setPriorityColor,
        completedDisplay
    };
})();

export default initializeDOM