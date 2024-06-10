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
      _id: Math.random().toString(36).substring(7),  
      remetente: 'Servidor',
      conteudo: conteudo,
      usuario: usuario, 
      timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),
    };

    await collection.insertOne(novaMensagem);


    res.status(200).json({ mensagem: 'Mensagem enviada com sucesso', id: novaMensagem._id });
  } catch (err:any) {
    console.error('Erro ao enviar mensagem:', err);
    
    if (err.name === 'ValidationError') { 
      return res.status(400).json({ erro: 'Dados da mensagem inválidos' });
    }

    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}


export async function buscarMensagemParaUsuario(req:any, res:any) {
  try {
    const { nome } = req.params;
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('comunicacao');

    const mensagens = await collection.find({ 
      $or: [
        { usuario: nome }, 
        { remetente: 'Servidor' }   
      ]
    }).toArray();

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
      _id: Math.random().toString(36).substring(7),  
      remetente: usuario,
      conteudo: conteudo,
      usuario: 'Servidor',
      timestamp: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR'),

    };

    await collection.insertOne(novaMensagem);

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

export async function excluirMensagemAdm(req:any, res:any) {
  try {
    const { id } = req.body;
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('adm');

    const resultado = await collection.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ erro: 'Mensagem não encontrada' });
    }

    return res.status(200).json({ mensagem: 'Mensagem excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir mensagem:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

export async function excluirMensagemUsuario(req:any, res:any) {
  try {
    const { id } = req.body;
    const client = await conectarAoBanco();
    const db = client.db('chat');
    const collection = db.collection('comunicacao');

    const resultado = await collection.deleteOne({ _id: id });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ erro: 'Mensagem não encontrada' });
    }

    return res.status(200).json({ mensagem: 'Mensagem excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir mensagem:', err);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}
