import express, {Application} from "express";
import cors from 'cors';
import dbConnection from "./infrastructure/database/mongoDB/dbConnection";
import dotenv from 'dotenv';
import { log } from "console";
dotenv.config(); 


// console.log(dbConnection);

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST"],
  credentials: true,
}));




app.use(express.json());

dbConnection()

app.get("/", (req,res)=>{
    res.send("backend is running...");
});

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
  });

