import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || `mongodb+srv://Andrewel:avpursuegoal@cluster0-rpgcx.mongodb.net/test?retryWrites=true&w=majority`;
let db = null;

export async function connectDB(){
    if (db) return db;
    let client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db();
    return db;
}