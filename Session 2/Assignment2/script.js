document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get input value and remove whitespace

        // Check if the input is empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // 1. Create the list item (li)
        const listItem = document.createElement('li');
        listItem.className = 'task-item';

        // 2. Create the task text span
        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = taskText;

        // 3. Create the div for buttons
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'buttons';

        // 4. Create the "Complete" button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete-btn';
        
        // Add functionality to complete button
        completeBtn.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        // 5. Create the "Delete" button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        
        // Add functionality to delete button
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
        });

        // 6. Append buttons to the button div
        buttonDiv.appendChild(completeBtn);
        buttonDiv.appendChild(deleteBtn);

        // 7. Append the text span and button div to the list item
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(buttonDiv);

        // 8. Append the new list item to the task list (ul)
        taskList.appendChild(listItem);

        // 9. Clear the input field
        taskInput.value = '';
        taskInput.focus(); // Set focus back to the input field
    }

    // Add event listener to the "Add Task" button
    addTaskBtn.addEventListener('click', addTask);

    // Add event listener for the "Enter" key in the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});