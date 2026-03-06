const { votes, voters } = require('../store');

module.exports = async function (context, req) {
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { votes, total }
  };
};
