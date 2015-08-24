
/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/async_chat',
  google: {
    clientID: '1098611283556-fs630gar75csdhvudased81lvb1pq9pp.apps.googleusercontent.com',
    clientSecret: 'vWPI_waMydKjak6muneWyOWQ',
    callbackURL: 'http://localhost:3000/auth/google/callback',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.google.com/m8/feeds',
    ]
  }
};
