const { getTweets, formatTweets } = require('./api/twitter');

const TYPE = 'statuses/user_timeline';

const CONFIG = {
  screen_name: 'wrakky',
  count: 20,
  exclude_replies: true
};

const COUNT = 3;

module.exports = function() {

  getTweets(TYPE, CONFIG, COUNT)
    .then(tweets => {
      console.log(formatTweets(tweets, COUNT));
    })
    .catch(err => {
      console.error(err);
    })

};
