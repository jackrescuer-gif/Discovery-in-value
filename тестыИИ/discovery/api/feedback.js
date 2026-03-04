export default async function handler(req, res) {
  // CORS для вызовов с любых Discovery-страниц
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Чтение тела запроса (Vercel может положить уже распарсенный body)
  let body = req.body;
  if (!body) {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const raw = Buffer.concat(chunks).toString('utf8') || '{}';
    try {
      body = JSON.parse(raw);
    } catch {
      body = {};
    }
  }

  const { pageId, url, text, author, isTask } = body || {};

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

  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({ error: 'GitHub not configured' });
  }

  try {
    const labels = [
      'feedback',
      isTask ? 'task' : 'comment',
      `page:${safePage}`
    ];

    const ghResp = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'discovery-feedback-widget'
        },
        body: JSON.stringify({
          title,
          body: bodyLines.join('\n'),
          labels
        })
      }
    );

    if (!ghResp.ok) {
      const txt = await ghResp.text();
      console.error('[vercel-feedback] GitHub error:', ghResp.status, txt);
      return res.status(502).json({ error: 'GitHub API error' });
    }

    const json = await ghResp.json();
    return res
      .status(200)
      .json({ ok: true, issueNumber: json.number, issueUrl: json.html_url });
  } catch (err) {
    console.error('[vercel-feedback] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

