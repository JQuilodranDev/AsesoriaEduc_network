const mongoose = require('mongoose');

let uri = process.env.MONGO_URI;


const mongoConnect = async () => {
    try {
       await mongoose.connect(uri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
       });
       console.log(`MongoDB Connected`); 
    } catch (error) {
        console.error('error connection to MongoDB: ', error.message);
        // eslint-disable-next-line no process-exit
        process.exit(1);
    }
};

module.exports = mongoConnect;