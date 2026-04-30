export function renderReminder() {
  return `
    <div class="page-container">
      <h1 class="page-header">REMINDERS</h1>
      <p class="mb-6 opacity-80 uppercase font-bold">Manage Events, Classes, and Important Dates</p>

      <form id="reminder-form" class="mb-8 flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          id="reminder-input" 
          placeholder="ENTER NEW REMINDER..." 
          class="flex-1 border-3 border-black p-3 font-heading uppercase text-lg focus:outline-none focus:bg-gray-100"
          required
        />
        <button type="submit" class="btn btn-neutral whitespace-nowrap px-8">ADD</button>
      </form>

      <div id="reminder-list" class="flex flex-col gap-4">
        <!-- Reminders will be rendered here -->
      </div>
    </div>
  `
}

export function initReminder() {
  const form = document.getElementById('reminder-form')
  const input = document.getElementById('reminder-input')
  const list = document.getElementById('reminder-list')

  if (!form || !input || !list) return

  let reminders = JSON.parse(localStorage.getItem('obsidian_reminders')) || [
    { id: 1, text: 'Morning Shift Handover', completed: false },
    { id: 2, text: 'Check Waitlist for 17:00 Class', completed: false }
  ]

  function saveReminders() {
    localStorage.setItem('obsidian_reminders', JSON.stringify(reminders))
  }

  function renderList() {
    if (reminders.length === 0) {
      list.innerHTML = '<p class="opacity-50 italic uppercase font-bold">No active reminders.</p>'
      return
    }

    list.innerHTML = reminders.map(reminder => `
      <div class="border-3 border-black p-4 flex justify-between items-center bg-white ${reminder.completed ? 'opacity-50' : ''}" data-id="${reminder.id}">
        <label class="flex items-center gap-3 cursor-pointer flex-1">
          <input type="checkbox" class="reminder-checkbox hidden" ${reminder.completed ? 'checked' : ''}>
          <div class="w-6 h-6 border-3 border-black flex items-center justify-center bg-white shrink-0">
            ${reminder.completed ? '<span class="text-black font-bold">✓</span>' : ''}
          </div>
          <span class="font-bold text-lg uppercase ${reminder.completed ? 'line-through' : ''}">${reminder.text}</span>
        </label>
        <button class="reminder-delete btn btn-neutral p-2 min-h-0 h-auto ml-4">
          DELETE
        </button>
      </div>
    `).join('')
  }

  list.addEventListener('click', (e) => {
    const item = e.target.closest('[data-id]')
    if (!item) return
    const id = parseInt(item.dataset.id)

    // Handle delete button
    if (e.target.closest('.reminder-delete')) {
      reminders = reminders.filter(r => r.id !== id)
      saveReminders()
      renderList()
      return
    }

    // Handle checkbox / label click
    const label = e.target.closest('label')
    if (label) {
      // Prevent double firing if clicking directly on input
      if (e.target.tagName !== 'INPUT') {
        const reminder = reminders.find(r => r.id === id)
        if (reminder) {
          reminder.completed = !reminder.completed
          saveReminders()
          renderList()
        }
      }
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = input.value.trim()
    if (text) {
      reminders.unshift({
        id: Date.now(),
        text,
        completed: false
      })
      input.value = ''
      saveReminders()
      renderList()
    }
  })

  // Initial render
  renderList()
}
