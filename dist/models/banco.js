"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectarAoBanco = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const usuario = process.env.MONGODB_USUARIO || 'admin';
const senha = process.env.MONGODB_SENHA || 'admin';
const client = new mongodb_1.MongoClient(uri, { auth: { username: usuario, password: senha } });
async function conectarAoBanco() {
    try {
        await client.connect();
        console.log('Conectado ao MongoDB');
        return client;
    }
    catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        throw err;
    }
}
exports.conectarAoBanco = conectarAoBanco;
//# sourceMappingURL=banco.js.map