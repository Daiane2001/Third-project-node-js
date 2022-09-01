## Back-end com NodeJS

Nesse projeto foi desenvolvido um back-end simples que recebe requisiçes HTTP através do http://localhost:3333/ e salva os dados em um array do próprio código.

*para rodar esse projeto, instale as libs com o comando **yarn**, cuja documentação oficial encontra-se no site **yarnpkg.com** e rode o projeto com o comando **yarn dev***

As requisições aceitas são:

+ **GET** (/users) para **listar** todos os usuários salvos.

  + A resposta é dada em uma lista de usuários. Como abaixo:
```JSON
[
  {
    "id": "13d4bdd2-5180-48e1-a0ae-f15642bafb20",
    "nome": "Daiane",
    "email": "daiane@gmail.com"
  },
  {
    "id": "9c0274b1-34c3-483d-aba0-4496b40429e9",
    "nome": "Julio",
    "email": "julio@gmail.com"
  },
  {
    "id": "1c91b467-4bb2-4709-84c1-0977d9d4ce8a",
    "nome": "Denis",
    "email": "denis@gmail.com"
  }
]
```



+ **POST** (/users) para **criar** um novo usuário.

  + Deve-se enviar os dados no corpo da requisição. Como abaixo:

```JSON
{
	"nome": "Talita",
	"email": "talita@gmail.com"
}
```

+ **PUT** (/users/valor_do_id) para **editar** um usuário existente.

  + Deve-se enviar os dados a serem editados no corpo da requisição. Como abaixo:

```JSON
{
	"nome": "Taiane",
	"email": "taiane@gmailcom"
}
```


+ **DELETE** (/users/valor_do_id) para **deletar** um usuário existente.

  + Nessa requisição não há nada no corpo, apenas o ID como parametro na URL.


* Nesse projeto também foi desenvolvido uma Middleware para validar o ID do projeto como UUID quando é feito alguma solicitação com parametro de ID.

