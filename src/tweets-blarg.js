const { getTweets, formatTweets } = require('./api/twitter');
const write = require('./write');

const TYPE = 'search/tweets';

const CONFIG = {
  q: 'blarg',
  count: 30,
  result_type: 'recent'
};

const COUNT = 10;

module.exports = function() {

  return getTweets(TYPE, CONFIG, COUNT)
    .then(tweets => formatTweets(tweets.statuses, COUNT))
    .then(data => write('tweets-blarg', data))
    .catch(err => {
      console.error(err);
    });

};
