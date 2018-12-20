// Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listerns
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
    form.addEventListener("submit", addTask);
    // Remove task Event
    taskList.addEventListener("click", removeTask);
    // Clear Tasks Event
    clearBtn.addEventListener("click", clearTasks);
    // Filter Event
    filter.addEventListener("keyup", filterTasks);
}

loadEventListeners();

// Get Tasks form Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);

        taskList.appendChild(li);
    });
}


// Add new task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task.");
    }

    // Create li element
    const li = document.createElement("li");
    // Add Class
    li.className = "collection-item";
    // Create Text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a new link
    const link = document.createElement("a");
    // Add Class
    link.className = "delete-item secondary-content";
    // Set attributes (#)
    link.setAttribute("href", "#");
    // Add icon element
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link(a) into li
    li.appendChild(link);

    // Append the li into ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = "";

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Tasks
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item") && confirm("Are you sure?")
    ) {
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    //   taskList.innerHTML = "";

    // Method 2 - Faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear Task from LS
    clearTasksFromLocalStorage();
}

// Clear Task from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}
