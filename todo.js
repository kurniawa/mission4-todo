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

console.log(new Date());
