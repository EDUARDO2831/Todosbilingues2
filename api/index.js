// Importa los paquetes que instalamos
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

// Inicia la aplicación del servidor
const app = express();
app.use(express.json());
app.use(cors()); // Permite que tu frontend se comunique con este backend

// Configura OpenAI con la API Key que guardaremos en Vercel
// process.env.OPENAI_API_KEY es la forma segura de leer un secreto
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

// Define la ruta (endpoint) que tu frontend llamará.
// Por ejemplo: https://tu-app.vercel.app/api
app.post('/api', async (req, res) => {
  const { userText } = req.body; // Recibe el texto del usuario desde el frontend

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `Eres un evaluador de inglés. Evalúa las siguientes frases de un estudiante. Las frases deben ser positivas, lógicas y usar la estructura "Objective + Indicator + Description". Aprueba si al menos el 85% son correctas. Responde únicamente con la palabra "aprobado" o "reprobado".`
            },
            {
                role: "user",
                content: userText
            }
        ]
    });

    const decision = response.choices[0].message.content;
    res.json({ result: decision }); // Envía el resultado de vuelta al frontend

  } catch (error) {
    res.status(500).json({ error: 'Error al contactar la IA' });
  }
});

// Exporta la app para que Vercel la pueda usar
export default app;