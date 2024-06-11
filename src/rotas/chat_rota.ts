import express from 'express';
import { buscarMensagensAnteriores, enviarMensagemParaUsuario,buscarMensagemParaUsuario,buscarMensagemParaAdm,usuarioEnviarMensagemParaAdm, excluirMensagemAdm, excluirMensagemUsuario } from '../controller/mensagemController';

export const routerMensagem = express();

routerMensagem.get('/anteriores/:sala', buscarMensagensAnteriores);
routerMensagem.get('/administrativa/:nome', buscarMensagemParaUsuario);
routerMensagem.get('/buscar-adm', buscarMensagemParaAdm);

routerMensagem.delete('/deletar-adm',excluirMensagemAdm); 
routerMensagem.delete('/deletar-usuario',excluirMensagemUsuario);

routerMensagem.post('/adm-enviar-msg', enviarMensagemParaUsuario);
routerMensagem.post('/enviar-adm', usuarioEnviarMensagemParaAdm);
