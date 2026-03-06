const { concerns } = require('../store');

module.exports = async function (context, req) {
  const body = req.body || {};
  let text = (body.text || '').toString();

  // Sanitize: trim, strip HTML tags, cap at 200 chars
  text = text.trim().replace(/<[^>]*>/g, '').substring(0, 200);

  if (!text) {
    context.res = {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Text is required' }
    };
    return;
  }

  concerns.push(text);

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { status: 'ok', count: concerns.length }
  };
};
