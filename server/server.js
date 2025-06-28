import { app } from './app.js';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config()
const PORT = process.env.PORT
const sql = neon(process.env.POSTGRE_SQL)

if(sql){
  console.log("Your Application has successfully been Connected to the POSTGRESQL databases hosted using Neon")
}



const server = app.listen(PORT, () => {
  console.log(`Your App is running on port ${PORT}`);
});
