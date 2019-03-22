const mongoose = require('mongoose');

module.exports = mongoose.connect(
  `${process.env.DB_URL}${process.env.DB_NAME}`,
  {
    useNewUrlParser: true
  }
)
  .then(() => console.log('Successfully connected to db'))
  .catch(err => console.log(err))

  