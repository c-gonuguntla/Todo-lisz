
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');


taskForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        addTask(taskText);
        taskForm.reset(); // Clear input field after adding task
        saveTasks(); // Save tasks to local storage
    }
});


taskList.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const taskItem = clickedElement.closest('li');
    if (clickedElement.classList.contains('delete')) {
        taskItem.remove();
        saveTasks();
    } else if (clickedElement.classList.contains('edit')) {
        editTask(taskItem);
    } else if (clickedElement.classList.contains('complete')) {
        taskItem.classList.toggle('completed');
        saveTasks(); 
    }
});


function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            <button class="complete">Complete</button>
        </div>
    `;
    taskList.appendChild(taskItem);
}


function editTask(taskItem) {
    const spanElement = taskItem.querySelector('span');
    const newTaskText = prompt('Edit task:', spanElement.innerText);

    if (newTaskText !== null) {
        spanElement.innerText = newTaskText;
        saveTasks();
    }
}
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        const taskText = task.querySelector('span').innerText;
        const isCompleted = task.classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        const taskItem = taskList.lastChild;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
    });
}
loadTasks();

