/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ \"./src/project.js\");\n/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ \"./src/task.js\");\n\n\n\n//module - interaction\nconst initializeControl = (function () {\n\tconst local_storage_project_key = 'task.projects';\n\tconst local_storage_selected_project_id_key = 'task.selectedProjectId';\n\tlet myProject = [];\n\tlet selectedProjectId = localStorage.getItem(\n\t\tlocal_storage_selected_project_id_key\n\t);\n\n\t//project feature\n\tconst selectProject = (event) => {\n\t\tif (event.target.tagName.toLowerCase() === 'li') {\n\t\t\tselectedProjectId = event.target.dataset.listId;\n\t\t\tconst projectDisplayContainer = document.querySelector(\n\t\t\t\t'[data-project-display-container]'\n\t\t\t);\n\t\t\t//animation\n\t\t\tprojectDisplayContainer.classList.add('animate');\n\t\t\tsetTimeout(function () {\n\t\t\t\tprojectDisplayContainer.classList.remove('animate');\n\t\t\t}, 500);\n\t\t\tsaveAndRender();\n\t\t}\n\t};\n\n\tconst deleteProject = (event) => {\n\t\tmyProject = myProject.filter((project) => project.id !== selectedProjectId);\n\t\tselectedProjectId = null;\n\t\tsaveAndRender();\n\t};\n\n\tconst submitProject = (event) => {\n\t\tevent.preventDefault();\n\t\tconst newProjectInput = document.querySelector('[data-new-project-input]');\n\t\tconst projectName = newProjectInput.value;\n\t\tif (projectName == null || projectName === '') return;\n\t\tconst project = createProject(projectName);\n\t\tnewProjectInput.value = null;\n\t\tmyProject.push(project);\n\t\tsaveAndRender();\n\t};\n\n\tconst createProject = (name) => {\n\t\tlet project = Object.create(_project__WEBPACK_IMPORTED_MODULE_0__.default.prototype);\n\t\tproject.id = Date.now().toString();\n\t\tproject.name = name;\n\t\tproject.tasks = [];\n\t\treturn project;\n\t};\n\n\tconst saveProject = () => {\n\t\tlocalStorage.setItem(local_storage_project_key, JSON.stringify(myProject));\n\t\tlocalStorage.setItem(\n\t\t\tlocal_storage_selected_project_id_key,\n\t\t\tselectedProjectId\n\t\t);\n\t};\n\n\tconst renderProject = (container) => {\n\t\tmyProject.forEach((project) => {\n\t\t\tconst projectEl = document.createElement('li');\n\t\t\tprojectEl.dataset.listId = project.id;\n\t\t\tprojectEl.classList.add('project-name');\n\t\t\tprojectEl.innerText = project.name;\n\t\t\tif (project.id === selectedProjectId) {\n\t\t\t\tprojectEl.classList.add('active-list');\n\t\t\t}\n\t\t\tconst counter = document.createElement('div');\n\t\t\tcounter.classList.add('counter');\n\t\t\tcounter.setAttribute('data-counter-project', project.id);\n\t\t\tif (project.tasks.length === 0) {\n\t\t\t\tcounter.style.display = 'none';\n\t\t\t} else {\n\t\t\t\tcounter.innerText = project.tasks.length;\n\t\t\t}\n\t\t\tprojectEl.appendChild(counter);\n\t\t\tcontainer.appendChild(projectEl);\n\t\t});\n\t};\n\n\t//task feature\n\tconst selectTask = (event) => {\n\t\t//toggle complete\n\t\tif (event.target.dataset.input === 'input') {\n\t\t\tconsole.log('Toggle complete!');\n\t\t\tconst selectedProject = myProject.find(\n\t\t\t\t(project) => project.id === selectedProjectId\n\t\t\t);\n\t\t\tconst selectedTask = selectedProject.tasks.find(\n\t\t\t\t(task) => task.id === event.target.id\n\t\t\t);\n\t\t\t// //selectedTask.complete = event.target.checked;\n\t\t\tselectedTask.toggleComplete();\n\t\t\tsaveProject();\n\t\t\trenderTaskCount(selectedProject);\n\t\t}\n\t\t//open edit mode\n\t\tif (event.target.parentNode.dataset.editTask === 'edit') {\n\t\t\tconsole.log('Open edit mode!');\n\t\t\tconst currentTask = event.target.parentNode.parentNode;\n\t\t\tconst taskName = currentTask.querySelector('p').innerText;\n\t\t\tconst editContainer = currentTask.querySelector(\n\t\t\t\t'[data-edit-task-container]'\n\t\t\t);\n\t\t\teditContainer.classList.toggle('hidden');\n\t\t\tconst editInput = editContainer.querySelector('[data-edit-task-input]');\n\t\t\teditInput.value = taskName;\n\t\t\t//animation\n\n\t\t\tif (event.target.classList.contains('fa-pencil-alt')) {\n\t\t\t\tevent.target.classList.remove('fa-pencil-alt');\n\t\t\t\tevent.target.classList.add('fa-times');\n\t\t\t\teditContainer.classList.add('appear');\n\t\t\t\tsetTimeout(function () {\n\t\t\t\t\teditContainer.classList.remove('appear');\n\t\t\t\t}, 200);\n\t\t\t} else {\n\t\t\t\tevent.target.classList.remove('fa-times');\n\t\t\t\tevent.target.classList.add('fa-pencil-alt');\n\t\t\t}\n\t\t}\n\t\t//edit and save modification\n\t\tif (event.target.parentNode.dataset.validateEditTask === 'validate') {\n\t\t\tconsole.log('Edited!');\n\t\t\tconst currentTask = event.target.parentNode.parentNode.parentNode;\n\t\t\tconst editContainer = currentTask.querySelector(\n\t\t\t\t'[data-edit-task-container]'\n\t\t\t);\n\t\t\tconst editInput = editContainer.querySelector(\n\t\t\t\t'[data-edit-task-input]'\n\t\t\t).value;\n\t\t\tcurrentTask.querySelector('p').innerText = editInput;\n\t\t\teditContainer.classList.toggle('hidden');\n\n\t\t\tif (\n\t\t\t\tevent.target.parentNode.parentNode.parentNode.parentNode\n\t\t\t\t\t.querySelector('.fas')\n\t\t\t\t\t.classList.contains('fa-times')\n\t\t\t) {\n\t\t\t\tevent.target.parentNode.parentNode.parentNode.parentNode\n\t\t\t\t\t.querySelector('.fas')\n\t\t\t\t\t.classList.remove('fa-times');\n\t\t\t\tevent.target.parentNode.parentNode.parentNode.parentNode\n\t\t\t\t\t.querySelector('.fas')\n\t\t\t\t\t.classList.add('fa-pencil-alt');\n\t\t\t} else {\n\t\t\t\tevent.target.parentNode.parentNode.parentNode.parentNode\n\t\t\t\t\t.querySelector('.fas')\n\t\t\t\t\t.classList.remove('fa-pencil-alt');\n\t\t\t\tevent.target.parentNode.parentNode.parentNode.parentNode\n\t\t\t\t\t.querySelector('.fas')\n\t\t\t\t\t.classList.add('fa-times');\n\t\t\t}\n\n\t\t\t//save locally\n\t\t\tconst selectedProject = myProject.find(\n\t\t\t\t(project) => project.id === selectedProjectId\n\t\t\t);\n\t\t\tconst selectedTask = selectedProject.tasks.find(\n\t\t\t\t(task) => task.id === event.target.parentNode.id\n\t\t\t);\n\t\t\tselectedTask.name = editInput;\n\t\t\tsaveProject();\n\t\t}\n\t};\n\n\tconst clearCompleteTask = (event) => {\n\t\tconst selectedProjet = myProject.find(\n\t\t\t(project) => project.id === selectedProjectId\n\t\t);\n\t\tselectedProjet.tasks = selectedProjet.tasks.filter(\n\t\t\t(task) => !task.complete\n\t\t);\n\t\tsaveAndRender();\n\t};\n\n\tconst submitTask = (event) => {\n\t\tevent.preventDefault();\n\t\tconst newTaskInput = document.querySelector('[data-new-task-input]');\n\t\tconst taskName = newTaskInput.value;\n\t\tif (taskName == null || taskName === '') return;\n\t\tconst task = createTask(taskName);\n\t\tnewTaskInput.value = null;\n\t\tconst selectedProject = myProject.find(\n\t\t\t(project) => project.id === selectedProjectId\n\t\t);\n\t\tselectedProject.tasks.push(task);\n\t\tsaveAndRender();\n\t};\n\n\tconst createTask = (name) => {\n\t\tlet task = Object.create(_task__WEBPACK_IMPORTED_MODULE_1__.default.prototype);\n\t\ttask.id = Date.now().toString();\n\t\ttask.name = name;\n\t\ttask.complete = false;\n\t\treturn task;\n\t};\n\n\tconst renderTaskCount = (selectedElement) => {\n\t\tconst uncompleteTaskCounter = selectedElement.tasks.filter(\n\t\t\t(task) => !task.complete\n\t\t).length;\n\t\t// const taskString = uncompleteTaskCounter === 1 ? 'task' : 'tasks';\n\t\tconst taskString =\n\t\t\tuncompleteTaskCounter > 0\n\t\t\t\t? `<i class=\"far fa-thumbs-down\"></i>`\n\t\t\t\t: `<i class=\"far fa-thumbs-up\"></i>`;\n\t\tconst projectCountEl = document.querySelector('[data-project-counter]');\n\t\t// projectCountEl.innerText = `${uncompleteTaskCounter} ${taskString} remaining.`;\n\t\tprojectCountEl.innerHTML = `未完了のタスク ${taskString} <span class=\"number\">\" ${uncompleteTaskCounter} \"</span>`;\n\t\tconst tooltip = document.querySelector('.counter-container');\n\t\t//animation\n\t\ttooltip.classList.add('bubble');\n\t\tsetTimeout(function () {\n\t\t\ttooltip.classList.remove('bubble');\n\t\t}, 500);\n\t};\n\n\tconst renderTask = (currentProject) => {\n\t\tconst tasksContainer = document.querySelector('[data-tasks]');\n\t\tconst taskTemplate = document.getElementById('task-template');\n\t\tcurrentProject.tasks.forEach((task) => {\n\t\t\tconst taskElement = document.importNode(taskTemplate.content, true);\n\t\t\tconst checkbox = taskElement.querySelector('input');\n\t\t\tcheckbox.id = task.id;\n\t\t\tcheckbox.checked = task.complete;\n\t\t\tconst label = taskElement.querySelector('label');\n\t\t\tlabel.htmlFor = task.id;\n\t\t\tconst p = label.querySelector('p');\n\t\t\tp.innerText = task.name;\n\t\t\t//label.append(task.name);\n\t\t\tconst validate = taskElement.querySelector('.validate');\n\t\t\tvalidate.id = task.id;\n\t\t\ttasksContainer.appendChild(taskElement);\n\t\t});\n\t\tanimateCounter();\n\t};\n\n\t//global feature\n\tconst animateCounter = () => {\n\t\tconst activeProjectEl = document.querySelector('.project-name.active-list');\n\t\tconst currentCounterEl = activeProjectEl.querySelector(\n\t\t\t'[data-counter-project]'\n\t\t);\n\n\t\t//animation\n\t\tcurrentCounterEl.classList.add('rubberBand');\n\t\tsetTimeout(function () {\n\t\t\tcurrentCounterEl.classList.remove('rubberBand');\n\t\t}, 500);\n\t};\n\n\tconst saveAndRender = () => {\n\t\tsaveProject();\n\t\trender();\n\t};\n\n\tconst isEmpty = (elem) => {\n\t\treturn document.querySelector(elem).innerHTML.trim() == '';\n\t};\n\n\tconst render = () => {\n\t\tconst projectList = document.querySelector('[data-projects]');\n\t\tclearElement(projectList);\n\t\trenderProject(projectList);\n\n\t\tconst tasksContainer = document.querySelector('[data-tasks]');\n\t\tconst projectTitleEl = document.querySelector('[data-project-title]');\n\t\tconst selectedProject = myProject.find(\n\t\t\t(project) => project.id === selectedProjectId\n\t\t);\n\t\tconst projectDisplayContainer = document.querySelector(\n\t\t\t'[data-project-display-container]'\n\t\t);\n\n\t\tif (isEmpty('.project-container ul')) {\n\t\t\tconsole.log('empty!');\n\t\t\tprojectDisplayContainer.style.display = 'none';\n\t\t} else if (!isEmpty('.project-container ul') && selectedProject == null) {\n\t\t\tprojectDisplayContainer.style.display = 'none';\n\t\t} else {\n\t\t\tprojectDisplayContainer.style.display = '';\n\t\t\tprojectTitleEl.innerText = selectedProject.name;\n\t\t\trenderTaskCount(selectedProject);\n\t\t\tclearElement(tasksContainer);\n\t\t\trenderTask(selectedProject);\n\t\t}\n\t};\n\n\tconst loadStorage = () => {\n\t\tif (!localStorage.getItem(local_storage_project_key)) {\n\t\t\tlocalStorage.setItem(\n\t\t\t\tlocal_storage_project_key,\n\t\t\t\tJSON.stringify(myProject)\n\t\t\t);\n\t\t} else {\n\t\t\tmyProject = JSON.parse(localStorage.getItem(local_storage_project_key));\n\t\t\tlet tempArray = [];\n\t\t\tmyProject.forEach((objectToConvert) => {\n\t\t\t\tlet convertedObjectToProject = Object.create(_project__WEBPACK_IMPORTED_MODULE_0__.default.prototype);\n\t\t\t\tfor (const element in objectToConvert) {\n\t\t\t\t\tconvertedObjectToProject[element] = objectToConvert[element];\n\n\t\t\t\t\t//tasks inside each project\n\t\t\t\t\tif (Array.isArray(objectToConvert[element])) {\n\t\t\t\t\t\tlet temp = [];\n\t\t\t\t\t\tobjectToConvert[element].forEach((object) => {\n\t\t\t\t\t\t\tlet convertedObjectToTask = Object.create(_task__WEBPACK_IMPORTED_MODULE_1__.default.prototype);\n\t\t\t\t\t\t\tfor (const el in object) {\n\t\t\t\t\t\t\t\tconvertedObjectToTask[el] = object[el];\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\ttemp.push(convertedObjectToTask);\n\t\t\t\t\t\t\treturn temp;\n\t\t\t\t\t\t});\n\t\t\t\t\t\tobjectToConvert[element].splice(\n\t\t\t\t\t\t\t0,\n\t\t\t\t\t\t\tobjectToConvert[element].length,\n\t\t\t\t\t\t\t...temp\n\t\t\t\t\t\t);\n\t\t\t\t\t\t//objectToConvert[element] = temp;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttempArray.push(convertedObjectToProject);\n\t\t\t\treturn tempArray;\n\t\t\t});\n\t\t\tmyProject = tempArray;\n\t\t}\n\t};\n\n\tconst clearElement = (element) => {\n\t\twhile (element.firstChild) {\n\t\t\telement.removeChild(element.firstChild);\n\t\t}\n\t};\n\n\treturn {\n\t\trender,\n\t\tsubmitProject,\n\t\tselectProject,\n\t\tdeleteProject,\n\t\tsubmitTask,\n\t\tselectTask,\n\t\tclearCompleteTask,\n\t\tloadStorage,\n\t};\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeControl);\n\n\n//# sourceURL=webpack://todo-list/./src/controller.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ \"./src/layout.js\");\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ \"./src/controller.js\");\n\n\n\n_layout__WEBPACK_IMPORTED_MODULE_0__.default.createLayout();\n_controller__WEBPACK_IMPORTED_MODULE_1__.default.loadStorage();\n_controller__WEBPACK_IMPORTED_MODULE_1__.default.render();\n\n//event listeners\n    //project\n    const newProjectForm = document.querySelector('[data-new-project-form]');\n    newProjectForm.addEventListener('submit', _controller__WEBPACK_IMPORTED_MODULE_1__.default.submitProject);\n\n    const projectContainer = document.querySelector('[data-projects]');\n    projectContainer.addEventListener('click', _controller__WEBPACK_IMPORTED_MODULE_1__.default.selectProject);\n\n    const deleteProjectButton = document.querySelector('[data-delete-project-button]');\n    deleteProjectButton.addEventListener('click', _controller__WEBPACK_IMPORTED_MODULE_1__.default.deleteProject);\n\n    //task\n    const newTaskForm = document.querySelector('[data-new-task-form]');\n    newTaskForm.addEventListener('submit', _controller__WEBPACK_IMPORTED_MODULE_1__.default.submitTask);\n\n    const tasksContainer = document.querySelector('[data-tasks]');\n    tasksContainer.addEventListener('click', _controller__WEBPACK_IMPORTED_MODULE_1__.default.selectTask);\n\n    const clearCompleteTaskButton = document.querySelector('[data-clear-complete-tasks-button]');\n    clearCompleteTaskButton.addEventListener('click', _controller__WEBPACK_IMPORTED_MODULE_1__.default.clearCompleteTask);\n\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/layout.js":
/*!***********************!*\
  !*** ./src/layout.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n//Module - layout app\nconst initializeDOM = (function () {\n\tconst createHeader = () => {\n\t\tconst header = document.createElement('div');\n\t\theader.innerHTML = `<i class=\"fas fa-thumbtack\"></i> Todo List`;\n\t\theader.classList.add('header');\n\n\t\treturn header;\n\t};\n\n\tconst createProjectContainer = () => {\n\t\tconst projectContainer = document.createElement('div');\n\t\tprojectContainer.classList.add('project-container');\n\n\t\tprojectContainer.innerHTML = `\n            <h2 class=\"project-list-title\"><i class=\"far fa-hand-point-right\"></i> することリスト <i class=\"far fa-hand-point-down\"></i></h2>\n            <ul class=\"project-list\" data-projects>\n            \n            </ul>\n            \n            <form action=\"\" data-new-project-form>\n                <input \n                    type=\"text\" \n                    class=\"new project\"\n                    maxlength=\"20\"\n                    data-new-project-input\n                    placeholder=\"新しいプロジェクト名\"\n                    aria-label=\"new project name\"\n                />\n                <button class=\"btn create\" aria-label=\"create new project\"><i class=\"fas fa-folder-plus\"></i></button>\n            </form>\n        `;\n\n\t\treturn projectContainer;\n\t};\n\n\tconst createTodoContainer = () => {\n\t\tconst todoContainer = document.createElement('div');\n\t\ttodoContainer.classList.add('task-container');\n\t\ttodoContainer.setAttribute('data-project-display-container', '');\n\n\t\ttodoContainer.innerHTML = `\n            <div class=\"todo-header\">\n                <h2 class=\"project-title\" data-project-title></h2>\n                <div class=\"counter-container\">\n                    <p class=\"task-counter\" data-project-counter></p>\n                    <span class=\"triangle\"></span>\n                </div>\n            </div>\n\n            <div class=\"todo-body\">\n                <div class=\"tasks\" data-tasks>\n                \n                </div>\n\n                <div class=\"new-task-creator\">\n                    <form action=\"\" data-new-task-form>\n                        <input \n                            type=\"text\" \n                            data-new-task-input\n                            maxlength=\"40\"\n                            class=\"new task\"\n                            placeholder=\"新しいタスク名\"\n                            aria-label=\"new task name\"\n                        />\n                        <button class=\"btn create create-task\" aria-label=\"create new task\"><i class=\"fas fa-plus-circle\"></i></button>\n                    </form>\n                </div>\n\n            </div>\n\n            <div class=\"delete-stuff\">\n                <button class=\"btn delete\" data-clear-complete-tasks-button><i class=\"fas fa-tasks\"></i> Clear completed tasks</button>\n                <button class=\"btn delete\" data-delete-project-button><i class=\"fas fa-folder-minus\"></i> Delete project</button>\n            </div>\n\n            <template id=\"task-template\">\n                <div class=\"task\">\n                    <input\n                        data-input=\"input\"\n                        type=\"checkbox\" />\n                    <label>\n                        <span class=\"custom-checkbox\"></span>\n                        <p></p>\n                    </label>\n                    <button class=\"btn edit\" data-edit-task=\"edit\"><i class=\"fas fa-pencil-alt\"></i></button>\n                    <div class=\"edit-container hidden\" data-edit-task-container>\n                        \n                        <button class=\"btn validate\" data-validate-edit-task=\"validate\"><i class=\"fas fa-check\"></i></button>\n                        <input type=\"text\" maxlength=\"40\" data-edit-task-input>\n                        <!--<textarea rows=\"1\" cols=\"20\" maxlength=\"20\" data-edit-task-input>-->\n                        \n                    </div>\n                </div>\n            </template>\n        `;\n\t\treturn todoContainer;\n\t};\n\n\tconst createLayout = () => {\n\t\tconst content = document.getElementById('content');\n\n\t\tcontent.append(\n\t\t\tcreateHeader(),\n\t\t\tcreateProjectContainer(),\n\t\t\tcreateTodoContainer()\n\t\t);\n\t};\n\n\treturn {\n\t\tcreateLayout,\n\t};\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeDOM);\n\n\n//# sourceURL=webpack://todo-list/./src/layout.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Project {\n    constructor(projectData) {\n        this._id = projectData.id;\n        this._name = projectData.name;\n        this._tasks = projectData.tasks || [];\n    }\n\n    get id() {\n        return this._id;\n    }\n    set id(value) {\n        this._id = value;\n    }\n\n    get name() {\n        return this._name;\n    }\n    set name(value) {\n        this._name = value.toString();\n    }\n\n    get tasks() {\n        return this._tasks;\n    }\n    set tasks(value) {\n        this._tasks = value;\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\n\n//# sourceURL=webpack://todo-list/./src/project.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Task {\n    constructor(taskData) {\n        this._id = taskData.id;\n        this._title = taskData.title;\n        //this._dueDate = taskData.dueDate;\n        //this._priority = taskData.priority;\n        this._complete = taskData.complete || false;\n    }\n\n    get id() {\n        return this._id;\n    }\n    set id(value) {\n        this._id = value;\n    } \n\n    get title() {\n        return this._title;\n    }\n    set title(value) {\n        this._title = value.toString();\n    }  \n\n    get complete() {\n        return this._complete;\n    }\n    set complete(value) {\n        (value) ? this._complete = true : this._complete = false;\n    }\n\n    // get dueDate() {\n    //     return this._dueDate;\n    // }\n    // get priority() {\n    //     return this._priority;\n    // }\n\n    // set dueDate(value) {\n    //     if (value < dateStuff.getTodayDate()) {\n    //         alert('Since the date is already passed, default value of today = ' + dateStuff.getTodayDate() + '!');\n    //         value = dateStuff.getTodayDate();\n    //         this._dueDate = value;\n    //     } else {\n    //         this._dueDate = value;\n    //     }\n    // }\n\n    // set priority(value) {\n    //     this._priority = value.toString();\n    // }\n    \n    toggleComplete() {\n        this._complete = !this._complete; \n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n//# sourceURL=webpack://todo-list/./src/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;