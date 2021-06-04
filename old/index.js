import initializeDOM from "./DOM"
import taskFeature from "./taskFeature"
import projectFeature from "./projectFeature"

initializeDOM.createLayout();

//taskFeature.loadHome();
taskFeature.loadStorage();
taskFeature.updateTodoListDisplay();
projectFeature.loadStorage();
projectFeature.updateProjectListDisplay();
taskFeature.updateCounter();
taskFeature.updateNumber(document.querySelector('.past-content'));
taskFeature.updateNumber(document.querySelector('.today-content'));
taskFeature.updateNumber(document.querySelector('.tomorrow-content'));
taskFeature.updateNumber(document.querySelector('.upcoming-content'));