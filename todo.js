document.getElementById('button-detail-todo').addEventListener('click', function () {
    const textarea_todo_detail = document.getElementById('textarea-todo-detail');
    if (window.getComputedStyle(textarea_todo_detail, null).display == 'block') {
        textarea_todo_detail.classList.add('hidden');
        this.classList.remove("bg-yellow-300");
    } else {
        textarea_todo_detail.classList.remove('hidden');
        this.classList.add("bg-yellow-300");
    }
});

// Set nilai default todoDate dan todoDueDate menjadi today
const todo_date = document.getElementById('todoDate');
const todo_due_date = document.getElementById('todoDueDate');

todo_date.valueAsDate = new Date();
todo_due_date.value = todo_date.value;

// console.log(new Date());

function selectAllActive(checkbox_select_all) {
    // console.log(checkbox_select_all.checked);
    const button_wrapper_select_active = document.getElementById('button-wrapper-select-active');
    const checkbox_active = document.querySelectorAll('.checkbox-active');
    if (checkbox_select_all.checked) {
        if (button_wrapper_select_active.classList.contains("hidden")) {
            button_wrapper_select_active.classList.remove('hidden');
        }
        checkbox_active.forEach(element => {
            element.checked = true;
        });
    } else {
        if (!button_wrapper_select_active.classList.contains("hidden")) {
            button_wrapper_select_active.classList.add('hidden');
        }
        checkbox_active.forEach(element => {
            element.checked = false;
        });
    }
}

function selectCertainTodo(selectedCheckbox) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const selectedTodo = todos.find(todo => todo.id == selectedCheckbox.value)
    const otherRelatedTodoCheckbox = document.querySelectorAll(`.checkbox-${selectedTodo.status}`);
    count_checked_element = 0;
    otherRelatedTodoCheckbox.forEach(element => {
        if (element.checked) {
            count_checked_element++;
        }
    });

    const related_button_wrapper = document.getElementById(`button-wrapper-select-${selectedTodo.status}`);
    if (count_checked_element) {
        if (related_button_wrapper.classList.contains("hidden")) {
            related_button_wrapper.classList.remove('hidden');
        }
    } else {
        if (!related_button_wrapper.classList.contains("hidden")) {
            related_button_wrapper.classList.add('hidden');
        }
    }
}

function markAsDone() {
    const checkbox_active = document.querySelectorAll('.checkbox-active');
    checkbox_active.forEach(element => {
        if (element.checked) {
            let todos = JSON.parse(localStorage.getItem("todos"));
            console.log(todos);
            let selectedTodo = todos.find(todo => todo.id == element.value);
            console.log(selectedTodo);
        }
    });
}
