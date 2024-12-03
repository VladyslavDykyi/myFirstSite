class TodoList {
    constructor() {
        this.KEY = 'dataTodo';
        this.data = JSON.parse(localStorage.getItem(this.KEY)) || [];
        this.curretId = this.data.length ? Math.max(...this.data.map(item => item.id)) + 1 : 0;
        this.todoList = document.querySelector('#todoList');
        this.form = document.querySelector('#myForm');
        this.btn = this.form.querySelector('[type="submit"]');

        this.init();
    }

    init() {
        this.btn.addEventListener('click', (event) => this.handleClickGetData(event));
        this.todoList.addEventListener('click', (event) => this.handleTaskCardAction(event));
        document.addEventListener('DOMContentLoaded', () => this.renderTodos());
    }

    saveDataTodo() {
        localStorage.setItem(this.KEY, JSON.stringify(this.data));
    }

    addTodo(name, text) {
        const dataObj = {
            id: this.curretId++,
            name: name,
            text: text,
            isComplited: false,
        };
        this.data.push(dataObj);
        this.saveDataTodo();

        this.renderTodos();
    };

    toDoDone(id, card) {
        const item = this.data.find((item) => item.id === id);
        if (!item) return;

        item.isComplited = !item.isComplited;
        card.classList.toggle('done');
        this.saveDataTodo();
    };

    toDoRemove(id) {
        const index = this.data.findIndex((item) => item.id === id);
        this.data.splice(index, 1);
        this.saveDataTodo();
        this.renderTodos();
    };

    handleClickGetData(event) {
        event.preventDefault();
        const nameTask = this.form.querySelector('#exampleFormControlInput1').value;
        const textTask = this.form.querySelector('#exampleFormControlTextarea1').value;

        this.addTodo(nameTask, textTask);
        this.form.reset();
    }

    handleTaskCardAction(event) {
        const target = event.target;
        const card = target.closest('.card');
        const id = card ? Number(card.dataset.id) : null;

        if (id === null) return;

        const btnDone = target.classList.contains('complete-btn');
        if (btnDone) {
            this.toDoDone(id, card);
        }
        const btnRemove = target.classList.contains('delete-btn');
        if (btnRemove) {
            this.toDoRemove(id);
        }
    }

    renderTodos() {
        this.todoList.innerHTML = '';
        this.data.forEach((item) => {
            const el = document.createElement('div');
            el.classList.add('col-4', 'py-3');
            el.innerHTML = `<div class='card ${item.isComplited ? 'done' : ''}' data-id="${item.id}">
                                <div class="card-body">
                                    <h5 class="card-title">To do #${item.id}</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">
                                    ${item.name}
                                    </h6>
                                    <p class="card-text">
                                        ${item.text}
                                    </p>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-success complete-btn">Виконано</button>
                                        <button type="button" class="btn btn-danger delete-btn">Видалити</button>
                                    </div>
                                </div>
                            </div>`;
            this.todoList.prepend(el);
        });
    }
}
new TodoList();