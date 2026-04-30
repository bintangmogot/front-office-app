import { flowData } from '../data/flow-data.js'
import { openModal } from '../components/modal.js'

export function renderFlow() {
  return `
    <div class="page-container" style="max-width: 900px;">
      <h1 class="page-header">JOB FLOW</h1>

      <div class="flex gap-0 mb-8">
        <button class="shift-tab active" data-shift="morning">MORNING SHIFT</button>
        <button class="shift-tab" data-shift="evening">EVENING SHIFT</button>
      </div>

      <div id="flow-container"></div>
    </div>
  `
}

export function initFlow() {
  let activeShift = 'morning'
  const tabs = document.querySelectorAll('.shift-tab')
  const container = document.getElementById('flow-container')

  function render() {
    const data = flowData[activeShift]
    const milestones = data.milestones

    let html = `
      <div class="mb-6">
        <h2 class="text-2xl mb-1" style="font-family: 'Archivo Black', sans-serif;">${data.title}</h2>
        <p class="text-sm opacity-50">${data.subtitle}</p>
      </div>
    `

    milestones.forEach((ms, i) => {
      const isLast = i === milestones.length - 1

      html += `
        <div class="flow-node" data-id="${ms.id}">
          <div class="flex items-center justify-between">
            <span>${ms.title}</span>
            <span class="text-xs opacity-40 ml-2">${ms.time}</span>
          </div>
          <p class="text-xs opacity-50 mt-1 normal-case" style="font-weight: 700;">${ms.summary}</p>
        </div>
      `

      if (!isLast) {
        html += `<div class="flow-line"></div>`
      }
    })

    container.innerHTML = html

    // Attach click listeners for modals
    container.querySelectorAll('.flow-node').forEach(node => {
      node.addEventListener('click', () => {
        const id = node.dataset.id
        const ms = milestones.find(m => m.id === id)
        if (!ms) return

        const detailHtml = `
          <div class="mb-4">
            <span class="text-xs opacity-40 tracking-widest">${ms.time}</span>
            <h2 class="text-xl mt-1" style="font-family: 'Archivo Black', sans-serif;">${ms.title}</h2>
            <p class="text-sm opacity-60 mt-1">${ms.summary}</p>
          </div>
          <div class="border-t-2 border-black pt-4">
            ${ms.details.map(d => `
              <div class="flex items-start gap-3 py-2 border-b border-gray-200">
                <div class="w-2 h-2 bg-black mt-2 shrink-0"></div>
                <span class="text-sm">${d}</span>
              </div>
            `).join('')}
          </div>
        `

        openModal(ms.title, detailHtml)
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

  render()
}
