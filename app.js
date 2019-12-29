const plansURL = "http://[::1]:3000/plans";
const navDiv = document.querySelector(".navDiv");
const planDiv = document.querySelector(".planDiv");
const listDiv = document.querySelector(".listDiv");
const footDiv = document.querySelector(".footDiv");
let draggedItem = null; //variable for drag-and-drop functionality.

fetch(plansURL)
    .then(getResponse)
    .then(getPlan)
    
function getResponse(response){
    return response.json();
};

function getPlan(plans){
    plans.forEach(plan => {
        const appName = document.createElement("h1");
        const planName = document.createElement("h1");
        
        appName.classList.add("appName");
        planName.classList.add("planName");

        appName.innerText = "Ssstrello";
        planName.innerText = plan.name;

        listDiv.dataset.planId = plan.id;
        
        addLists(plan);
        addList();
        
        navDiv.appendChild(appName);
        planDiv.appendChild(planName);
    });
};

function addList(){
    const listCard = document.createElement("div");
    const addNewListDiv = document.createElement("button");

    listCard.classList.add("listCard");
    addNewListDiv.classList.add("addNewListDiv");

    addNewListDiv.innerText = "➕ Add a new List";
        
    addNewListDiv.addEventListener("click", openAddListForm);

    listCard.appendChild(addNewListDiv);
    listDiv.appendChild(listCard);
};

function addLists(plan){
    plan.lists.forEach(list => {
        const listCard = document.createElement("div");
        const listNav = document.createElement("div");
        const listName = document.createElement("h2");
        const addNewTaskDiv = document.createElement("button");
        const listDeleteButton = document.createElement("button");

        listNav.classList.add("list-nav")
        listCard.classList.add("listCard");
        listName.classList.add("listName");
        addNewTaskDiv.classList.add("addNewTaskDiv");
        listDeleteButton.classList.add("listDeleteButton");

        listName.innerText = list.name;
        addNewTaskDiv.innerText = "➕ Add a new Task";  
        listDeleteButton.innerText = "✖️";  

        listCard.dataset.listId = list.id;

        listCard.setAttribute("draggable", "true");
        listName.setAttribute("contenteditable", "true");

        addTaskDiv(list, listCard);
        
        addNewTaskDiv.addEventListener("click", openAddTaskForm);

        listName.addEventListener("input", editList);
        function editList(event){
            event.preventDefault();
            fetch(`http://[::1]:3000/lists/${list.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: event.target.innerText
                })
            });
        };
        
        listNav.prepend(listName, listDeleteButton);
        listCard.prepend(listNav);
        listDiv.appendChild(listCard);
        listCard.appendChild(addNewTaskDiv);
    });
};

function addTaskDiv(list, listCard) {
    const taskDiv = document.createElement("div");
    
    taskDiv.classList.add("taskDiv");
    taskDiv.dataset.listId = list.id; //matches FE with BE.
    
    addTaskCard(list, taskDiv);
    dragDiv(taskDiv);

    listCard.appendChild(taskDiv);
};

function addTaskCard(list, taskDiv){
    list.tasks.forEach(task => {
        const taskCard = document.createElement("li");
        const taskName = document.createElement("h3");
        
        taskCard.classList.add("taskCard");
        taskName.classList.add("taskName");
        
        taskCard.setAttribute("draggable", "true");
        taskName.setAttribute("contenteditable", "true");

        taskCard.dataset.taskId = task.id;

        taskName.innerText = task.name;
        
        addToolTip(task, taskCard);
        addTaskButtons(task, taskCard);
        dragTask(task, taskCard);

        taskName.addEventListener("input", editTask);
        function editTask(event){
            event.preventDefault();
            fetch(`http://[::1]:3000/tasks/${task.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: event.target.innerText
                })
            });
        };
        
        taskCard.prepend(taskName);
        taskDiv.appendChild(taskCard);
    });
};

function addToolTip(task, taskCard){
    const toolTip = document.createElement("div");
    const toolTipText = document.createElement("div");
    
    toolTip.classList.add("toolTip");
    toolTipText.classList.add("toolTipText");
    
    toolTipText.innerText = `${task.priority} Priority`;
    
    toolTip.appendChild(toolTipText);
    taskCard.append(toolTip);
};  

function addTaskButtons(task, taskCard){
    const taskButtonDiv = document.createElement("div");
    const taskDeleteButton = document.createElement("button");
    
    taskButtonDiv.classList.add("taskButtonDiv");
    taskDeleteButton.classList.add("taskDeleteButton");
    
    taskDeleteButton.innerText = "✖️";

    taskButtonDiv.appendChild(taskDeleteButton);
    taskCard.append(taskButtonDiv);
};

//dragDiv drag-and-drop functionality.
function dragDiv(taskDiv) {
    taskDiv.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    
    taskDiv.addEventListener("dragenter", (event) => {
        event.preventDefault();
    });
    
    taskDiv.addEventListener("drop", (event) => {
        event.preventDefault();
        taskDiv.prepend(draggedItem);
    });
};

//dragTask drag-and-drop functionality.
function dragTask(task, taskCard){
    taskCard.addEventListener("dragstart", startDrag);
    taskCard.addEventListener("dragend", endDrag);

    function startDrag(event){
        draggedItem = taskCard;
        setTimeout(() => {
            taskCard.style.display = "none";
        }, 0);
    };
    
    function endDrag(event){
        draggedItem.style.display = "flex";
        draggedItem = null;
        fetch(`http://[::1]:3000/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                list_id: event.target.parentNode.dataset.listId
            })
        }, 0);
    };
};

//addListForm functionality.
const addListForm = document.querySelector(".addListForm");
const addListFormInputName = document.querySelector(".addListFormInputName");
const addListFormAddButton = document.querySelector(".addListFormAddButton");
const addListFormCloseButton = document.querySelector(".addListFormCloseButton");

addListFormAddButton.addEventListener("click", addNewList);
addListFormCloseButton.addEventListener("click", closeAddListForm);

function openAddListForm(event) {
    event.preventDefault();
    addListForm.style.display = "block";
};

function closeAddListForm(event) {
    event.preventDefault();
    addListForm.style.display = "none";
};

function addNewList() {
    const listCard = document.createElement("div");
    const listName = document.createElement("h2");

    listCard.classList.add("listCard");
    listName.classList.add("listName");

    listName.innerText = addListFormInputName.value;

    listCard.append(listName);
    listDiv.append(listCard);

    addNewListFetch(addListFormInputName);
}

function addNewListFetch(addListFormInputName){
    fetch("http://localhost:3000/lists/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: addListFormInputName.value,
            plan_id: 2
        })
    });
};

//addTaskForm functionality.
const addTaskForm = document.querySelector(".addTaskForm");
const addTaskFormInputName = document.querySelector(".addTaskFormInputName");
const addTaskFormInputPriority = document.querySelector(".addTaskFormInputPriority");
const addTaskFormAddButton = document.querySelector(".addTaskFormAddButton");
const addTaskFormCloseButton = document.querySelector(".addTaskFormCloseButton");

addTaskFormAddButton.addEventListener("click", addNewTask);
addTaskFormCloseButton.addEventListener("click", closeAddTaskForm);

function openAddTaskForm(event) {
    event.preventDefault();
    addTaskForm.style.display = "block";
    addTaskForm.id = event.target.previousSibling.dataset.listId;
};

function closeAddTaskForm(event) {
    event.preventDefault();
    addTaskForm.style.display = "none";
};

function addNewTask() {
    const taskCard = document.createElement("li");
    const taskName = document.createElement("h3");
    const toolTip = document.createElement("div");
    const toolTipText = document.createElement("div");

    taskName.innerText = addTaskFormInputName.value;
    toolTipText.innerText = `${addTaskFormInputPriority.value} Priority`;
   
    toolTip.appendChild(toolTipText);
    taskCard.append(taskName, toolTip);

    addNewTaskFetch(addTaskFormInputName, addTaskFormInputPriority);
};

function addNewTaskFetch(addTaskFormInputName, addTaskFormInputPriority){
    fetch("http://localhost:3000/tasks/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: addTaskFormInputName.value,
            priority: addTaskFormInputPriority.value,
            list_id: event.target.parentNode.id
        })
    });
};

//external API functionality.    
const tapMe = document.querySelector(".tapMe");

tapMe.addEventListener("click", addExternalApiFetch);

function addExternalApiFetch(){
    event.preventDefault();
    fetch("https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=3", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hargrimm-wikihow-v1.p.rapidapi.com",
            "x-rapidapi-key": "c5d7d7387bmshc602216bb13e357p1052bcjsn2580862765fa"
        }
    })
    .then(response => response.json())
    .then(result => {
        const randomQuote = document.createElement("h1");

        randomQuote.classList.add("randomQuote");
        footDiv.classList.add("dimmer");
        
        randomQuote.innerText = result[1];
    
        randomQuote.style.display = "flex";
    
        footDiv.prepend(randomQuote);
    })
};

//events deligation.
listDiv.addEventListener("click", handleClick);

function handleClick(event){
    event.preventDefault();
    const randomQuote = document.querySelector(".randomQuote");

    footDiv.classList.remove("dimmer");
    if (randomQuote){
        randomQuote.remove();
    };

    if (event.target.classList.contains("taskDeleteButton")){
        deleteTask(event.target.parentNode.parentNode);
    };

    if (event.target.classList.contains("listDeleteButton")){
        deleteList(event.target.parentNode.parentNode);
    };
};

function deleteTask(taskCard){
    fetch(`http://[::1]:3000/tasks/${taskCard.dataset.taskId}`, {
        method: "DELETE"
    });
    taskCard.remove();
};

function deleteList(listCard){
    fetch(`http://[::1]:3000/lists/${listCard.dataset.listId}`, {
        method: "DELETE"
    });
    listCard.remove();
};