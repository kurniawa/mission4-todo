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

    let class_name = selectedTodo.status;
    if (selectedTodo.starred) {
        class_name = 'starred';

    }
    const allRelatedCheckbox = document.querySelectorAll(`.checkbox-${class_name}`);

    if (selectedTodo.starred) {

        allRelatedCheckbox.forEach(element => {
            const todo = todos.find(t => t.id == element.value);
            if (todo) {
                const todo_title = document.getElementById(`todo-title-${todo.id}`);
                if (element.checked) {
                    todo.status = 'done';
                    if (!todo_title.classList.contains('line-through')) {
                        todo_title.classList.add('line-through');
                    }
                } else {
                    todo.status = 'active';
                    if (todo_title.classList.contains('line-through')) {
                        todo_title.classList.remove('line-through');
                    }
                }

                localStorage.setItem('todos', JSON.stringify(todos));
                                
            }
        });

    } else {
        let count_checked_element = 0;
        let count_unchecked_element = 0;
        allRelatedCheckbox.forEach(element => {
            if (element.checked) {
                count_checked_element++;
            } else {
                count_unchecked_element++;
            }
        });
    
        
        let options_select = document.getElementById(`options-select-${class_name}`);
    
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
            document.getElementById(`select-all-${class_name}`).checked = true;
        } else {
            document.getElementById(`select-all-${class_name}`).checked = false;
        }
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
        if (status == 'starred') {
            todo.starred = true;
        } else if (status == 'unstarred') {
            todo.starred = false;
        } else {
            todo.status = status;
        }

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

function changeDate(date_value, todo_id, date_type) {
    // console.log(date_value, todo_id, date_type);
    const todo = todos.find(t => t.id == todo_id);

    if (todo && date_value) {
        const new_date = new Date(date_value);
        const date_value_local = new_date.toLocaleDateString('ru-RU');
        const dayname = weekday[new_date.getDay()];
        if (date_type == "begin") {
            todo.begin = date_value;
            todo.begin_f = date_value_local;
            todo.begin_dayname = dayname;
        } else if (date_type == "due") {
            todo.due = date_value;
            todo.due_f = date_value_local;
            todo.due_dayname = dayname;
        }

        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
}