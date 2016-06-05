const { getTweets, formatTweets } = require('./api/twitter');

const TYPE = 'search/tweets';

const CONFIG = {
  q: 'blarg',
  count: 30,
  result_type: 'recent'
};

const COUNT = 10;

module.exports = function() {

  getTweets(TYPE, CONFIG, COUNT)
    .then(tweets => {
      console.log(formatTweets(tweets.statuses))
    })
    .catch(err => {
      console.error(err);
    })

};
