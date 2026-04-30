import { storage } from '../lib/storage.js'
import { defaultTodos } from '../data/todos-default.js'

function getCurrentShift() {
  const hour = new Date().getHours()
  // Morning: 6am-2pm, Evening: 11am-7pm
  // If before 2pm, show morning. Otherwise evening.
  return hour < 14 ? 'morning' : 'evening'
}

function getTodos(shift) {
  const saved = storage.get(`todos_${shift}`)
  if (saved) return saved

  // Initialize with defaults
  const initial = defaultTodos[shift].map(t => ({ ...t, checked: false }))
  storage.set(`todos_${shift}`, initial)
  return initial
}

function getCustomTodos(shift) {
  return storage.get(`todos_custom_${shift}`, [])
}

function saveCustomTodos(shift, todos) {
  storage.set(`todos_custom_${shift}`, todos)
}

function saveTodos(shift, todos) {
  storage.set(`todos_${shift}`, todos)
}

export function renderTodo() {
  const currentShift = getCurrentShift()

  return `
    <div class="page-container">
      <h1 class="page-header">TO-DO LIST</h1>

      <div class="flex gap-0 mb-6">
        <button class="shift-tab active" data-shift="morning">MORNING SHIFT (6AM-2PM)</button>
        <button class="shift-tab" data-shift="evening">EVENING SHIFT (11AM-7PM)</button>
      </div>

      <div class="mb-4 flex items-center justify-between flex-wrap gap-2">
        <p class="text-xs opacity-50" id="shift-indicator">
          CURRENT SHIFT: ${currentShift.toUpperCase()}
        </p>
        <button class="btn btn-error btn-sm" id="reset-btn">RESET ALL</button>
      </div>

      <div id="todo-list"></div>

      <div class="mt-6 border-t-3 border-black pt-4 bg-white">
        <p class="text-sm mb-2 font-bold uppercase">ADD CUSTOM TASK</p>
        <div class="flex gap-2">
          <input type="text" id="new-task-input" placeholder="Type new task..." class="input input-bordered flex-1 border-2 border-black bg-white" />
          <button class="btn btn-neutral" id="add-task-btn">ADD</button>
        </div>
      </div>
    </div>
  `
}

export function initTodo() {
  let activeShift = getCurrentShift()

  const tabs = document.querySelectorAll('.shift-tab')
  const todoList = document.getElementById('todo-list')
  const addBtn = document.getElementById('add-task-btn')
  const input = document.getElementById('new-task-input')
  const resetBtn = document.getElementById('reset-btn')

  // Set initial active tab
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.shift === activeShift)
  })

  function render() {
    const defaults = getTodos(activeShift)
    const customs = getCustomTodos(activeShift)

    // Group defaults by category
    const categories = {}
    defaults.forEach(todo => {
      if (!categories[todo.category]) categories[todo.category] = []
      categories[todo.category].push(todo)
    })

    let html = ''

    // Render grouped defaults
    for (const [category, todos] of Object.entries(categories)) {
      html += `<div class="mb-4">
        <p class="text-xs uppercase opacity-40 mb-1 tracking-widest">${category}</p>`

      todos.forEach(todo => {
        html += `
          <div class="todo-item ${todo.checked ? 'checked' : ''}" data-id="${todo.id}">
            <label class="flex-1 flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="checkbox checkbox-sm border-2 border-black text-black bg-transparent" ${todo.checked ? 'checked' : ''} data-id="${todo.id}" data-type="default" />
              <span>${todo.text}</span>
            </label>
          </div>
        `
      })
      html += '</div>'
    }

    // Render custom tasks
    if (customs.length > 0) {
      html += `<div class="mb-4 mt-6 border-t-2 border-black pt-4">
        <p class="text-xs uppercase opacity-40 mb-1 tracking-widest">CUSTOM TASKS</p>`

      customs.forEach(todo => {
        html += `
          <div class="todo-item ${todo.checked ? 'checked' : ''}" data-id="${todo.id}">
            <label class="flex-1 flex items-center gap-3 cursor-pointer">
              <input type="checkbox" class="checkbox checkbox-sm border-2 border-black" ${todo.checked ? 'checked' : ''} data-id="${todo.id}" data-type="custom" />
              <span>${todo.text}</span>
            </label>
            <button class="todo-delete" data-id="${todo.id}">DEL</button>
          </div>
        `
      })
      html += '</div>'
    }

    // Progress
    const allTodos = [...defaults, ...customs]
    const checkedCount = allTodos.filter(t => t.checked).length
    const totalCount = allTodos.length
    const pct = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0

    html = `
      <div class="mb-4 p-3 border-2 border-black">
        <div class="flex justify-between mb-1">
          <span class="text-sm">${checkedCount} / ${totalCount} COMPLETED</span>
          <span class="text-sm">${pct}%</span>
        </div>
        <div class="w-full h-3 bg-gray-200 border border-black">
          <div class="h-full bg-black transition-all" style="width: ${pct}%"></div>
        </div>
      </div>
    ` + html

    todoList.innerHTML = html

    // Attach checkbox listeners
    todoList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.dataset.id
        const type = cb.dataset.type

        if (type === 'default') {
          const todos = getTodos(activeShift)
          const todo = todos.find(t => t.id === id)
          if (todo) {
            todo.checked = cb.checked
            saveTodos(activeShift, todos)
          }
        } else {
          const customs = getCustomTodos(activeShift)
          const todo = customs.find(t => t.id === id)
          if (todo) {
            todo.checked = cb.checked
            saveCustomTodos(activeShift, customs)
          }
        }
        render()
      })
    })

    // Attach delete listeners
    todoList.querySelectorAll('.todo-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id
        const customs = getCustomTodos(activeShift).filter(t => t.id !== id)
        saveCustomTodos(activeShift, customs)
        render()
      })
    })
  }

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeShift = tab.dataset.shift
      tabs.forEach(t => t.classList.toggle('active', t.dataset.shift === activeShift))
      render()
    })
  })

  // Add task
  function addTask() {
    const text = input.value.trim()
    if (!text) return

    const customs = getCustomTodos(activeShift)
    customs.push({
      id: `custom_${Date.now()}`,
      text,
      category: 'Custom',
      isDefault: false,
      checked: false,
    })
    saveCustomTodos(activeShift, customs)
    input.value = ''
    render()
  }

  addBtn.addEventListener('click', addTask)
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask()
  })

  // Reset all
  resetBtn.addEventListener('click', () => {
    const defaults = getTodos(activeShift)
    defaults.forEach(t => t.checked = false)
    saveTodos(activeShift, defaults)

    const customs = getCustomTodos(activeShift)
    customs.forEach(t => t.checked = false)
    saveCustomTodos(activeShift, customs)

    render()
  })

  // Initial render
  render()
}
