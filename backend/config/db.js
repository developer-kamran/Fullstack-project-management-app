const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb://Localhost/Project-management-app'
  );

  console.log(
    `MongoDB Connected:  ${conn.connection.host}:${conn.connection.port}`.cyan
      .underline.bold
  );
};

module.exports = connectDB;
