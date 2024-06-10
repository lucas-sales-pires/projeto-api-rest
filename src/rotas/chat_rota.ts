import express from 'express';
import { buscarMensagensAnteriores, enviarMensagemParaUsuario,buscarMensagemParaUsuario,buscarMensagemParaAdm,usuarioEnviarMensagemParaAdm, excluirMensagemAdm, excluirMensagemUsuario } from '../controller/mensagemController';

export const routerMensagem = express();

routerMensagem.get('/anteriores/:sala', buscarMensagensAnteriores);
routerMensagem.get('/administrativa/:id', buscarMensagemParaUsuario);
routerMensagem.get('/buscar-adm', buscarMensagemParaAdm);

routerMensagem.delete('/deletar-adm',excluirMensagemAdm); // -> deletar mensagens enviadas para adm
routerMensagem.delete('/deletar-usuario',excluirMensagemUsuario);

routerMensagem.post('/administrativa', enviarMensagemParaUsuario);
routerMensagem.post('/enviar-adm', usuarioEnviarMensagemParaAdm);
