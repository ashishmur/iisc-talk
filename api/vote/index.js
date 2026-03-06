const { votes, voters } = require('../store');

const VALID_OPTIONS = ['very_anxious', 'somewhat_anxious', 'not_anxious', 'excited'];

module.exports = async function (context, req) {
  const ip = (req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown').split(',')[0].trim();
  const body = req.body || {};
  const option = body.option;

  if (!option || !VALID_OPTIONS.includes(option)) {
    context.res = { status: 400, body: { error: 'Invalid option' } };
    return;
  }

  if (voters.has(ip)) {
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { status: 'already_voted', votes }
    };
    return;
  }

  voters.add(ip);
  votes[option]++;

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { status: 'ok', votes }
  };
};
