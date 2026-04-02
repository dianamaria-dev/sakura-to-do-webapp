const input =
document.getElementById("taskInput");
const addBtn =
document.getElementById("addBtn");
const taskList =
document.getElementById("taskList");
const priorityList = 
document.getElementById("priorityList");
const importantList =
document.getElementById("importantList");
const smallList = 
document.getElementById("smallList");
const priorityCard = 
document.getElementById("priorityCard");
const importantCard = 
document.getElementById("importantCard");
const smallCard = 
document.getElementById("smallCard");

let selectedTask = null;


function createTask() {
    const text = input.value.trim();

    if (text === "") {
        return;
    }

    const li = createTaskElement(text);
    li.style.opacity = "0";
li.style.transform = "scale(0.9)";

setTimeout(() => {
    li.style.opacity = "1";
    li.style.transform = "scale(1)";
}, 10);

    taskList.appendChild(li);
    input.value = "";
    saveTasks();
}

addBtn.addEventListener("click", createTask);

input.addEventListener("keydown", (e) =>
{
    if (e.key === "Enter") {
        createTask();
    }
});

priorityCard.addEventListener("click", (e) => {
    e.stopPropagation();

    if (selectedTask) {
        priorityList.appendChild(selectedTask);
        selectedTask.classList.remove("selected");
        selectedTask = null;
        saveTasks();
    }
});

importantCard.addEventListener("click", (e) => {
    e.stopPropagation();

    if (selectedTask) {
        importantList.appendChild(selectedTask);
        selectedTask.classList.remove("selected");
        selectedTask = null;
        saveTasks();
    }
});

smallCard.addEventListener("click", (e) => {
    e.stopPropagation();

    if (selectedTask) {
        smallList.appendChild(selectedTask);
        selectedTask.classList.remove("selected");
        selectedTask = null;
        saveTasks();
    }
});

document.addEventListener("click", () =>
{
    if (selectedTask) {
        selectedTask.classList.remove("selected")
        selectedTask = null;
    }
});

function saveTasks() {
    const data = {
        newTasks: [...taskList.querySelectorAll("li span")].map(span => span.textContent),
        priority: [...priorityList.querySelectorAll("li span")].map(span => span.textContent),
        important: [...importantList.querySelectorAll("li span")].map(span => span.textContent),
        small: [...smallList.querySelectorAll("li span")].map(span => span.textContent)
    };

    localStorage.setItem("sakuraTasks", JSON.stringify(data));
}

function loadTasks() {
    const saved = localStorage.getItem("sakuraTasks");

    if (!saved) return;

    const data = JSON.parse(saved);

    data.newTasks.forEach(text => {
        taskList.appendChild(createTaskElement(text));
    });

    data.priority.forEach(text => {
        priorityList.appendChild(createTaskElement(text));
    });

    data.important.forEach(text => {
        importantList.appendChild(createTaskElement(text));
    });

    data.small.forEach(text => {
        smallList.appendChild(createTaskElement(text));
    });
}

const quoteText = document.getElementById("quoteText");

const quotes = [
    "Bloom at your own pace 🌸",
    "Small steps still count.",
    "You are doing better than you think.",
    "Tiny progress is still progress.",
    "One task at a time.",
    "Soft days can still be productive.",
    "You do not need to do everything at once.",
    "A gentle pace is still a pace.",
    "Little wins build beautiful days.",
    "Resting is part of growing too."
];

function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
}

showRandomQuote();

function createTaskElement(text) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();

        if (selectedTask === li) {
            selectedTask = null;
        }

        saveTasks();
    });

    li.addEventListener("click", (e) => {
        e.stopPropagation();

        if (selectedTask) {
            selectedTask.classList.remove("selected");
        }

        selectedTask = li;
        li.classList.add("selected");
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}
loadTasks();

