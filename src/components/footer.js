import { team, supervisor } from '../data/team.js'

export function renderFooter() {
  const names = [...team.map(m => m.name), supervisor.name].join(' / ')
  const year = new Date().getFullYear()

  return `
    <footer class="border-t-3 border-black py-6 px-4 mt-auto">
      <div class="max-w-[1200px] mx-auto text-center">
        <p class="font-heading text-sm mb-2">OBSIDIAN FITNESS STUDIO - FRONT OFFICE TEAM</p>
        <p class="text-xs opacity-60">${names}</p>
        <p class="text-xs opacity-40 mt-2">${year}</p>
      </div>
    </footer>
  `
}
