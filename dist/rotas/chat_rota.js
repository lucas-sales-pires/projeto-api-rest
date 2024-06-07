"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMensagem = void 0;
const express_1 = __importDefault(require("express"));
const mensagemController_js_1 = require("../controller/mensagemController.js");
exports.routerMensagem = express_1.default.Router();
exports.routerMensagem.get('/anteriores/:sala', mensagemController_js_1.buscarMensagensAnteriores);
exports.routerMensagem.get('/mensagens/:nome', mensagemController_js_1.buscarMensagemParaVoce);
exports.routerMensagem.get('/administrativa', mensagemController_js_1.buscarMensagemParaUsuario);
exports.routerMensagem.post('/administrativa', mensagemController_js_1.enviarMensagemParaUsuario);
exports.routerMensagem.get('/buscar-adm', mensagemController_js_1.buscarMensagemParaAdm);
exports.routerMensagem.post('/enviar-adm', mensagemController_js_1.usuarioEnviarMensagemParaAdm);
