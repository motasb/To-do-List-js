const todos = JSON.parse(localStorage.getItem('todos')) || [];
const inputElement = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

const renderTodos = () => {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const item = document.createElement('div');
        item.classList.add('item');

        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.classList.add('done');
        }
        li.addEventListener('click', () => toggleTodoDone(index));

        const deleteButton = document.createElement('span');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => deleteTodoItem(index)); // وظيفة الحذف عند الضغط على الـ span

        item.appendChild(li);
        item.appendChild(deleteButton);
        todoList.appendChild(item);
    });
};

const addTodo = () => {
    const text = inputElement.value.trim();
    if (text === '') return;

    todos.push({ text, completed: false });
    inputElement.value = '';
    updateTodos();
};

const toggleTodoDone = (index) => {
    todos[index].completed = !todos[index].completed;
    updateTodos();
};

const deleteTodoItem = (index) => {
    todos.splice(index, 1);
    updateTodos();
};

const updateTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
};

// عند الضغط على زر Enter، يتم استدعاء وظيفة addTodo
inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
    }
});

// عند الضغط على زر الإضافة
document.getElementById('add-btn').addEventListener('click', addTodo);

// إضافة حدث للضغط على زر Delete
window.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' && todos.length > 0) {
        deleteTodoItem(todos.length - 1); // حذف آخر عنصر في القائمة
    }
});

renderTodos();