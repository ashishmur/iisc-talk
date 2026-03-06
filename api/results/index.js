const { votes, voters, concerns } = require('../store');

const STOP_WORDS = new Set([
  'the','be','to','of','and','a','in','that','have','i','it','for','not','on',
  'with','he','as','you','do','at','this','but','his','by','from','they','we',
  'her','she','or','an','will','my','one','all','would','there','their','what',
  'so','up','out','if','about','who','get','which','go','me','when','make',
  'can','like','no','just','him','know','take','how','come','could','than',
  'been','its','over','think','also','back','after','use','two','way','our',
  'work','well','because','any','these','give','most','into','are','is','was',
  'were','am','has','had','does','did','being','having','doing','will','shall',
  'should','may','might','must','need','very','really','much','many','some',
  'lot','more','most','other','able','don','won','isn','aren','doesn','didn',
  'wasn','weren','hasn','hadn','wouldn','couldn','shouldn','thing','things',
  'still','even','too','own','want','going','new','say','said'
]);

function computeWords() {
  const freq = {};
  for (const text of concerns) {
    const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
    for (const w of tokens) {
      if (w.length >= 3 && !STOP_WORDS.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    }
  }
  return freq;
}

module.exports = async function (context, req) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { votes, total, words: computeWords() }
  };
};
