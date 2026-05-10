const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.error(`MongoDB connection failed: ${err.message}`);
        console.log("! No database persistence !");
    }
};

module.exports = connectToMongoDB;