const dotenv=require("dotenv/config");
const express = require('express');

const app = express();
const port = 8000;

const connectDb = require('./db/dbCollection.js');
const User=require('./db/user.js');
const cors=require('cors');

// middleware for passing jason

app.use(express.json());
// Cors enable

app.use(cors({
  origin: ['https://frontend-msmaid.onrender.com' , `http://localhost:3000`, 'https://backend-msmaid.onrender.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Resgistration part
app.post('/register',async(req,res)=>{
  try {
    const { username, password } = req.body;
    console.log(req.body);
   const user= new User({username,password});
   await user.save();
   
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    // Handling errors
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
})
// Login Part is here
 app.post('/login',async(req,res)=>{
  try {
    const { username, password } = req.body;
    const user= await User.findOne({username});
    if(!user){
      return res.status(401).json({error:'Invalid UserName Or Password'});
    }
    if(user.password !== password){
      return res.status(401).json({error:'Invalid UserName Or Password'});
    }
    res.status(200).json({message:'Login Succesful',user});
  }
  catch(error){
    res.status(500).json({error:'Login Failed'});
  }
  
 });
 
// Connect to MongoDB
connectDb()
  .then(() => {
    // MongoDB connected successfully
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    // Unable to connect to MongoDB
    console.error('Failed to connect to MongoDB:', error);
  });