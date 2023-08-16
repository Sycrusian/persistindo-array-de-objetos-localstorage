let tasks = [];

const createTask = task => {
    const item = document.createElement("li");
    item.classList.add("task__item");
    const text = document.createElement("p");
    text.classList.add("task__text");
    text.innerText = task;
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove__button");
    removeButton.innerText = "Excluir";
    removeButton.addEventListener("click", event => {
        const taskList = document.querySelector("#task__list");
        const noTasks = document.querySelector("#no-tasks");
        const itemToRemove = event.currentTarget.parentNode;
        taskList.removeChild(itemToRemove);
        const index = tasks.findIndex(item => item === itemToRemove.childNodes[0].innerText);
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        if (taskList.childNodes.length <= 0) {
            noTasks.classList.remove("hidden");
        };
    })
    item.append(text, removeButton);
    return item;
}

const handleTasks = () => {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = [];
    }
    const addTask = task => {
        const item = createTask(task);
        taskList.appendChild(item);
    }
    const newTask = document.querySelector("#new-task");
    const addTaskButton = document.querySelector("#add-task");
    const taskList = document.querySelector("#task__list");
    const noTasks = document.querySelector("#no-tasks");
    addTaskButton.addEventListener("click", () => {
        const task = newTask.value.trim();
        if (task.length > 0) {
            addTask(task);
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            noTasks.classList.add("hidden");
            newTask.value = "";
        }
    });
    if (tasks.length > 0) {
        noTasks.classList.add("hidden");
        tasks.forEach(task => addTask(task));
    }
}


handleTasks();