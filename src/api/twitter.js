const Twit = require('twit');
const moment = require('moment');
const { twitter } = require('../settings');

const entityData = {
  hashtags(data) {
    return {
      text: `#${data.text}`,
      url: `https://twitter.com/hashtag/${data.text}`
    }
  },
  user_mentions(data) {
    return {
      text: `@${data.screen_name}`,
      url: `http://twitter.com/${data.screen_name}`
    };
  },
  urls(data) {
    return {
      text: data.display_url,
      url: data.expanded_url
    };
  },
  media(data) {
    return {
      text: data.display_url,
      url: data.expanded_url
    }
  }
};

const sort = (a, b) => {
  const aStart = a.start;
  const bStart = b.start;
  if (aStart === bStart) {
    return 0;
  }
  return aStart < bStart ? 1 : -1;
};

const getTweetText = tweet => {
  let { text, entities } = tweet;
  const list = [];
  Object.keys(entities).forEach(entity => {
    entities[entity].forEach(item => {
      list.push(Object.assign({
        start: item.indices[0],
        end: item.indices[1]
      }, entityData[entity](item)));
    });
  });
  return list.sort(sort).reduce((modifiedText, item) => {
    return modifiedText.substr(0, item.start) +
      `<a href="${item.url}">${item.text}</a>` +
      modifiedText.substr(item.end);
  }, text);
};

const T = new Twit({
  consumer_key:         twitter.CONSUMER_KEY,
  consumer_secret:      twitter.CONSUMER_SECRET,
  access_token:         twitter.ACCESS_TOKEN,
  access_token_secret:  twitter.ACCESS_TOKEN_SECRET,
  timeout_ms:           60 * 1000
});

exports.getTweets = function twitter(type, config) {

  return new Promise((resolve, reject) => {
    T.get(type, config, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data);
      }
    });
  });

};

exports.formatTweets = function(tweets, count) {
  return tweets
    .map(tweet => ({
      id: tweet.id,
      text: getTweetText(tweet),
      date: moment(tweet.created_at, 'ddd MMM DD HH:mm:ss ZZ YYYY').fromNow(),
      username: tweet.user.screen_name,
      name: tweet.user.name
    }))
    .slice(0, count)
};
