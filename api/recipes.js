export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/${process.env.AIRTABLE_TABLE}`;
    console.log('Fetching:', url);
    console.log('Token exists:', !!process.env.AIRTABLE_TOKEN);
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` }
    });
    
    console.log('Airtable status:', response.status);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
