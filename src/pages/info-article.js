import { articles } from '../data/articles.js'

export function renderInfoArticle(id) {
  const article = articles.find(a => a.id === id)

  if (!article) {
    return `
      <div class="page-container">
        <h1 class="page-header">ARTICLE NOT FOUND</h1>
        <p>The article you are looking for does not exist.</p>
        <a href="#/info" class="btn btn-neutral mt-4">BACK TO HUB</a>
      </div>
    `
  }

  return `
    <div class="page-container" style="max-width: 800px;">
      <a href="#/info" class="inline-block mb-4 text-sm uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity" style="text-decoration: none; color: #000;">← BACK TO HUB</a>

      <img src="${article.image}" alt="${article.title}" class="w-full mb-6 border-3 border-black" style="max-height: 300px; object-fit: cover;" />

      <span class="text-xs opacity-40 tracking-widest">${article.category}</span>
      <h1 class="page-header mt-1">${article.title}</h1>

      <div class="article-content">
        ${article.content}
      </div>
    </div>
  `
}
