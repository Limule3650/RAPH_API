export default async function handler(req, res) {
  const { key } = req.query;
  const filename = req.url.split('/').pop();

  if (key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

  const url = `https://raw.githubusercontent.com/${process.env.REPO}/main/tools/${filename}`;

  const file = await fetch(url);
  if (!file.ok) return res.status(404).json({ error: 'Not found' });

  const content = await file.text();
  res.send(content);
}