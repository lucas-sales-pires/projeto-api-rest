import { conectarAoBanco } from '../models/banco';
import { MensagemInterface } from '../models/mensagem.interface';



export async function buscarMensagensAnteriores(req:any, res:any) {
  try {
    const { sala } = req.params;
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('mensagens');

    const mensagensAnteriores = await collection
      .find({ sala })
      .sort({ timestamp: 1 })
      .toArray();
    return res.status(200).json(mensagensAnteriores);
  } catch (err) {
    console.error('Erro ao buscar mensagens anteriores:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}


export async function enviarMensagemParaUsuario(req:any, res:any) {
  try {
    const { usuario, conteudo } = req.body;

    if (!usuario || !conteudo) {
      return res.status(400).json({ erro: 'Destinatário e conteúdo são obrigatórios' });
    }

    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('comunicacao');

    const novaMensagem:MensagemInterface = {
      remetente: 'Servidor',
      conteudo: conteudo,
      usuario: usuario, 
      timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
    };

    const resultado = await collection.insertOne(novaMensagem);
    novaMensagem._id = resultado.insertedId;


    res.status(200).json({ mensagem: 'Mensagem enviada com sucesso', id: novaMensagem._id });
  } catch (err:any) {
    console.error('Erro ao enviar mensagem:', err);
    
    if (err.name === 'ValidationError') { 
      return res.status(400).json({ erro: 'Dados da mensagem inválidos' });
    }

    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

export async function buscarMensagemParaVoce(req:any, res:any) {
  try {
    const {usuario} = req.body; 
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('comunicacao');
    const mensagens = await collection.find({ usuario }).toArray();

    res.status(200).json(mensagens);
  } catch (err) {
    console.error('Erro ao buscar mensagens:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

export async function buscarMensagemParaUsuario(req:any, res:any) {
  try {
    const {usuario} = req.body;
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('comunicacao');
    const mensagens = await collection.find({ usuario }).toArray();

    res.status(200).json(mensagens);
  } catch (err) {
    console.error('Erro ao buscar mensagens:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}
    

export async function usuarioEnviarMensagemParaAdm(req:any, res:any) {
  try {
    const {usuario, conteudo} = req.body;
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('adm');

    const novaMensagem : MensagemInterface = {
      remetente: usuario,
      conteudo: conteudo,
      usuario: 'Servidor',
      timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),

    };

    const resultado = await collection.insertOne(novaMensagem);
    novaMensagem._id = resultado.insertedId;

    res.status(200).json({ mensagem: 'Mensagem enviada com sucesso', id: novaMensagem._id });
  } catch (err:any) {
    console.error('Erro ao enviar mensagem:', err);
    
    if (err.name === 'ValidationError') { 
      return res.status(400).json({ erro: 'Dados da mensagem inválidos' });
    }

    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

export async function buscarMensagemParaAdm(req:any, res:any) {
  try {
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('adm');
    const mensagens = await collection.find().toArray();

    res.status(200).json(mensagens);
  } catch (err) {
    console.error('Erro ao buscar mensagens:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}
