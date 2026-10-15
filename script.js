let tasks = [
    { id: 1, title: "Prepare Project Presentation Slide", priority: "High", completed: false },
    { id: 2, title: "Submit Synopsis to HOD", priority: "Medium", completed: true }
];

// Login Handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('login-page').classList.add('hidden');
    document.getElementById('dashboard-page').classList.remove('hidden');
    renderTasks();
});

// Logout Handler
function logout() {
    document.getElementById('dashboard-page').classList.add('hidden');
    document.getElementById('login-page').classList.remove('hidden');
}

// Toggle Add Form
function toggleTaskForm() {
    document.getElementById('task-form-card').classList.toggle('hidden');
}

// Add New Task
document.getElementById('add-task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const priority = document.getElementById('task-priority').value;

    tasks.push({
        id: Date.now(),
        title: title,
        priority: priority,
        completed: false
    });

    document.getElementById('task-title').value = '';
    toggleTaskForm();
    renderTasks();
});

// Toggle Task Complete State
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTasks();
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

// Render Tasks to UI
function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';

    let completedCount = 0;

    tasks.forEach(task => {
        if (task.completed) completedCount++;

        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                <span style="margin-left: 10px;">${task.title}</span>
                <span class="badge badge-${task.priority}">${task.priority}</span>
            </div>
            <button onclick="deleteTask(${task.id})" style="border:none; background:none; color:red; cursor:pointer;">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        list.appendChild(li);
    });

    document.getElementById('total-count').innerText = tasks.length;
    document.getElementById('completed-count').innerText = completedCount;
}