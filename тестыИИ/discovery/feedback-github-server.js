// Мини-сервер для приёма фидбека с сайта и создания GitHub Issues.
// Запуск:
//   GITHUB_TOKEN=... GITHUB_OWNER=... GITHUB_REPO=... node feedback-github-server.js

import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const {
  GITHUB_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPO,
  PORT = 4000
} = process.env;

if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
  console.warn('[feedback-server] Не заданы GITHUB_TOKEN / GITHUB_OWNER / GITHUB_REPO. Сервер поднимется, но запросы будут падать.');
}

app.post('/api/feedback', async (req, res) => {
  const { pageId, url, text, author, isTask } = req.body || {};

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' });
  }

  const safePage = pageId || 'unknown';
  const titlePrefix = isTask ? '[TASK]' : '[COMMENT]';
  const title = `${titlePrefix} ${safePage}: ${text.slice(0, 60)}`;

  const bodyLines = [
    `**Страница:** ${safePage}`,
    url ? `**URL:** ${url}` : '',
    author ? `**Автор:** ${author}` : '',
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
        labels: [
          'feedback',
          isTask ? 'task' : 'comment',
          `page:${safePage}`
        ]
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

