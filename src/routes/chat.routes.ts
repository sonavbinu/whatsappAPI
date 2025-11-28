// index.ts
import express from 'express';
import whatsapp from './whatsapp';

const app = express();

app.use(express.json());

// SEND MESSAGE API
app.post('/send', async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.json({ success: false, error: 'number and message required' });
  }

  const chatId = number + '@c.us'; // WhatsApp format

  try {
    await whatsapp.sendMessage(chatId, message);
    res.json({ success: true, sent_to: number });
  } catch (error) {
    res.json({ success: false, error: error });
  }
});

app.listen(3000, () => console.log('Server running on 3000'));
