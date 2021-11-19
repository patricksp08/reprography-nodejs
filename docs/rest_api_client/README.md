### O que é Postman:

O Postman é uma ferramenta que dá suporte à documentação das requisições feitas pela API. Ele possui ambiente para a documentação, execução de testes de APIs e requisições em geral.

Ao utilizá-lo, você passará a trabalhar com APIs de modo mais eficiente, construindo solicitações rapidamente e, ainda, poderá guardá-las para uso posterior, além de conseguir analisar as respostas enviadas pela API.

Um bom motivo para usar essa ferramenta é que, por meio dela, é possível reduzir drasticamente o tempo necessário para testar e desenvolver APIs.

Em um exemplo prático, imagine que você queira fazer uma solicitação GET para procurar certas informações no nome da empresa.

Se fosse o caso de testar uma solicitação GET sem usar o Postman, você precisaria escrever todo um código para executar a requisição, além de uma interface visual para interagir com essa rotina.

Se fosse concedido, provavelmente você precisaria escrever tudo isso para criar um aplicativo funcional usando essa API, mas todo esse trabalho seria simplesmente para testar a sua funcionalidade, o que de fato, nesse formato, é tedioso e demorado.

### Por que usar o Postman?

Além de ser um aplicativo gratuito e fácil de aprender, com pouco tempo você já estará enviando seus primeiros requests (solicitações/requisições). No mais, trata-se de uma ferramenta com um amplo suporte para todas as APIs e Schemas.

**Download Postman App:** https://www.postman.com/downloads/?utm_source=postman-home

![image](https://user-images.githubusercontent.com/71888050/142628036-780b4135-ce4b-4602-98fa-02969972ef8b.png)

### Criando uma Collection:

Collection(coleções) é o local onde fica guardado todos os códigos desenvolvidos.

Para criar uma collection, basta clicar em Collection:

![image](https://user-images.githubusercontent.com/71888050/142628476-bef75124-d3d1-401d-9e9f-e4f50a182030.png)

Coloque um nome e clique em Create:

![image](https://user-images.githubusercontent.com/71888050/142628517-ff8b1253-b4e6-4e25-ac66-0964424f1b13.png)

Criando uma Requisição

Para criar uma requisição, clique em New em seguida em request:

![image](https://user-images.githubusercontent.com/71888050/142628575-a4070117-45e2-4e74-b5b8-ec969ae9495c.png)

Nomeie sua requisição, em seguida selecione a collection (Select a collection or folder to save to), e Salve na collection selecionada.

![image](https://user-images.githubusercontent.com/71888050/142628632-c4b5dd99-259b-4d43-bd36-7253558d10f8.png)

Em seguida selecione o método HTTP desejado(GET, PUT, POST...)

![image](https://user-images.githubusercontent.com/71888050/142628688-46398c3e-1642-48ff-9f92-36d389ceeed4.png)


### O que é Thunder:

No mundo do desenvolvimento Web, o Postman é a ferramenta mais escolhida para realizar testes em API’s. No entanto, depender de uma ferramenta externa pode muitas vezes dificultar o desenvolvimento e testagem. Por essa razão, o Thunder Client foi desenvolvido como uma extensão para o VsCode para centralizar todo esse processo dentro de um só local.

Instalação:

Como qualquer extensão do Visual Studio Code, a instalação é bem simples.

![image](https://user-images.githubusercontent.com/71888050/142630831-20114e67-5a60-4526-9381-de9b021f5404.png)

Como Utilizar
Primeiramente, precisamos de uma API para fazer as chamadas. Para isso, criei uma API bem simples com o Json-Server. Em seguida, vamos clicar no ícone de raio, que acabou de aparecer no VsCode.

![image](https://user-images.githubusercontent.com/71888050/142630988-5974a77d-8a59-4875-b117-cd987faad477.png)

Extensão Thunder Client no VSCode
Ao clicar, será aberta uma aba ao lado, nela estarão todas as requisições feitas e um botão para criar uma nova requisição. No meu caso, como ainda não fiz nenhuma requisição, só vejo o botão.

![image](https://user-images.githubusercontent.com/71888050/142631066-fa782919-137e-4b37-81a1-8f893eccad11.png)


New Request no Thunder Client 
Agora vamos clicar em New Request. A visão é semelhante a outras clientes HTTP, como o Postman, por isso já estamos familiarizados com a ferramenta e entendemos como ela funciona.

![image](https://user-images.githubusercontent.com/71888050/142631095-6270bc2d-d8e9-48a8-8a3d-f574e3e77a68.png)


Thunder Client
Agora, vamos colocar a URL que vai acessar nossa API na barra de busca, selecionar o método que vamos usar e clicar em Send. Feito isso, veremos a seguinte resposta:

![image](https://user-images.githubusercontent.com/71888050/142631127-b8943167-002d-4242-99fb-f915559f5608.png)


Inserções no Thunder Client 
Para realizar inserções também é bem simples! Basta selecionar o método POST ao lado e depois clicar em body. Dessa forma, podemos adicionar todas as informações que quereremos que sejam adicionadas.

![image](https://user-images.githubusercontent.com/71888050/142631292-f82521c6-44e8-4861-92b7-e72d9c1c4419.png)


Chamadas HTTP no Thunder Client 
Seguindo essa lógica, você é capaz de realizar qualquer chamada HTTP sem maiores problemas, pois o Thunder Client vai suportar tranquilamente e não vai te atrapalhar durante a execução.
