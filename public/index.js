import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

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
        version: "1"
      },
      input: { userText }
    });

    res.json({ result: response.response }); // Asume que la API devuelve así
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error al contactar la IA personalizada' });
  }
});

export default app;
