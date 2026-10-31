export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,HEAD');
    res.setHeader('Access-Control-Allow-Headers', '*');
    return res.status(204).end();
  }

  const url = req.url || '';
  if (url.includes('/verify/status')) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      enabled: false,
      isVerified: true,
      expiresAt: null,
      remainingMs: 0,
    });
  }

  if (url.includes('/verify/start')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      enabled: false,
      isVerified: true,
      message: 'Access is fully verified',
    });
  }

  const targetUrl = 'https://all.codewithvivek.qzz.io' + url;
  const platform = (req.headers['x-platform'] ||
    req.headers['platform'] ||
    req.headers['x-api-platform'] ||
    'eduteria') as string;

  try {
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

    const upstreamRes = await fetch(targetUrl, {
      method: req.method || 'GET',
      headers: outgoingHeaders,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    res.status(upstreamRes.status);
    upstreamRes.headers.forEach((val, key) => {
      const lower = key.toLowerCase();
      if (!['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(lower)) {
        res.setHeader(key, val);
      }
    });
    res.setHeader('Access-Control-Allow-Origin', '*');

    const arrayBuffer = await upstreamRes.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    return res.status(502).json({ error: 'Proxy error', message: err.message });
  }
}
