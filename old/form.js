//this module takes care of the form
const initializeForm = (function () {
    const openForm = () => {
        const form = document.getElementById('form-task');
        const btn = document.querySelector('.add-button');
        form.classList.toggle("hidden");
        if (btn.innerHTML == `<i class="fa fa-plus"></i>`) {
            btn.innerHTML = `<i class="fa fa-times"></i>`;
        } else {
            btn.innerHTML = `<i class="fa fa-plus"></i>`;
        }
    }

    const clearForm = (event) => {
        event.target.elements['title'].value = null;
        event.target.elements['dueDate'].value = null;
        event.target.elements['priority'].value = '';
    }

    const openProjectForm = () => {
        const form = document.getElementById('project');
        const btn = document.querySelector('.new-project');
        form.classList.toggle("hidden");
        if (btn.innerHTML == `<i class="fa fa-plus"></i> add new project`) {
            btn.innerHTML = `<i class="fa fa-times"></i> close form`;
        } else {
            btn.innerHTML = `<i class="fa fa-plus"></i> add new project`;
        }
    }

    const clearProjectForm = (event) => {
        event.target.elements['project-title'].value = null;
    }

    return {
        openForm,
        clearForm,
        openProjectForm,
        clearProjectForm
    };
})();

export default initializeForm