import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.MONGODB_URI || `mongodb://${process.env.MONGODB_USUARIO || 'admin'}:${process.env.MONGODB_SENHA || 'admin'}@localhost:27017`;

const client = new MongoClient(uri); 

export async function conectarAoBanco() {
  try {
    await client.connect(); 
    console.log('Conectado ao MongoDB');
    return client.db();
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err); 
    throw err; 
  }
}
