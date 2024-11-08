import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoute from "./Route/Book.Route.js"
import userRoute from "./Route/User.Route.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000 
const URI = process.env.MongoDBURI

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    
} catch (error) {
    console.log("Error: ",error);
    
}

// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
app.use("/book", bookRoute);
app.use("/users",userRoute);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})