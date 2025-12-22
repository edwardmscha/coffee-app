// DOM 요소 가져오기
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');

// localStorage에서 할 일 목록 불러오기
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 페이지 로드 시 저장된 할 일 목록 표시
window.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

// 할 일 추가 함수
function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('할 일을 입력해주세요!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = '';
    todoInput.focus();
}

// 할 일 목록 렌더링 함수
function renderTodos() {
    pendingList.innerHTML = '';
    completedList.innerHTML = '';
    
    const pendingTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);
    
    // 예정 목록 렌더링
    if (pendingTodos.length === 0) {
        pendingList.innerHTML = '<li class="empty-message">예정된 할 일이 없습니다.</li>';
    } else {
        pendingTodos.forEach(todo => {
            const li = createTodoItem(todo);
            pendingList.appendChild(li);
        });
    }
    
    // 완료 목록 렌더링
    if (completedTodos.length === 0) {
        completedList.innerHTML = '<li class="empty-message">완료된 할 일이 없습니다.</li>';
    } else {
        completedTodos.forEach(todo => {
            const li = createTodoItem(todo);
            completedList.appendChild(li);
        });
    }
}

// 할 일 항목 생성 함수
function createTodoItem(todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (todo.completed) {
        li.classList.add('completed');
    }
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    if (todo.completed) {
        span.classList.add('completed');
    }
    span.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
}

// 할 일 완료 상태 토글 함수
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

// 할 일 삭제 함수
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// localStorage에 할 일 목록 저장 함수
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 추가 버튼 클릭 이벤트
addBtn.addEventListener('click', addTodo);

// Enter 키 입력 이벤트
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

