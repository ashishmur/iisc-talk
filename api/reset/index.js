const { votes, voters } = require('../store');

module.exports = async function (context, req) {
  votes.very_anxious = 0;
  votes.somewhat_anxious = 0;
  votes.not_anxious = 0;
  votes.excited = 0;
  voters.clear();

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { status: 'reset', votes }
  };
};
