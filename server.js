import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

console.log('VITE_LUMA_AUTH_TOKEN:', process.env.VITE_LUMA_AUTH_TOKEN);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Luma AI proxy server is running');
});

const LUMA_API_URL = 'https://api.lumalabs.ai/dream-machine/v1';


app.post('/api/generations', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    const response = await axios.post(`${LUMA_API_URL}/generations`, req.body, {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_LUMA_AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Luma API response:', response.data);
    res.json(response.data);
    console.log('Raw API response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/generations/:id', async (req, res) => {
  const generationId = req.params.id;
  console.log('Fetching generation with ID:', generationId);
  try {
    const response = await axios.get(`${LUMA_API_URL}/generations/${generationId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_LUMA_AUTH_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    console.log('Luma API response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching generation:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/generations', async (req, res) => {
  console.log('Fetching all generations');
  try {
    const response = await axios.get(`${LUMA_API_URL}/generations`, {
      headers: {
        'Authorization': `Bearer ${process.env.VITE_LUMA_AUTH_TOKEN}`,
        'Accept': 'application/json'
      },
      params: {
        limit: 10,
        offset: 0
      }
    });
    
    const generations = response.data.generations.map(gen => ({
      id: gen.id,
      prompt: gen.request.prompt,
      state: gen.state,
      mediaUrl: gen.assets?.video || null,
      mediaType: gen.assets?.video ? 'video' : null
    }));
    
    console.log('Mapped generations:', JSON.stringify(generations, null, 2));

    res.json(generations);
  } catch (error) {
    console.error('Error fetching generations:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
