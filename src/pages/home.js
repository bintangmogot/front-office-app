export function renderHome() {
  const cards = [
    {
      title: 'TO-DO LIST',
      desc: 'Daily shift checklist - morning and evening tasks',
      hash: '#/todo',
      enabled: true,
    },
    {
      title: 'INFORMATION HUB',
      desc: 'Everything about Obsidian Fitness Studio',
      hash: '#/info',
      enabled: true,
    },
    {
      title: 'FLOW',
      desc: 'Step-by-step front desk job flow',
      hash: '#/flow',
      enabled: true,
    },
    {
      title: 'DASHBOARD',
      desc: 'Class list, participants, input data, team',
      hash: null,
      enabled: false,
    },
    {
      title: 'REMINDER',
      desc: 'Events, classes, and important dates',
      hash: null,
      enabled: false,
    },
  ]

  const cardsHTML = cards.map(card => {
    if (card.enabled) {
      return `
        <a href="${card.hash}" class="home-card">
          <div class="home-card-title">${card.title}</div>
          <div class="home-card-desc">${card.desc}</div>
        </a>
      `
    } else {
      return `
        <div class="home-card disabled">
          <div class="home-card-title">${card.title}</div>
          <div class="home-card-desc">${card.desc}</div>
          <div class="home-card-badge">COMING SOON</div>
        </div>
      `
    }
  }).join('')

  return `
    <div class="home-grid">
      ${cardsHTML}
    </div>
  `
}
