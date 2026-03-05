// ============================================================
//  POLL CONFIGURATION
//  Edit this file to set up your poll and Firebase project.
// ============================================================

var POLL_CONFIG = {

  // ── Poll identity ──
  pollId: 'iisc-doms-march2026',

  // ── Question ──
  question: 'How anxious do you feel about AI?',

  // ── Options ──
  // Each option has: key (database key), label (display text), emoji, color (for chart)
  options: [
    { key: 'very_anxious',     label: 'Very anxious',     emoji: '\uD83D\uDE30', color: '#ef4444' },
    { key: 'somewhat_anxious', label: 'Somewhat anxious', emoji: '\uD83D\uDE1F', color: '#f59e0b' },
    { key: 'not_anxious',      label: 'Not anxious',      emoji: '\uD83D\uDE10', color: '#3b82f6' },
    { key: 'excited',          label: 'Excited!',         emoji: '\uD83D\uDE80', color: '#4ade80' },
  ],

  // ── Firebase config ──
  // 1. Go to https://console.firebase.google.com
  // 2. Create a new project (disable Google Analytics if you want)
  // 3. Go to "Build" > "Realtime Database" > "Create Database"
  //    - Choose a region (us-central1 or asia-southeast1)
  //    - Start in TEST MODE (allows reads/writes for 30 days)
  // 4. Go to Project Settings > General > scroll to "Your apps"
  //    - Click "Add app" > Web (</>)
  //    - Copy the firebaseConfig object and paste below
  //
  // IMPORTANT: For the poll to work, your Realtime Database rules
  // should allow reads and writes. Test mode does this automatically.
  // For production, use these rules:
  //
  //   {
  //     "rules": {
  //       "polls": {
  //         "$pollId": {
  //           "votes": {
  //             "$option": {
  //               ".read": true,
  //               ".write": true,
  //               ".validate": "newData.isNumber()"
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  firebase: {
    // REPLACE THESE WITH YOUR FIREBASE PROJECT VALUES
    apiKey:            'YOUR_API_KEY',
    authDomain:        'YOUR_PROJECT.firebaseapp.com',
    databaseURL:       'https://YOUR_PROJECT-default-rtdb.firebaseio.com',
    projectId:         'YOUR_PROJECT',
    storageBucket:     'YOUR_PROJECT.appspot.com',
    messagingSenderId: '000000000000',
    appId:             '1:000000000000:web:xxxxxxxxxxxx'
  },

  // ── Vote page URL ──
  // This is the public URL where vote.html is hosted.
  // The QR code on the presenter slide will point here.
  // Options:
  //   - GitHub Pages:  https://yourusername.github.io/iisc-poll/vote.html
  //   - Netlify drop:  https://your-site.netlify.app/vote.html
  //   - Azure Static:  https://your-app.azurestaticapps.net/vote.html
  //   - Local server:  http://YOUR_IP:8080/vote.html
  voteUrl: 'https://YOUR_HOSTED_URL/vote.html'
};
