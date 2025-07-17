const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api', async (req, res) => {
  const { userText } = req.body;

  try {
    const response = await openai.responses.create({
      prompt: {
        id: "pmpt_68788e123e608193bd7fead6cc978bf8044a39b777673cab",
        version: "2"
      },
      input: { userText }
    });

    res.json({ result: response.response });
  } catch (error) {
    console.error("Error al contactar la IA personalizada:", error);
    res.status(500).json({ error: 'Error al contactar la IA personalizada' });
  }
});

module.exports = app;
