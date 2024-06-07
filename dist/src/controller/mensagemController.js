"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarMensagemParaAdm = exports.usuarioEnviarMensagemParaAdm = exports.buscarMensagemParaUsuario = exports.buscarMensagemParaVoce = exports.enviarMensagemParaUsuario = exports.buscarMensagensAnteriores = void 0;
const banco_js_1 = require("../models/banco.js");
function buscarMensagensAnteriores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sala } = req.params;
            const client = yield (0, banco_js_1.conectarAoBanco)();
            const db = client.db('chat');
            const collection = db.collection('mensagens');
            const mensagensAnteriores = yield collection
                .find({ sala })
                .sort({ timestamp: 1 })
                .toArray();
            return res.status(200).json(mensagensAnteriores);
        }
        catch (err) {
            console.error('Erro ao buscar mensagens anteriores:', err);
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    });
}
exports.buscarMensagensAnteriores = buscarMensagensAnteriores;
function enviarMensagemParaUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { usuario, conteudo } = req.body;
            if (!usuario || !conteudo) {
                return res.status(400).json({ erro: 'Destinatário e conteúdo são obrigatórios' });
            }
            const client = yield (0, banco_js_1.conectarAoBanco)();
            const db = client.db('chat');
            const collection = db.collection('comunicacao');
            const novaMensagem = {
                remetente: 'Servidor',
                conteudo: conteudo,
                usuario: usuario,
                timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
            };
            const resultado = yield collection.insertOne(novaMensagem);
            novaMensagem._id = resultado.insertedId;
            res.status(200).json({ mensagem: 'Mensagem enviada com sucesso', id: novaMensagem._id });
        }
        catch (err) {
            console.error('Erro ao enviar mensagem:', err);
            if (err.name === 'ValidationError') {
                return res.status(400).json({ erro: 'Dados da mensagem inválidos' });
            }
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    });
}
exports.enviarMensagemParaUsuario = enviarMensagemParaUsuario;
function buscarMensagemParaVoce(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { usuario } = req.body;
            const client = yield (0, banco_js_1.conectarAoBanco)();
            const db = client.db('chat');
            const collection = db.collection('comunicacao');
            const mensagens = yield collection.find({ usuario }).toArray();
            res.status(200).json(mensagens);
        }
        catch (err) {
            console.error('Erro ao buscar mensagens:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    });
}
exports.buscarMensagemParaVoce = buscarMensagemParaVoce;
function buscarMensagemParaUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { usuario } = req.body;
            const client = yield (0, banco_js_1.conectarAoBanco)();
            const db = client.db('chat');
            const collection = db.collection('comunicacao');
            const mensagens = yield collection.find({ usuario }).toArray();
            res.status(200).json(mensagens);
        }
        catch (err) {
            console.error('Erro ao buscar mensagens:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    });
}
exports.buscarMensagemParaUsuario = buscarMensagemParaUsuario;
function usuarioEnviarMensagemParaAdm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { usuario, conteudo } = req.body;
            const client = yield (0, banco_js_1.conectarAoBanco)();
            const db = client.db('chat');
            const collection = db.collection('adm');
            const novaMensagem = {
                remetente: usuario,
                conteudo: conteudo,
                usuario: 'Servidor',
                timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
            };
            const resultado = yield collection.insertOne(novaMensagem);
            novaMensagem._id = resultado.insertedId;
            res.status(200).json({ mensagem: 'Mensagem enviada com sucesso', id: novaMensagem._id });
        }
        catch (err) {
            console.error('Erro ao enviar mensagem:', err);
            if (err.name === 'ValidationError') {
                return res.status(400).json({ erro: 'Dados da mensagem inválidos' });
            }
            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    });
}
exports.usuarioEnviarMensagemParaAdm = usuarioEnviarMensagemParaAdm;
function buscarMensagemParaAdm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield (0, banco_js_1.conectarAoBanco)();
            const db = client.db('chat');
            const collection = db.collection('adm');
            const mensagens = yield collection.find().toArray();
            res.status(200).json(mensagens);
        }
        catch (err) {
            console.error('Erro ao buscar mensagens:', err);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    });
}
exports.buscarMensagemParaAdm = buscarMensagemParaAdm;
