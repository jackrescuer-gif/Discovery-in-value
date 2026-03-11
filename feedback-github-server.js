// Мини-сервер для приёма обратной связи с сайта и создания GitHub Issues.
// Запуск:
//   GITHUB_TOKEN=... GITHUB_OWNER=... GITHUB_REPO=... node feedback-github-server.js

import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

// Простейший CORS, чтобы можно было вызывать сервер из file:// и localhost-страниц
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

const {
  GITHUB_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPO,
  PORT = 4000
} = process.env;

if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
  console.warn('[feedback-server] Не заданы GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO. Сервер поднимется, но запросы будут падать.');
}

// Маппинг страниц на дополнительные лейблы и ассайни
const pageConfig = {
  'framework-selection': {
    extraLabels: ['area:framework'],
    assignees: ['jackrescuer-gif']
  }
};

app.post('/api/feedback', async (req, res) => {
  const { pageId, url, text, author, isTask } = req.body || {};

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }

  const safePage = pageId || 'unknown';
  const kind = isTask ? 'TASK' : 'COMMENT';
  const title = `[DISCOVERY][${kind}][${safePage}] ${text.slice(0, 80)}`;

  const bodyLines = [
    `**Страница:** ${safePage}`,
    url ? `**URL:** ${url}` : '',
    author ? `**Автор:** ${author}` : '',
    `**Тип:** ${isTask ? 'Task' : 'Comment'}`,
    '',
    '---',
    '',
    text
  ].filter(Boolean);

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error('[feedback-server] GitHub env vars missing, cannot create issue');
    return res.status(500).json({ error: 'GitHub not configured' });
  }

  try {
    const cfg = pageConfig[safePage] || { extraLabels: [], assignees: [] };
    const labels = [
      'feedback',
      isTask ? 'task' : 'comment',
      `page:${safePage}`,
      ...cfg.extraLabels
    ];

    const ghResp = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'discovery-feedback-widget'
      },
      body: JSON.stringify({
        title,
        body: bodyLines.join('\n'),
        labels,
        assignees: cfg.assignees
      })
    });

    if (!ghResp.ok) {
      const txt = await ghResp.text();
      console.error('[feedback-server] GitHub error:', ghResp.status, txt);
      return res.status(502).json({ error: 'GitHub API error' });
    }

    const json = await ghResp.json();
    res.json({ ok: true, issueNumber: json.number, issueUrl: json.html_url });
  } catch (err) {
    console.error('[feedback-server] Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/healthz', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`[feedback-server] listening on http://localhost:${PORT}`);
});

