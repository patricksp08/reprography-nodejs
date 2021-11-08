# Sistema Reprográfico - Back-end

[English Version](https://github.com/Luccazx12/reprography-nodejs/blob/master/README-en.md)


## Apresentação
Bem-vindo, este projeto é o nosso Trabalho de Conclusão de Curso <a href="https://pt.wikipedia.org/wiki/Trabalho_de_conclus%C3%A3o_de_curso"> (TCC) </a> do curso técnico de Desenvolvimento de sistemas da a Escola SENAI Suíço-Brasileira Paulo Ernesto Tolle.

#### [Github do Front-end do projeto](https://github.com/ViictorSR388/reprografia_front-end)

#### Status do Projeto: ⚠️ Em Desenvolvimento ⚠️

## Sobre o Projeto
Esta aplicação foi requerida pela coordenadora da escola Senai Suiço-Brasileira, com o intuito de fazer o controle das impressões realizadas pelos diversos setores da escola (professores, funcionários, etc), podendo assim, administrar melhor gastos e desperdícios.

## 📌 Recursos utilizados neste projeto:


 **<a href="https://code.visualstudio.com/Download">:small_blue_diamond: Visual Studio Code </a>**<img align="center"  height="30" width="30" src="https://cdn.freebiesupply.com/logos/large/2x/visual-studio-code-logo-png-transparent.png" style="max-width:100%;"></img> 

**<a href="https://swagger.io">:small_blue_diamond: Swagger </a>**<img align="center" height="30" width="30" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" style="max-width:100%;"></img>


### Dependências do projeto

- Nodejs
  * Express 4.17.1 - É um framework para Node.js que fornece recursos mínimos para construção de servidores web.
  * Swagger-autogen 2.11.2
  * Nodemon 2.0.13 - Para restartar o server sempre que houver uma alteração. 
  * Jwt - Para proteger rotas privadas.
  * Bcrypt 5.0.1 - Para Cryptografar as senhas de usuários antes de salvar no banco.
  * Cors 2.8.5 - É um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens
  * Multer 1.4.2 - É um middleware node.js para lidar com multipart, que é usado principalmente para fazer upload de arquivos.
  * Body-Parser 1.19.0 - Analisa os dados codificados JSON, buffer, string e URL enviados usando a solicitação HTTP POST.
  * MariaDB 2.5.4 - É o banco de dados que nos usamos. 

#### Banco de dados

**<a href="https://mariadb.org">:small_blue_diamond: MariaDB</a>**<img align="center"  height="60" width="70" src="https://www.softizy.com/blog/wp-content/uploads/2014/05/mariadb.png" style="max-width:100%;"></img> 



## :arrow_forward: Como iniciar a aplicação:

#### Requisitos

- Node.js (v14.18.1)
- NPM (6.14.15)

 * Clone ou baixe o repositório<br>
 * Depois, extraia a pasta .config localizada em info_api/docs para /src <br>
 * Altere as informações referente a conexão do banco de dados (.config/db.config.json)<br>
 * Crie o database que inseriu nesse arquivo em seu banco de dados (mysql/mariadb) - exemplo: bdrepro <br>
 * Altere as informações referentes ao envio de e-mail (.config/mailer.config.json)


### Instalando os pacotes

Execute o comando abaixo para instalar as dependências:
``` bash
npm install
```

### Iniciando o servidor

Execute o comando abaixo para iniciar o Nodejs e conectar ao banco de dados:
``` bash
npm run
```

Aguarde a execução e estará rodando na URL  `http://localhost:3002`

<br>

E assim você terá sua aplicação rodando localmente.
<br>



## :triangular_flag_on_post: Endpoints


Criando a documentação com o Swagger, conseguimos simplificar não só o desenvolvimento da nossa API e da squad como um todo, mas também o relacionamento com as outras partes do projeto (squad front-end, infra...). Por isso tentamos ao máximo deixa-lá autoexplicativa e completa. 

Documentação da API (Swagger) rodando em: `http://localhost:3002/docs/`

![image](https://raw.githubusercontent.com/Squad-Back-End/reprography-nodejs/master/info_api/screenshots/swagger/swagger.png)


## 😯 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://github.com/firstcontributions/first-contributions)


## 📝 Licença

Este projeto esta sobe a licença MIT.
