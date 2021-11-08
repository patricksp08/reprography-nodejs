<h3 align="center">🚧 ⚠️ Em Desenvolvimento... ⚠️ 🚧</h3>


 
 
<h2 align="center">Sistema Reprográfico - Back-end</h2>

<div align="center">
 <img src="https://img.shields.io/badge/Node.js-43853D?style=&logo=node-dot-js&logoColor=white" />
 <img src="https://img.shields.io/badge/Express.js-000000?style=&logo=express&logoColor=white" />
<img src="https://img.shields.io/github/license/luccazx12/reprography-nodejs">
 <img src="https://img.shields.io/github/repo-size/luccazx12/reprography-nodejs">
 <img src="https://img.shields.io/github/last-commit/luccazx12/reprography-nodejs">
 </div>

[English Version](https://github.com/Luccazx12/reprography-nodejs/blob/master/README-en.md)


## Apresentação
Bem-vindo, este projeto é o nosso Trabalho de Conclusão de Curso <a href="https://pt.wikipedia.org/wiki/Trabalho_de_conclus%C3%A3o_de_curso"> (TCC) </a> do curso técnico de Desenvolvimento de sistemas da a Escola SENAI Suíço-Brasileira Paulo Ernesto Tolle.

#### [Github do Front-end do projeto](https://github.com/ViictorSR388/reprografia_front-end)
 

## Sobre o Projeto
Esta aplicação foi requerida pela coordenadora da escola Senai Suiço-Brasileira, com o intuito de fazer o controle das impressões realizadas pelos diversos setores da escola (professores, funcionários, etc), podendo assim, administrar melhor gastos e desperdícios.

## 📌 Recursos utilizados neste projeto:

#### Runtime environment
**<a href="https://nodejs.org/en/">:small_blue_diamond: NodeJS</a>**

#### Linguagem
 **<a href="https://www.javascript.com">:small_blue_diamond: Javascript </a>**

#### Banco de dados
**<a href="https://mariadb.org">:small_blue_diamond: MariaDB</a>**<img align="center" height="50" width="60" src="https://www.softizy.com/blog/wp-content/uploads/2014/05/mariadb.png" style="max-width:100%;"></img> 

#### Framework
 **<a href="https://expressjs.com">:small_blue_diamond: Express </a>**
 
 <div style="display: flex">
<h3>Editor de texto:</h3>
 [b]<a href="https://code.visualstudio.com/Download">:small_blue_diamond: Visual Studio Code </a>**<img align="center"  height="30" width="30" src="https://cdn.freebiesupply.com/logos/large/2x/visual-studio-code-logo-png-transparent.png" style="max-width:100%;"></img>[/b]
 
<h3>Documentação:</h3>
[b]<a href="https://swagger.io">:small_blue_diamond: Swagger </a>**<img align="center" height="30" width="30" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Swagger-logo.png" style="max-width:100%;"></img>[/b]
</div>

## Dependências do projeto

- Nodejs
  * Express 4.17.1 - É um framework para Node.js que fornece recursos mínimos para construção de servidores web.
  * Swagger-autogen 2.11.2
  * Nodemon 2.0.13 - Para restartar o server sempre que houver uma alteração. 
  * Jwt - Para verificação de token.
  * Bcrypt 5.0.1 - Para Cryptografar as senhas de usuários antes de salvar no banco.
  * Cors 2.8.5 - É um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens
  * Multer 1.4.2 - É um middleware node.js para lidar com multipart, que é usado principalmente para fazer upload de arquivos.
  * Body-Parser 1.19.0 - Analisa os dados codificados JSON, buffer, string e URL enviados usando a solicitação HTTP POST.
  * MariaDB 2.5.4 - É o banco de dados que nos usamos. 


## :arrow_forward: Como iniciar a aplicação:

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

Além disto é bom ter um editor para trabalhar com o código como: [VSCode](https://code.visualstudio.com).


### Configurando

```bash
 * Clone ou baixe o repositório
 * Depois, extraia a pasta .config localizada em info_api/docs para /src
 * Altere as informações referente a conexão do banco de dados (.config/db.config.json)
 * Crie o database que inseriu nesse arquivo em seu banco de dados (mysql/mariadb) - exemplo: bdrepro
 * Altere as informações referentes ao envio de e-mail (.config/mailer.config.json)
```

### Instalando os pacotes

Execute o comando abaixo para instalar as dependências:
``` bash
$ npm install
```

### Iniciando o servidor

Execute o comando abaixo para iniciar o Nodejs e conectar ao banco de dados:
``` bash
# Para iniciar em modo de desenvolvimento (requer nodemon)
$ npm run dev

# Para iniciar normalmente
$ npm run
```

Aguarde a execução e estará rodando na URL  `http://localhost:3002`

<br>
E assim você terá sua aplicação rodando localmente.
<br>


### Documentações:

  * [Regras de negócio](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/info_api/docs/Regras_de_negocio_e_classes.txt)

#### Diagramas: 

 * [Diagrama de Classe](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/info_api/docs/diagramas/diagramas_de_classe/Diagramas%20de%20Classe%20%20Back-End%20V1.png)
 * [Diagramas de Atividade](https://github.com/Squad-Back-End/reprography-nodejs/tree/master/info_api/docs/diagramas/diagramas_de_atividade)
 * [Diagrama de Caso de Uso](https://github.com/Squad-Back-End/reprography-nodejs/blob/master/info_api/docs/diagramas/diagramas_casos_de_uso/Diagrama_de_Caso_de_Uso.png)


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


## :rocket: Desenvolvedores :octocat:

<table>
  <tr>
    <td align="center"><a href="https://github.com/Luccazx12">
    <img src="https://avatars.githubusercontent.com/u/71888383?v=4" width="100px" alt="Imagem do perfil de Lucca"/>
    <br />
     <sub><b>Lucca</b></sub><br />:snowflake:TechLead:snowflake:
     </td>
    <td align="center"><a href="https://github.com/patricksp08">
    <img src="https://avatars.githubusercontent.com/u/71887999?v=4" width="100px" alt="Imagem do perfil de Lucca"/>
    <br />
    <sub><b>Patrick</b></sub><br />:snowflake::snowman::snowflake:
     </td>
    <td align="center"><a href="https://github.com/MrCyberpunKx">
    <img src="https://avatars.githubusercontent.com/u/71890228?v=4" width="100px" alt="Imagem do perfil de Lucca"/>
    <br />
    <sub><b>Daniel Santos</b></sub><br />:snowflake::snowman::snowflake:
     </td>
     <td align="center"><a href="https://github.com/Oseias-maker">
    <img src="https://avatars.githubusercontent.com/u/71889159?v=4" width="100px" alt="Imagem do perfil de Lucca"/>
    <br />
    <sub><b>Oseias Farias Jesus</b></sub><br />:snowflake::snowman::snowflake:
     </td>
    <td align="center"><a href="https://github.com/JoaoOFS">
    <img src="https://avatars.githubusercontent.com/u/71888050?v=4" width="100px" alt="Imagem do perfil de Lucca"/>
    <br />
    <sub><b>João Otávio</b></sub><br />:snowflake::snowman::snowflake:
     </td>
      
     
     
     
 </tr>
    
</table>

## 📝 Licença

Este projeto esta sobe a licença MIT.
