let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; 
        updateTaskList();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})">
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit.png" onclick="editTask(${index})" alt="Edit">
                <img src="bin.png" onclick="deleteTask(${index})" alt="Delete">
            </div>
        </div>`;
        taskList.appendChild(listItem);
    });

    updateProgress();
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        updateTaskList();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};

const updateProgress = () => {
    const progress = document.getElementById('progress');
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercent = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    progress.style.width = `${progressPercent}%`;

    const statsNumber = document.getElementById('number');
    statsNumber.textContent = `${completedTasks}/${totalTasks}`;
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
