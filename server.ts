import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;
const TARGET_API_ORIGIN = 'https://all.codewithvivek.qzz.io';

async function startServer() {
  const app = express();

  // Parse raw body for binary license requests, and json/urlencoded for login
  app.use(express.raw({ type: '*/*', limit: '10mb' }));

  // 1. Static logo endpoint
  app.get('/logo.png', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/logo.png'));
  });

  // 2. Always-verified status endpoint
  app.get('/api/verify/status', (_req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.json({
      enabled: false,
      isVerified: true,
      expiresAt: null,
      remainingMs: 0,
    });
  });

  app.post('/api/verify/start', (_req, res) => {
    res.json({
      enabled: false,
      isVerified: true,
      message: 'Access is fully verified',
    });
  });

  // 3. Bulletproof proxy for all /api endpoints
  app.all('/api/*', async (req, res) => {
    try {
      const targetUrl = TARGET_API_ORIGIN + req.originalUrl;
      const platform = (req.headers['x-platform'] ||
        req.headers['platform'] ||
        req.headers['x-api-platform'] ||
        'eduteria') as string;

      const outgoingHeaders: Record<string, string> = {
        'x-platform': platform,
        'platform': platform,
        'x-api-platform': platform,
        'x-real-api': 'true',
        'accept': (req.headers['accept'] as string) || 'application/json, text/plain, */*',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      };

      if (req.headers['content-type']) {
        outgoingHeaders['content-type'] = req.headers['content-type'] as string;
      }
      if (req.headers['pallycon-customdata-v2']) {
        outgoingHeaders['pallycon-customdata-v2'] = req.headers['pallycon-customdata-v2'] as string;
      }
      if (req.headers['authorization']) {
        outgoingHeaders['authorization'] = req.headers['authorization'] as string;
      }

      const requestInit: RequestInit = {
        method: req.method,
        headers: outgoingHeaders,
      };

      if (req.method !== 'GET' && req.method !== 'HEAD') {
        requestInit.body = req.body;
      }

      const upstreamRes = await fetch(targetUrl, requestInit);

      res.status(upstreamRes.status);
      upstreamRes.headers.forEach((val, key) => {
        const lowerKey = key.toLowerCase();
        if (
          !['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(lowerKey)
        ) {
          res.setHeader(key, val);
        }
      });
      res.setHeader('access-control-allow-origin', '*');

      const arrayBuffer = await upstreamRes.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (err: any) {
      console.error(`[API Proxy Error on ${req.originalUrl}]:`, err.message);
      res.status(502).json({
        success: false,
        error: 'Backend proxy error: ' + err.message,
      });
    }
  });

  // 4. Dev mode: Vite middlewares; Prod mode: Static dist files
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GB STUDY server listening on http://0.0.0.0:${PORT} (isProduction: ${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start GB STUDY server:', err);
  process.exit(1);
});
