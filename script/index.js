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


const STORAGE_TODO = 'dataTodo';
const data = JSON.parse(localStorage.getItem(STORAGE_TODO)) || [];
let curretId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 0;
const todoList = document.querySelector('#todoList');
const form = document.querySelector('#myForm');
const btn = form.querySelector('[type="submit"]');

const saveDataTodo = () => {
    localStorage.setItem(STORAGE_TODO, JSON.stringify(data));
}

const addTodo = (name, text) => {
    const dataObj = {
        id: curretId++,
        name: name,
        text: text,
        isComplited: false,
    };
    data.push(dataObj);
    saveDataTodo();
    renderTodos();
};

const renderTodos = () => {
    todoList.innerHTML = '';
    data.forEach((item) => {
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
        todoList.prepend(el);
    });
};

const toDoDone = (id, card) => {
    const item = data.find((item) => item.id === id);
    if (!item) return;

    item.isComplited = !item.isComplited;
    card.classList.toggle('done');
    saveDataTodo();
};

const toDoRemove = (id) => {
    const index = data.findIndex((item) => item.id === id);
    data.splice(index, 1);
    saveDataTodo();
    renderTodos();
};

btn.addEventListener('click', (event) => {
    event.preventDefault();
    const nameTask = document.querySelector('#exampleFormControlInput1').value;
    const textTask = document.querySelector('#exampleFormControlTextarea1').value;

    addTodo(nameTask, textTask);
    form.reset();
});

todoList.addEventListener('click', (event) => {
    const target = event.target;
    const card = target.closest('.card');
    const id = card ? Number(card.dataset.id) : null;

    if (id === null) return;

    const btnDone = target.classList.contains('complete-btn');
    if (btnDone) {
        toDoDone(id, card);
    }
    const btnRemove = target.classList.contains('delete-btn');
    if (btnRemove) {
        toDoRemove(id);
    }

});


document.addEventListener('DOMContentLoaded', renderTodos);


// console.log(this);

// const obj = {
//     name: 'ivan',
//     funck() {
//         console.log(this.name);
//     }
// };
// obj.funck();


// function Test(name, age) {
//     this.name = name;
//     this.age = age;
//     this.getlog = function () {
//         console.log(this.name, this.age)
//     }
// }

// const a = new Test('ivan', 44);

// a.getlog()

// console.log(a);


// class Test2 {
//     constructor(name, animal, age) {
//         this.name = name;
//         this.animal = animal;
//         this.age = age;

//         this.initial();
//     }

//     initial() {
//         console.log(this.name, this.animal, this.age);
//     }
// }

// const b = new Test2('Anna', 'Raccon', 55);
// const b = new Test2('Anna', 'Raccon', 55);
// const b = new Test2('Anna', 'Raccon', 55);
// const b = new Test2('Anna', 'Raccon', 55);
// console.log(b);


// const obj2 = {
//     a: 'Anna',
// }
// console.log(obj2);

// class Animal {
//     constructor(nickname) {
//         this.nickname = nickname;
//     }

//     alertName() {
//         console.log(`Мою тваринку звуть ${this.nickname}`)
//     }
// }

// class Dog extends Animal {
//     constructor(breed, nickname) {
//         super(nickname);
//         this.breed = breed;
//         this.nickname = nickname;
//     }

//     search() {
//         console.log(`${this.breed} дуже гарно вміе щось знаходити.`);
//     }
// }

// class Cat extends Animal {
//     constructor(breed, nickname) {
//         super(nickname);
//         this.breed = breed;
//         this.nickname = nickname;
//     }

//     purring() {
//         console.log(`${this.breed} дуже гарно вміе муркотіти.`);
//     }
// }


// const myDog = new Dog('Коргі', 'Круасанчік');
// myDog.alertName();

// myDog.search();