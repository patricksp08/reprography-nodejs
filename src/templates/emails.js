exports.forgotPasswordEmail = (token, mail) =>
    ` <div id="principalDiv">
<h1>Recuperação de senha</h1>
<p>Para resetar sua senha, por favor clique no link abaixo:</p>
<a href="http://localhost:3000/newPassword?token=${encodeURIComponent(token)}&email=${mail}">
\n\nhttp://localhost:3000/newPassword?token=${encodeURIComponent(token)}&email=${mail}
</a>
<br>
<p>Caso você não tenha realizado essa solicitação, por favor <span id="span">ignore</span> esse email!</p>
</div>

<style>
    #span{
        color: red;
    }
    #principalDiv{
      width: 100%;
    }
</style>
`

exports.pedidoEmail = ({ id, titulo_pedido, nif, centro_custos, curso, servicoCA, servicoCT,
    num_paginas, num_copias, modo_envio, observacoes
}) =>
    ` 
<div> 
<div>
<h1>Pedido nº${id}: ${titulo_pedido} </h1>
<h4>Modo de Envio: ${modo_envio}</h4>
<h4>NIF do solicitante: <span>${nif}</span></h4>
</div>

<div>
<h3>Servicos Solicitados:</h3>
<h4>Tipo da cópia e Tamanho: </h4><p>${servicoCT}</p>
<h4>Capa e acabamento: </h4><p>${servicoCA}</p>
</div>

<div>
<h3>Outros:</h3>
<p>Número de Páginas: ${num_paginas}</p>
<p>Número de Cópias: ${num_copias}</p>

<p>Centro de Custos: ${centro_custos}</p>
<p>Curso: ${curso}</p>
<p>Observações: ${observacoes}</p>
</div>
</div>

<style>
    #span{
        color: red;
    }
</style>
`

exports.avaliacaoEmail = ({ id, titulo_pedido, nif, avaliacao_obs, avaliacao_pedido }) => `
<div> <h1>Avaliação do pedido nº${id}: ${titulo_pedido} </h1>
<h4>NIF do solicitante: <span>${nif}</span></h4>
<h3>Status: ${avaliacao_pedido}</h3>
<h4>Feedback:</h4>
<p>${avaliacao_obs}</p>
`