export default function handler(_req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.status(200).json({
    enabled: false,
    isVerified: true,
    expiresAt: null,
    remainingMs: 0,
  });
}
