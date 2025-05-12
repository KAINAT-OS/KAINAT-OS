// scripts/updateCountdown.js
const fs   = require('fs');
const path = require('path');

// === CONFIGURE TARGET ===
// Next 6-month release: November 12, 2025 UTC
const TARGET = new Date('2025-11-12T00:00:00Z');

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${days} days, ${hours} hours, ${minutes} minutes`;
}

function updateReadme() {
  const readmePath = path.join(__dirname, '..', 'readme.md');
  let content = fs.readFileSync(readmePath, 'utf-8');
  const now  = new Date();
  const diff = TARGET - now;

  const countdown = diff > 0
    ? `**⏳ Time until next release:** ${formatDuration(diff)}`
    : '**🚀 Release is live!**';

  content = content.replace(
    /<!-- COUNTDOWN:START -->[\s\S]*?<!-- COUNTDOWN:END -->/,
    `<!-- COUNTDOWN:START -->\n${countdown}\n<!-- COUNTDOWN:END -->`
  );

  fs.writeFileSync(readmePath, content, 'utf-8');
}

updateReadme();
