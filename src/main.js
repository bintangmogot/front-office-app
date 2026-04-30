import './style.css'
import { renderNav } from './components/nav.js'
import { renderFooter } from './components/footer.js'
import { renderHome } from './pages/home.js'
import { renderTodo, initTodo } from './pages/todo.js'
import { renderInfoHub, initInfoHub } from './pages/info-hub.js'
import { renderInfoArticle } from './pages/info-article.js'
import { renderFlow, initFlow } from './pages/flow.js'
import { renderReminder, initReminder } from './pages/reminder.js'

const app = document.getElementById('app')

function getRoute() {
  return window.location.hash || '#/'
}

function router() {
  const route = getRoute()
  let pageContent = ''
  let afterRender = null

  if (route === '#/' || route === '#' || route === '') {
    pageContent = renderHome()
  } else if (route === '#/todo') {
    pageContent = renderTodo()
    afterRender = initTodo
  } else if (route === '#/info') {
    pageContent = renderInfoHub()
    afterRender = initInfoHub
  } else if (route.startsWith('#/info/')) {
    const id = route.replace('#/info/', '')
    pageContent = renderInfoArticle(id)
  } else if (route === '#/flow') {
    pageContent = renderFlow()
    afterRender = initFlow
  } else if (route === '#/reminder') {
    pageContent = renderReminder()
    afterRender = initReminder
  } else {
    pageContent = `
      <div class="page-container flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 class="font-heading text-4xl md:text-6xl mb-4">404</h1>
        <p class="mb-6">PAGE NOT FOUND</p>
        <a href="#/" class="btn btn-neutral">BACK TO HOME</a>
      </div>
    `
  }

  // Home page uses full viewport (no nav/footer)
  if (route === '#/' || route === '#' || route === '') {
    app.innerHTML = `
      <div class="min-h-screen flex flex-col">
        <header class="nav-bar flex items-center justify-between px-4 py-4 md:px-6">
          <span class="font-heading text-lg md:text-xl tracking-wider">OBSIDIAN FO</span>
          <span class="text-xs opacity-50 font-body">FRONT OFFICE TOOL</span>
        </header>
        <main class="flex-1">
          ${pageContent}
        </main>
      </div>
    `
  } else {
    app.innerHTML = `
      <div class="min-h-screen flex flex-col">
        ${renderNav(route)}
        <main class="flex-1">
          ${pageContent}
        </main>
        ${renderFooter()}
      </div>
    `
  }

  // Run page-specific init after DOM is ready
  if (afterRender) {
    afterRender()
  }

  // Scroll to top on route change
  window.scrollTo(0, 0)
}

// Listen for hash changes
window.addEventListener('hashchange', router)

// Initial render
router()
