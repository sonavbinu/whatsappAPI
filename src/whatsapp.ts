import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';

const whatsapp = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
  },
});

whatsapp.on('qr', qr => {
  console.log('QR RECEIVED');
  qrcode.generate(qr, { small: true });
});

whatsapp.on('ready', () => {
  console.log('WhatsApp Client is ready!');
});

whatsapp.on('message', msg => {
  const text = msg.body.toLowerCase();

  if (text.includes('hi') || text.includes('hello')) {
    msg.reply("Hi! 👋 I'm your bot. How can I help you?");
  }

  if (text.includes('help')) {
    msg.reply(
      'Here are the things I can do:\n1️⃣ Say Hi\n2️⃣ Give info\n3️⃣ General chat'
    );
  }

  if (text.includes('info')) {
    msg.reply(
      'This is a simple WhatsApp auto-reply bot created with Node.js 💚'
    );
  }
});

whatsapp.initialize();

export default whatsapp;
