// const mongoose = require('mongoose');

// const connectDb = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/react-login-tut');
       
       
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error("Not Connected", error);
//     }
// }

// module.exports = connectDb;

// const mongoose = require('mongoose');

// const connectDb = async () => {
//     try {
//         // await mongoose.connect('mongodb://127.0.0.1:27017/react-login-tut', {
            
//         // });
//     await mongoose.connect(process.env.DB, {
            
//         });
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// module.exports = connectDb;


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    let dbUrl;
    if (process.env.NODE_ENV === "production") {
      dbUrl = process.env.PROD_DATABASE;
    } else if (process.env.NODE_ENV === "development") {
      dbUrl = process.env.LOCAL_DATABASE;
    } else {
      throw new Error("Environment not set properly");
    }
    const connection = await mongoose.connect(dbUrl);
    console.log(`connected to mongoDb ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error while connecting to DB", error);
  }
};

module.exports = connectDB;