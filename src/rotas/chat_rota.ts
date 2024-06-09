import express from 'express';
import { buscarMensagensAnteriores, enviarMensagemParaUsuario,buscarMensagemParaUsuario,buscarMensagemParaAdm,usuarioEnviarMensagemParaAdm } from '../controller/mensagemController';

export const routerMensagem = express();

routerMensagem.get('/anteriores/:sala', buscarMensagensAnteriores);

routerMensagem.get('/administrativa', buscarMensagemParaUsuario);
routerMensagem.post('/administrativa', enviarMensagemParaUsuario);

routerMensagem.get('/buscar-adm', buscarMensagemParaAdm);
routerMensagem.post('/enviar-adm', usuarioEnviarMensagemParaAdm);
