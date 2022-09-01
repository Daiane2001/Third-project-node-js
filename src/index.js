/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * 
 * Query Params: Filtros e paginação
 * Route Params: Identificar recursos (Atualizar/Deletar)
 * Request Body: Conteúdo para criar ou editar  um recurso (JSON)
 */

/** Middleware: forma utilizada para interceptar uma rota
 * 
 * Interceptador de requisições que pode interromper uma requisição
 * ou alterar dados de uma requisição 
*/

const express = require('express'); /** servidor utilizado para rodar a aplicação */
const { uuid, isUuid } = require('uuidv4'); /**Aplicação responsável por gerar um id de forma automática */
const cors = require('cors');/* dando acesso para qualquer aplicação front-end acessar nossa aplicação*/

const app = express(); /** A variável app está sendo usada para rodar o servidor */

app.use(cors());
app.use(express.json());
/** 
  A linha abaixo aplica o midlleware para todas as rotas iniciadas
  por /users/:id (Alteração e deleção).
  Com ela poderia ser retirado o nome da função dos métodos put e delete
*/
app.use('/users/:id', validateUserId);

const users = []; //vetor de usuários

// Função que mostra logs para exemplificar midlleware
function logRequests(request, response, next) {
  const {method, url} =request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  next();

}

app.use(logRequests); // Chama a função (midlleware) logRequests

function validateUserId(request, response, next){
  const { id } = request.params;

  if (!isUuid(id)) 
     return (response.status(400).json({ error: 'Invalid users ID. (Middleware)' }));

  return next();

}

// Listagem de projetos
app.get('/users', (request, response) /** parâmetros da nossa rota /users */ => { 
  const { nome, email } = request.query;

  // Filtro (Query inserida no insomnia) por nome
  results = nome ? /** variável results que vai receber o retorno da nossa requisição */
    users.filter(user => user.nome.includes(nome)) :
    users;

  // Filtro (Query inserida no insomnia) por email
  results = email ?
    results.filter(user => user.email.includes(email)) :
    results;

  return response.json(results); //Aqui a variável está listando todos os usuários
});

// Inclusão de projetos, inclusão recebemos do corpo da requisição
app.post('/users', (request, response) => { //Aqui foram criadas funções externas
  const { nome, email } = request.body; /** o nome e email vão ser recebidos do corpo da requisição que está no insomnia */
  const id = uuid(); /** Aqui criamos um id automático atráves da função uuid atribuída a constante id, que retorna um nro aleatório*/

  const user = { id, nome, email }; //objeto user
  users.push(user); //users é um vetor de usuários. push é uma funcionalidade do js que pega o objeto user e inclui dentro do vetor users

  return response.json(user);
});

// Alteração de projetos, na alteração recebemos na rota, o id que queremos alterar
app.put('/users/:id', validateUserId, (request, response) => { //passando o id como par
  const { id } = request.params;
  const { nome, email } = request.body;

  userIndex = users.findIndex(user => user.id === id);/** Recebendo um id, o user(objeto) vai varrer o vetor(users) e vai verificar se o id informado é o mesmo que está no vetor, se encontrato vai retornar para a variável userIndex o indice encontrado    */

  if (userIndex < 0) { /** Validação para quando não existir o id digitado, receber uma mensagem de erro */
    return response.status(400).json({ error: 'User not Found'}); 
  }

  const user = { id, nome, email };

  users[userIndex] = user; //aqui o indice encontrado vai ser substituido pelo novo objeto dentro do vetor

  return response.json(user); //aqui vai ser retornado apenas o novo objeto
});

// Deleção de projetos
app.delete('/users/:id', validateUserId, (request, response) => {
  const { id } = request.params;

  userIndex = users.findIndex(user => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({ error: 'User not Found'});
  }

  users.splice(userIndex, 1);/** splice é uma função do js, que a partir  daquele elemento de vetor que ele encontrou, vai excluir o nro de linhas para baixo, nesse exemplo é 1 linha(só aquele elemento)*/

  return response.json({ 'delete': 'Successfully' });//mensagem de sucesso na deleção

});

app.listen(3333, () => {
  console.log('Servidor iniciado.')
});