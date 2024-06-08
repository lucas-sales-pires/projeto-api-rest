"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarMensagemParaAdm = exports.usuarioEnviarMensagemParaAdm = exports.buscarMensagemParaUsuario = exports.buscarMensagemParaVoce = exports.enviarMensagemParaUsuario = exports.buscarMensagensAnteriores = void 0;
const banco_1 = require("../models/banco");
async function buscarMensagensAnteriores(req, res) {
    try {
        const { sala } = req.params;
        const client = await (0, banco_1.conectarAoBanco)();
        const db = client.db('chat');
        const collection = db.collection('mensagens');
        const mensagensAnteriores = await collection
            .find({ sala })
            .sort({ timestamp: 1 })
            .toArray();
        return res.status(200).json(mensagensAnteriores);
    }
    catch (err) {
        console.error('Erro ao buscar mensagens anteriores:', err);
        return res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}
exports.buscarMensagensAnteriores = buscarMensagensAnteriores;
async function enviarMensagemParaUsuario(req, res) {
    try {
        const { usuario, conteudo } = req.body;
        if (!usuario || !conteudo) {
            return res.status(400).json({ erro: 'Destinatário e conteúdo são obrigatórios' });
        }
        const client = await (0, banco_1.conectarAoBanco)();
        const db = client.db('chat');
        const collection = db.collection('comunicacao');
        const novaMensagem = {
            remetente: 'Servidor',
            conteudo: conteudo,
            usuario: usuario,
            timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
        };
        const resultado = await collection.insertOne(novaMensagem);
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
}
exports.enviarMensagemParaUsuario = enviarMensagemParaUsuario;
async function buscarMensagemParaVoce(req, res) {
    try {
        const { usuario } = req.body;
        const client = await (0, banco_1.conectarAoBanco)();
        const db = client.db('chat');
        const collection = db.collection('comunicacao');
        const mensagens = await collection.find({ usuario }).toArray();
        res.status(200).json(mensagens);
    }
    catch (err) {
        console.error('Erro ao buscar mensagens:', err);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}
exports.buscarMensagemParaVoce = buscarMensagemParaVoce;
async function buscarMensagemParaUsuario(req, res) {
    try {
        const { usuario } = req.body;
        const client = await (0, banco_1.conectarAoBanco)();
        const db = client.db('chat');
        const collection = db.collection('comunicacao');
        const mensagens = await collection.find({ usuario }).toArray();
        res.status(200).json(mensagens);
    }
    catch (err) {
        console.error('Erro ao buscar mensagens:', err);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}
exports.buscarMensagemParaUsuario = buscarMensagemParaUsuario;
async function usuarioEnviarMensagemParaAdm(req, res) {
    try {
        const { usuario, conteudo } = req.body;
        const client = await (0, banco_1.conectarAoBanco)();
        const db = client.db('chat');
        const collection = db.collection('adm');
        const novaMensagem = {
            remetente: usuario,
            conteudo: conteudo,
            usuario: 'Servidor',
            timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
        };
        const resultado = await collection.insertOne(novaMensagem);
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
}
exports.usuarioEnviarMensagemParaAdm = usuarioEnviarMensagemParaAdm;
async function buscarMensagemParaAdm(req, res) {
    try {
        const client = await (0, banco_1.conectarAoBanco)();
        const db = client.db('chat');
        const collection = db.collection('adm');
        const mensagens = await collection.find().toArray();
        res.status(200).json(mensagens);
    }
    catch (err) {
        console.error('Erro ao buscar mensagens:', err);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
}
exports.buscarMensagemParaAdm = buscarMensagemParaAdm;
//# sourceMappingURL=mensagemController.js.map