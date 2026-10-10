const express = require('express');
const fs = require('node:fs');
const path = require('node:path');

const app = express();
const fileMessage = fs.readFileSync(path.join(__dirname, 'message.txt'), 'utf8').trim();
const message = process.env.APP_MESSAGE ?? fileMessage;

// Show the message as text, even if it contains HTML characters.
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

app.get('/', (req, res) => {
  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Docker DevOps Lab</title>
<style>body{font-family:system-ui,sans-serif;max-width:650px;margin:80px auto;padding:24px;line-height:1.6;background:#f4f7fa;color:#17324d}main{background:white;padding:32px;border-radius:12px}</style></head>
<body><main><h1>Docker DevOps Lab</h1><p>${escapeHtml(message)}</p>
<p>App status: running</p><p><a href="/health">Check health</a></p></main></body>
</html>`);
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(3000, '0.0.0.0', () => {
  console.log('Server listening on port 3000');
});

