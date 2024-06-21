# Documentação da API para Sistema de Chat

  - [Documentação da API de Chat](#documentação-da-api-de-chat)
    - [Endpoints:](#endpoints)
    - [Observações:](#observações)

# Link para utilizar a API:

https://projeto-api-rest.onrender.com

##


Documentação da API de Chat
Esta API fornece funcionalidades para gerenciar mensagens em um sistema de chat, incluindo comunicação entre usuários e administradores.

# Endpoints:

```http
  GET /anteriores/:sala:
```

Descrição: Busca mensagens anteriores de uma sala específica, No corpo da Requisição.



| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `sala` | `string` | Nome da sala|

#### Retorno:

200 (OK): Array de mensagens anteriores (ordenado por timestamp).
500 (Erro Interno do Servidor): Em caso de erro.

```http
  GET /mensagens/:nome:
```

Descrição: Busca mensagens para um usuário específico.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | Nome do usuário|

#### Retorno:

200 (OK): Array de mensagens para o usuário.
500 (Erro Interno do Servidor): Em caso de erro.

```http
  GET /administrativa:nome
```

Descrição: Busca mensagens administrativas para um usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `usuario` | `string` | Nome do usuário|

#### Retorno:

200 (OK): Array de mensagens administrativas para o usuário.
500 (Erro Interno do Servidor): Em caso de erro.

```http
  POST /adm-enviar-msg:
```

Descrição: Envia uma mensagem administrativa para um usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `usuario` | `string` | Nome do usuário|
| `conteudo` | `string` | Conteúdo da mensagem|

#### Retorno:

200 (OK): Mensagem enviada com sucesso.
500 (Erro Interno do Servidor): Em caso de erro.

```http
  GET /buscar-adm:
```

Descrição: Busca mensagens enviadas para o administrador.

#### Retorno:

200 (OK): Array de mensagens enviadas para o administrador.
500 (Erro Interno do Servidor): Em caso de erro.

```http
  POST /enviar-adm:
```

Descrição: Permite que um usuário envie uma mensagem para o administrador.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `usuario` | `string` | Nome do usuário|
| `conteudo` | `string` | Conteúdo da mensagem|

#### Retorno:

200 (OK): Mensagem enviada com sucesso.
400 (Requisição Inválida): Dados da mensagem inválidos.
500 (Erro Interno do Servidor): Em caso de erro.

```http
  DELETE /deletar-adm:
```

Descrição: Permite que o administrador delete uma mensagem.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | ID da mensagem|

#### Retorno:

200 (OK): Mensagem deletada com sucesso.
500 (Erro Interno do Servidor): Em caso de erro.


```http
  DELETE /deletar-usuario:
```	

Descrição: Permite que o usuário delete uma mensagem.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | ID da mensagem|

#### Retorno:

200 (OK): Mensagem deletada com sucesso.
500 (Erro Interno do Servidor): Em caso de erro.




# Observações:

- A API utiliza um banco de dados MongoDB para armazenar as mensagens (banco de dados "chat", collections "mensagens", "comunicacao" e "adm").

- As mensagens possuem os campos: remetente, conteudo, usuario (destinatário) e timestamp.

- A função conectarAoBanco é responsável por estabelecer a conexão com o banco de dados.

- A interface MensagemInterface define a estrutura das mensagens.

