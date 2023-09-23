const App = require('./app');
const dbConfig = require('./config/database-config');

dbConfig()
  .then(() => console.log('Database connection is successful'))
  .catch((err) => console.log('Database Error: ', err));

App.listen(App.get('PORT'), () => {
  console.log('app is running');
});
