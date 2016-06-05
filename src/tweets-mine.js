const { getTweets, formatTweets } = require('./api/twitter');
const write = require('./write');

const TYPE = 'statuses/user_timeline';

const CONFIG = {
  screen_name: 'wrakky',
  count: 20,
  exclude_replies: true
};

const COUNT = 3;

module.exports = function() {

  return getTweets(TYPE, CONFIG, COUNT)
    .then(tweets => formatTweets(tweets, COUNT))
    .then(data => write('tweets-mine', data))
    .catch(err => {
      console.error(err);
    });

};
