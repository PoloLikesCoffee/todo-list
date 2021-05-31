import Project from "./project"
import initializeForm from "./form"

const projectFeature = (function () {

    let subBarContent = [];

    const addProjectToList = (project) => {
        subBarContent.push(project);
        localStorage.setItem('localProjectList', JSON.stringify(subBarContent));
        updateProjectListDisplay();
    }

    const updateProjectListDisplay = () => {
        const sub = document.getElementById('sub-bar');
        const projectContent = document.querySelector('.project-content');
        projectContent.innerHTML= '';
        sub.innerHTML= '';
        let index = 0;

        subBarContent.forEach(item => {
            let subItem = document.createElement('div');
            subItem.classList.add('sub-bar-item');
            subItem.setAttribute('data-sub', index);
            item.index = index;

            subItem.innerHTML = `
            <div class="name-project">
                ${index+1}. ${item.title}
            </div> 
            <div class="tools-project">
                <button class="dlt-button-project hidden">
                <i class="fa fa-trash"></i></button>
            </div>`;

            const currentProjectH2 = document.createElement('h2');
            currentProjectH2.innerText = index+1 + '. ' +item.title;
            currentProjectH2.setAttribute('data-h2', index);
            projectContent.appendChild(currentProjectH2);

            const currentProjectContent = document.createElement('div');
            currentProjectContent.classList.add('current-project-content');
            currentProjectContent.setAttribute('data-content', index);
            projectContent.appendChild(currentProjectContent);
            
            const deleteButton = subItem.querySelector('.dlt-button-project');
            deleteButton.addEventListener('click', deleteProject);

            sub.appendChild(subItem);
            index++;
        });
    }

    const submitNewProject = (event) => {
        event.preventDefault();
        let project = Object.create(Project.prototype);

        project.title = event.target.elements['project-title'].value;
        
        addProjectToList(project);
        initializeForm.clearProjectForm(event);
        initializeForm.openProjectForm();
        console.log(subBarContent);
    }

    const deleteProject = (event) => {
        let projectIndex = event.currentTarget.parentNode.dataset.index;
        //console.log(event.currentTarget.parentNode.parentNode.dataset.sub);
        subBarContent.splice(projectIndex, 1);
        console.log(subBarContent);
        localStorage.setItem('localProjectList', JSON.stringify(subBarContent));
        updateProjectListDisplay();
    }

    //localStorage feature
    function loadStorage() {
        // check if the local library is empty
        if(!localStorage.getItem('localProjectList')) {
            localStorage.setItem('localProjectList', JSON.stringify(subBarContent));
        } else {
            subBarContent = JSON.parse(localStorage.getItem('localProjectList'));
            //console.log(subBarContent);
            let tempArray = [];
            subBarContent.forEach(objectToConvert => {
                let convertedObjectToProject = Object.create(Project.prototype);
                for(const element in objectToConvert) {
                    convertedObjectToProject[element] = objectToConvert[element];
                }
                //console.log(convertedObjectToProject);

                tempArray.push(convertedObjectToProject);
                return tempArray;
            });
            subBarContent = tempArray;
        }
    }

    return {
        submitNewProject,
        updateProjectListDisplay,
        loadStorage
    }
})();

export default projectFeature