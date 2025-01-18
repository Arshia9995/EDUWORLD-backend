import express, {Application, Request, Response} from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { userRoutes } from "./infrastructure/routes/user/userRoutes";
import { config } from "./config/envConfig";
import { dependencies } from "./config/dependencies";
import morgan from "morgan";
import dbConnection from "./infrastructure/database/mongoDB/dbConnection";
import dotenv from 'dotenv';
import { log } from "console";
dotenv.config(); 


// console.log(dbConnection);

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST","PUT","PATCH","DELETE"],
  credentials: true,
}));



app.use(morgan('tiny'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/users', userRoutes(dependencies));

app.all("*", (req: Request, res: Response) => {
  console.log('server end point is not found')
  res.status(404).json({
    status: false,
    message: 'The requested URL not found on this server'
  })
})

dbConnection()

app.get("/", (req,res)=>{
    res.send("backend is running...");
});


  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
  });

