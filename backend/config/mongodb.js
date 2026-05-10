const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(String(process.env.MONGO_URI));
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.error(`MongoDB connection failed: ${err.message}`);
        console.log("! Could not connect to DB. No database persistence !");
    }
};

module.exports = connectToMongoDB;