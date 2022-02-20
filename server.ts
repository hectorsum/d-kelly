import { ConfigServer } from './server/config.server';
import {connection} from './config/database.config'
const server = new ConfigServer(); 
require("dotenv").config();

function main(){
  try { 
    server.start(() => {
      console.log(`server on port http://localhost:${server.app.get('port')}`)
      connection()
    }) 
  } catch (error) {
    console.log(error) 
  }
} 
main();