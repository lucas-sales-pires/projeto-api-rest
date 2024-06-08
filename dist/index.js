"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const banco_1 = require("./models/banco");
const chat_rota_1 = require("./rotas/chat_rota");
const express_1 = __importDefault(require("express"));
(0, dotenv_1.config)();
const porta = process.env.PORTA;
(0, banco_1.conectarAoBanco)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(chat_rota_1.routerMensagem);
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
//# sourceMappingURL=index.js.map