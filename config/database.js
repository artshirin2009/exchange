const mongoose = require('mongoose');

module.exports = mongoose.connect(
  `${process.env.DB_URL}${process.env.DB_NAME}`,
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) throw err;
    console.log('Successfully connected');
  }
);
