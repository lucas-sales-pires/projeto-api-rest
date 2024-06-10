import express from 'express';
import { buscarMensagensAnteriores, enviarMensagemParaUsuario,buscarMensagemParaUsuario,buscarMensagemParaAdm,usuarioEnviarMensagemParaAdm, excluirMensagemAdm, excluirMensagemUsuario } from '../controller/mensagemController';

export const routerMensagem = express();

routerMensagem.get('/anteriores/:sala', buscarMensagensAnteriores);
routerMensagem.get('/administrativa', buscarMensagemParaUsuario);
routerMensagem.get('/buscar-adm', buscarMensagemParaAdm);

routerMensagem.delete('/deletar-adm/:id',excluirMensagemAdm);
routerMensagem.delete('/deletar-usuario/:id',excluirMensagemUsuario);

routerMensagem.post('/administrativa', enviarMensagemParaUsuario);
routerMensagem.post('/enviar-adm', usuarioEnviarMensagemParaAdm);
