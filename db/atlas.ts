dotenv.config({path:"../"});
import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
export async function con() {
  try {
    
      const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PASSWORD}@cluster0.ap9ecpy.mongodb.net/${process.env.ATLAS_DB}`;
      const options = { useNewUrlParser: true, useUnifiedTopology: true };
      const client = await MongoClient.connect(uri);
      return client.db();
  } catch (error) {
      return { status: 500, message: error.message };
  }
}