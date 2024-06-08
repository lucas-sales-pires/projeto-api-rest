import cors from 'cors';
import { config } from 'dotenv';
import { conectarAoBanco } from './models/banco';
import { routerMensagem } from './rotas/chat_rota';
import express from 'express';
config();
const porta = process.env.PORTA;

conectarAoBanco()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerMensagem);





app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
