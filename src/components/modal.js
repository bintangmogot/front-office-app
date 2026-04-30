// Reusable modal component using DaisyUI modal

export function openModal(title, bodyHTML) {
  // Remove existing modal if any
  closeModal()

  const overlay = document.createElement('div')
  overlay.id = 'global-modal'
  overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4'
  overlay.innerHTML = `
    <div class="fixed inset-0 bg-black/60" id="modal-backdrop"></div>
    <div class="modal-box relative z-10 bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8">
      <h3 class="font-heading text-xl md:text-2xl mb-4 border-b-3 border-black pb-3">${title}</h3>
      <div class="modal-body font-body text-sm md:text-base">
        ${bodyHTML}
      </div>
      <div class="mt-6 pt-4 border-t-2 border-black">
        <button class="btn btn-neutral w-full" id="modal-close-btn">CLOSE</button>
      </div>
    </div>
  `

  document.body.appendChild(overlay)
  document.body.style.overflow = 'hidden'

  // Close handlers
  document.getElementById('modal-backdrop').addEventListener('click', closeModal)
  document.getElementById('modal-close-btn').addEventListener('click', closeModal)
  document.addEventListener('keydown', handleEsc)
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal()
}

export function closeModal() {
  const modal = document.getElementById('global-modal')
  if (modal) {
    modal.remove()
    document.body.style.overflow = ''
    document.removeEventListener('keydown', handleEsc)
  }
}
