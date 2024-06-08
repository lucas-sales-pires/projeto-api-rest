import express from 'express';
import { buscarMensagemParaVoce, buscarMensagensAnteriores, enviarMensagemParaUsuario,buscarMensagemParaUsuario,buscarMensagemParaAdm,usuarioEnviarMensagemParaAdm } from '../controller/mensagemController';

export const routerMensagem = express.Router();

routerMensagem.get('/anteriores/:sala', buscarMensagensAnteriores);
routerMensagem.get('/mensagens/:nome', buscarMensagemParaVoce);

routerMensagem.get('/administrativa', buscarMensagemParaUsuario);
routerMensagem.post('/administrativa', enviarMensagemParaUsuario);

routerMensagem.get('/buscar-adm', buscarMensagemParaAdm);
routerMensagem.post('/enviar-adm', usuarioEnviarMensagemParaAdm);
