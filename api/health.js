export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'Bible Chat API is running on Vercel',
    timestamp: new Date().toISOString()
  });
}
