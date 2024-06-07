"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const banco_js_1 = require("./banco.js");
const chat_rota_js_1 = require("./rotas/chat_rota.js");
const express_1 = __importDefault(require("express"));
(0, dotenv_1.config)();
const porta = process.env.PORTA;
(0, banco_js_1.conectarAoBanco)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/mensagens', chat_rota_js_1.routerMensagem);
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
