import express from 'express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';




const app = express();

//middleware
app.use(express.json());
app.use(cors());



app.get("/", (req,res)=>{
    res.status(200).json({msg:"success from api"})
})

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();


