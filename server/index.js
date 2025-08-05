const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/convert', async (req, res) => {
  const { dialect, schema, query } = req.body;

  const prompt = `
You are an expert SQL generator. Use the ${dialect} dialect.

Schema:
${schema || 'N/A'}

English Query:
${query}

Write the SQL query only. No explanations.
`;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt,
      stream: false
    });

    const generated = response.data.response.trim();
    res.json({ sql: generated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sql: '-- Failed to generate SQL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
