import cors from 'cors';
import { config } from 'dotenv';
import { conectarAoBanco } from './src/models/banco.js';
import { routerMensagem } from './src/rotas/chat_rota.js';
import express from 'express';
config();
const porta = process.env.PORTA;

conectarAoBanco()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/mensagens', routerMensagem);





app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
