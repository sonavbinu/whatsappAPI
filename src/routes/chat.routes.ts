// index.ts
import express from 'express';
import whatsapp from '../whatsapp';
import { Request, Response } from 'express';

const app = express();

app.use(express.json());

// SEND MESSAGE API
app.post('/send', async (req: Request, res: Response): Promise<void> => {
  const { number, message } = req.body;

  if (!number || !message) {
    res.json({ success: false, error: 'number and message required' });
    return;
  }

  const chatId = `${number}@c.us`;

  try {
    await whatsapp.sendMessage(chatId, message);
    res.json({ success: true, sent_to: number });
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

app.listen(3000, () => console.log('Server running on 3000'));
