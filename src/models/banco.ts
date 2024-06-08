import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
config();


const uri = process.env.MONGODB_URI|| 'mongodb://localhost:27017';
const usuario = process.env.MONGODB_USUARIO|| 'admin';
const senha = process.env.MONGODB_SENHA|| 'admin';

const client = new MongoClient(uri, { auth: { username: usuario, password: senha } });

export async function conectarAoBanco() {
  try {
    await client.connect();
    console.log('Conectado ao MongoDB');
    return client; 
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err; 
  }
}



