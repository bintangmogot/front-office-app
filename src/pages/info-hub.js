import { articles } from '../data/articles.js'

export function renderInfoHub() {
  const categories = [...new Set(articles.map(a => a.category))]

  return `
    <div class="page-container">
      <h1 class="page-header">INFORMATION HUB</h1>

      <div class="flex gap-0 mb-6 flex-wrap">
        <button class="shift-tab active" data-cat="ALL">ALL</button>
        ${categories.map(c => `<button class="shift-tab" data-cat="${c}">${c}</button>`).join('')}
      </div>

      <div class="info-grid" id="articles-grid">
        ${articles.map(a => `
          <a href="#/info/${a.id}" class="article-card">
            <img src="${a.image}" alt="${a.title}" loading="lazy" />
            <div class="p-4">
              <span class="text-xs opacity-40 tracking-widest">${a.category}</span>
              <h3 class="text-lg mt-1" style="font-family: 'Archivo Black', sans-serif; line-height: 1.2;">${a.title}</h3>
              <p class="text-sm mt-2 opacity-60">${a.summary}</p>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `
}

export function initInfoHub() {
  const tabs = document.querySelectorAll('.shift-tab')
  const grid = document.getElementById('articles-grid')

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat
      tabs.forEach(t => t.classList.toggle('active', t === tab))

      const cards = grid.querySelectorAll('.article-card')
      cards.forEach(card => {
        const articleId = card.getAttribute('href').split('/info/')[1]
        const article = articles.find(a => a.id === articleId)
        if (cat === 'ALL' || article?.category === cat) {
          card.style.display = 'block'
        } else {
          card.style.display = 'none'
        }
      })
    })
  })
}
