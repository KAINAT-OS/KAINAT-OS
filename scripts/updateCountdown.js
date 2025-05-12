// scripts/updateCountdown.js
const fs = require('fs');
const path = require('path');

// === CONFIGURE YOUR TARGET DATE HERE ===
// First release: May 12, 2025 (today)
// Next 6-month target: November 12, 2025 00:00:00 UTC
const target = new Date('2025-11-12T00:00:00Z');

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days} days, ${hours} hours, ${minutes} minutes`;
}

function updateReadme() {
  const readmePath = path.join(__dirname, '..', 'README.md');
  const readme = fs.readFileSync(readmePath, 'utf-8');

  const now = new Date();
  const diff = target - now;
  const countdownText = diff > 0
    ? `**⏳ Time until next release:** ${formatDuration(diff)}`
    : '**🚀 Release is live!**';

  const updated = readme.replace(
    /<!-- COUNTDOWN:START -->[\s\S]*?<!-- COUNTDOWN:END -->/,
    `<!-- COUNTDOWN:START -->\n${countdownText}\n<!-- COUNTDOWN:END -->`
  );

  fs.writeFileSync(readmePath, updated);
}

updateReadme();
