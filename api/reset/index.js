const { votes, voters, concerns } = require('../store');

module.exports = async function (context, req) {
  votes.very_anxious = 0;
  votes.somewhat_anxious = 0;
  votes.not_anxious = 0;
  votes.excited = 0;
  voters.clear();
  concerns.length = 0;

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { status: 'reset', votes }
  };
};
