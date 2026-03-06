// In-memory vote store (persists while function is warm, fine for a 90-min talk)
const votes = {
  very_anxious: 0,
  somewhat_anxious: 0,
  not_anxious: 0,
  excited: 0
};

const voters = new Set(); // track IPs to prevent server-side duplicates
const concerns = []; // free-text "biggest concern" submissions

module.exports = { votes, voters, concerns };
