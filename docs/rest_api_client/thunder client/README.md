## Thunder

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
