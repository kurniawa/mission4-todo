function toggleElement(element_id) {
    const elementToToggle = document.getElementById(element_id);
    if (elementToToggle.classList.contains('hidden')) {
        elementToToggle.classList.remove('hidden');
    } else {
        elementToToggle.classList.add('hidden');
    }
}

function toggleTodoDetail(buttonDetail) {
    const divTodoDetail = document.getElementById('div-todo-detail');
    if (!divTodoDetail.classList.contains('hidden')) {
        divTodoDetail.classList.add('hidden');
        buttonDetail.classList.remove("bg-yellow-300");
    } else {
        divTodoDetail.classList.remove('hidden');
        buttonDetail.classList.add("bg-yellow-300");
    }
}

// Set nilai default todoDate dan todoDueDate menjadi today
const todo_date = document.getElementById('todoDate');
const todo_due_date = document.getElementById('todoDueDate');

todo_date.valueAsDate = new Date();
todo_due_date.value = todo_date.value;

// console.log(new Date());

function selectAll(checkbox_select_all, status) {
    // console.log(checkbox_select_all.checked);
    const options_select = document.getElementById(`options-select-${status}`);
    const checkboxes = document.querySelectorAll(`.checkbox-${status}`);
    if (checkbox_select_all.checked) {
        if (options_select.classList.contains("hidden")) {
            options_select.classList.remove('hidden');
        }
        checkboxes.forEach(element => {
            element.checked = true;
        });
    } else {
        if (!options_select.classList.contains("hidden")) {
            options_select.classList.add('hidden');
        }
        checkboxes.forEach(element => {
            element.checked = false;
        });
    }
}

function selectCertainTodo(selectedCheckbox) {
    const selectedTodo = todos.find(todo => todo.id == selectedCheckbox.value)
    const allRelatedCheckbox = document.querySelectorAll(`.checkbox-${selectedTodo.status}`);
    count_checked_element = 0;
    count_unchecked_element = 0;
    allRelatedCheckbox.forEach(element => {
        if (element.checked) {
            count_checked_element++;
        } else {
            count_unchecked_element++;
        }
    });

    const options_select = document.getElementById(`options-select-${selectedTodo.status}`);
    if (count_checked_element) {
        if (options_select.classList.contains("hidden")) {
            options_select.classList.remove('hidden');
        }
    } else {
        if (!options_select.classList.contains("hidden")) {
            options_select.classList.add('hidden');
        }
    }

    if (!count_unchecked_element) {
        document.getElementById(`select-all-${selectedTodo.status}`).checked = true;
    } else {
        document.getElementById(`select-all-${selectedTodo.status}`).checked = false;
    }
}

function resetForm() {
    const inputTodoTitle = document.getElementById('todoTitle');
    const textAreaTodoDetail = document.getElementById('todoDetail');
    const divTodoDetail = document.getElementById('div-todo-detail');
    const buttonDetail = document.getElementById('button-detail-todo');

    inputTodoTitle.value = '';
    textAreaTodoDetail.value = '';

    if (!divTodoDetail.classList.contains('hidden')) {
        divTodoDetail.classList.add('hidden');
        buttonDetail.classList.remove("bg-yellow-300");
    }
}

function markAs(id, status) {
    const todo = todos.find(todo => todo.id == id);
    if (todo) {
        todo.status = status;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
}

function markAsBySelected(begin_status, end_status, to_delete) {
    const allRelatedCheckbox = document.querySelectorAll(`.checkbox-${begin_status}`);
    allRelatedCheckbox.forEach(relatedCheckbox => {
        if (relatedCheckbox.checked) {
            if (to_delete) {
                deleteTodo(relatedCheckbox.value);
            } else {
                markAs(relatedCheckbox.value, end_status);
            }
        }
    });

    // reset display hidden to button options select
    const options_select = document.getElementById(`options-select-${begin_status}`);
    if (!options_select.classList.contains('hidden')) {
        options_select.classList.add('hidden');
    }

    // reset input checkbox selectAll to unchecked
    const related_checkbox_select_all = document.getElementById(`select-all-${begin_status}`);
    if (related_checkbox_select_all.checked) {
        related_checkbox_select_all.checked = false;
    }
}

function editTitleAndDetail(todo_id) {
    const todo = todos.find(t => t.id == todo_id);
    const todoTitle = document.getElementById(`input-edit-title-${todo_id}`).value.trim();
    const todoDetail = document.getElementById(`textarea-edit-detail-${todo_id}`).value.trim();

    // console.log(todoTitle, todoDetail);
    if (todo && todoTitle) {
        todo.title = todoTitle;
        todo.detail = todoDetail;

        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
}

function editPriority(todo_id) {
    const todo = todos.find(t => t.id == todo_id);
    const newPriority = document.getElementById(`select-edit-priority-${todo_id}`).value;

    if (todo && newPriority) {
        todo.priority = newPriority;

        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
}