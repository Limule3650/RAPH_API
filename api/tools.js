export default async function handler(req, res) {
  const { key } = req.query;
  if (key !== process.env.API_KEY) return res.status(401).json({ error: 'Unauthorized' });

  const repo = process.env.REPO;
  const url = `https://api.github.com/repos/${repo}/contents/tools`;

  const response = await fetch(url);
  const data = await response.json();

  const tools = data.map(f => ({ name: f.name, url: f.download_url }));
  res.json(tools);
}