import express from 'express';
import cors from 'cors';
import http from 'http';
// import {connectToDB} from './config/db'
require("dotenv").config();
const app = express();

const server: http.Server = http.createServer(app);
const PORT = process.env.PORT || 8000; 

server.listen(PORT, () => {
  console.log(`Server starting on port:  ${PORT}`);
})
app.use(cors());

app.use(express.json());
