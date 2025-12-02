import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';

const whatsapp = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
  let response = '';

  if (/hi|hello/.test(text))
    response = "Hi!👋 I'm your bot. How can I help you?";
  else if (/help/.test(text))
    response =
      "'Here are the things I can do:\n Say Hi\n Give info\n General chat';";
  else if (/info/.test(text))
    response =
      'This is a simple WhatsApp auto-reply bot created with Node.js 💚';

  if (response) msg.reply(response);
});

whatsapp.initialize();

export default whatsapp;
