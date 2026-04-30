export function renderNav(currentRoute) {
  const links = [
    { label: 'HOME', hash: '#/' },
    { label: 'TO-DO', hash: '#/todo' },
    { label: 'INFO', hash: '#/info' },
    { label: 'FLOW', hash: '#/flow' },
  ]

  const navLinks = links.map(link => {
    const isActive = currentRoute === link.hash || 
      (link.hash !== '#/' && currentRoute.startsWith(link.hash))
    return `<a href="${link.hash}" class="nav-link ${isActive ? 'active' : ''}">${link.label}</a>`
  }).join('')

  return `
    <nav class="nav-bar sticky top-0 z-50 flex items-center justify-between px-4 py-3 md:px-6">
      <a href="#/" class="font-heading text-lg md:text-xl tracking-wider no-underline text-black">OBSIDIAN FO</a>
      <div class="flex gap-1 md:gap-2">
        ${navLinks}
      </div>
    </nav>
  `
}
