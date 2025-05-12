// scripts/sendReminder.js
const nodemailer = require('nodemailer');

// === CONFIGURE TARGET & REMINDER OFFSET ===
const TARGET = new Date('2025-11-12T00:00:00Z');
const MS_PER_DAY = 1000 * 60 * 60 * 24;

(async () => {
  const now       = new Date();
  const daysLeft  = Math.floor((TARGET - now) / MS_PER_DAY);

  // Only send when exactly 7 days remain
  if (daysLeft !== 7) {
    console.log(`No email: ${daysLeft} days until release.`);
    return;
  }

  // Set up Gmail transport with App Password :contentReference[oaicite:1]{index=1}
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_SENDER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Compose and send
  await transporter.sendMail({
    from:    process.env.GMAIL_SENDER,
    to:      process.env.GMAIL_SENDER,            // sending to self
    subject: '⏰ Reminder: KainatOS Release in 7 Days',
    text:    `Hi there!\n\nJust a heads-up that the next KainatOS release is scheduled for November 12, 2025 – exactly 7 days from now.\n\nCheers,\nYour GitHub Actions Bot`
  });

  console.log('7-day reminder email sent.');
})();
