const express = require('express');
const { Client } = require('pg');

const app = express();
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionTimeoutMillis: 2000,
  query_timeout: 2000
};
let databaseConnected = false;

// Check every three seconds. A database problem must not stop the website.
async function checkDatabase() {
  const client = new Client(dbConfig);
  client.on('error', () => { databaseConnected = false; });
  try {
    await client.connect();
    await client.query('SELECT 1');
    databaseConnected = true;
    console.log(`[DB] Connected to PostgreSQL at ${dbConfig.host}:${dbConfig.port}`);
  } catch (error) {
    databaseConnected = false;
    console.log(`[DB] Connection failed to ${dbConfig.host}:${dbConfig.port}`);
    console.log(`[DB] ${error.message}. Retrying in 3 seconds.`);
  } finally {
    await client.end().catch(() => {});
    setTimeout(checkDatabase, 3000);
  }
}

app.get('/', (req, res) => {
  const status = databaseConnected ? 'connected' : 'disconnected (retrying)';
  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>Docker Networking Lab</title>
<style>body{font-family:system-ui,sans-serif;max-width:650px;margin:80px auto;padding:24px;line-height:1.6;background:#f4f7fa;color:#17324d}main{background:white;padding:32px;border-radius:12px}</style></head>
<body><main><h1>Docker Networking Lab</h1><p>App status: running</p>
<p>Database status: ${status}</p><p>Refresh to see the latest status.</p>
<p><a href="/health">Check health</a></p></main></body></html>`);
});

app.get('/health', (req, res) => res.json({
  status: 'ok',
  database: databaseConnected ? 'connected' : 'disconnected'
}));

app.listen(3000, '0.0.0.0', () => {
  console.log('Server listening on port 3000');
  checkDatabase();
});

