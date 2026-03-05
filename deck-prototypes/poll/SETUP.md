# Live Poll System - Setup Guide

## Architecture

```
[Audience Phone] --> vote.html --> Firebase Realtime DB <-- poll-widget.js --> [Presenter Slide]
```

- **vote.html**: Mobile-optimized voting page. Audience scans QR, taps an option, done.
- **poll-widget.js**: Embeds in your presentation slide. Shows QR code + live-updating bar chart.
- **poll-config.js**: Shared config (Firebase credentials, question, options, vote URL).
- **presenter-slide.html**: Standalone presenter page with fullscreen + reset controls.
- **test-local.html**: Test everything locally without Firebase.

## Quick Start (5 minutes)

### Step 1: Create a Firebase project

1. Go to https://console.firebase.google.com
2. Click "Add project", name it `iisc-poll` or similar
3. Disable Google Analytics (not needed), click Create
4. In the left sidebar: Build > Realtime Database > Create Database
5. Choose region: `asia-south1` (closest to Bangalore)
6. Choose **Start in test mode** (allows all reads/writes for 30 days)
7. Go to Project Settings (gear icon) > General > scroll to "Your apps"
8. Click the web icon (`</>`) to add a web app
9. Name it anything, click Register
10. Copy the `firebaseConfig` object

### Step 2: Update poll-config.js

Open `poll-config.js` and replace the firebase section with your values:

```js
firebase: {
  apiKey:            'AIzaSy...',
  authDomain:        'iisc-poll.firebaseapp.com',
  databaseURL:       'https://iisc-poll-default-rtdb.asia-south1.firebasedatabase.app',
  projectId:         'iisc-poll',
  storageBucket:     'iisc-poll.appspot.com',
  messagingSenderId: '123456789',
  appId:             '1:123456789:web:abc123'
}
```

### Step 3: Host the voting page

The vote.html page needs to be accessible from audience phones. Options:

**Option A: GitHub Pages (recommended, free, 2 minutes)**
1. Create a repo, push the `poll/` folder
2. Enable GitHub Pages in Settings > Pages > Deploy from branch
3. URL will be: `https://yourusername.github.io/repo-name/vote.html`

**Option B: Netlify Drop (fastest, free)**
1. Go to https://app.netlify.com/drop
2. Drag the entire `poll/` folder onto the page
3. Get your URL instantly

**Option C: Azure Static Web Apps (free tier)**
1. Use your existing Azure credits
2. Deploy via `az staticwebapp create`

**Option D: Local server (if everyone is on same WiFi)**
```bash
cd poll/
python3 -m http.server 8080
```
Your URL: `http://YOUR_LOCAL_IP:8080/vote.html`

### Step 4: Update the vote URL in config

Set `voteUrl` in `poll-config.js` to your hosted URL:
```js
voteUrl: 'https://yourusername.github.io/iisc-poll/vote.html'
```

### Step 5: Test it

1. Open `test-local.html` in your browser to test the UI
2. Open `presenter-slide.html` to verify the live view works
3. Scan the QR code with your phone to test the full flow

## Embedding in Your Presentation

To embed the poll widget into any HTML slide:

```html
<!-- Add these before </body> -->
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-database-compat.js"></script>
<script src="poll-config.js"></script>
<script src="poll-widget.js"></script>

<!-- Place this div where you want the poll -->
<div id="live-poll"></div>
```

Or mount it manually:
```html
<div id="my-poll-area"></div>
<script>
  PollWidget.mount(document.getElementById('my-poll-area'));
</script>
```

## Presenter Controls

- **Reset votes**: Click "Reset Votes" button in presenter-slide.html, or call `PollWidget.reset()` in console
- **Fullscreen**: Click "Fullscreen" button or press F11

## Customization

Edit `poll-config.js` to change:
- Question text
- Options (labels, emojis, chart colors)
- Poll ID (for running multiple polls)

## Limits

- Firebase free tier: 100 simultaneous connections, 1GB stored, 10GB/month transfer
- For 80 people voting once, this is well within limits
- Votes are deduplicated per browser via localStorage

## Troubleshooting

| Problem | Fix |
|---------|-----|
| QR code shows wrong URL | Update `voteUrl` in poll-config.js |
| "Could not connect" on phone | Check Firebase config, ensure test mode is on |
| Votes not appearing live | Check browser console for Firebase errors |
| Already voted (testing) | Clear localStorage in browser DevTools |
