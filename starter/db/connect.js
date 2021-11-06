const mongoose = require('mongoose');

// APIConnection =
//    'mongodb+srv://Jacob:Passwordwinter2021$@nodeexpressprojects.vzfhy.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority';

const connectDB = (url) => {
   return mongoose.connect(url, {
      useNewUrlParser: true,
      useCreatIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
   });
};

module.exports = connectDB;
