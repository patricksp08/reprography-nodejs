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

exports.pedidoEmail = (
    titulo_pedido, nif, centro_custos, curso, tipos_copia, tamanho_pagina, tipos_capa, acabamento,
    num_paginas, num_copias, modo_envio, observacoes) =>
    ` 
<div> <h1>Reprografia ${titulo_pedido} </h1>
<h3>Solicitada pelo usuário com NIF: <span>${nif}</span></h3>
<p>Centro de Custos: ${centro_custos}</p>
<p>Curso: ${curso}</p>
<p>Tipo de Cópia: ${tipos_copia}</p>
<p>Tamanho: ${tamanho_pagina}</p>
<p>Tipos de capa: ${tipos_capa}</p>
<p>Acabamento: ${acabamento}</p>
<p>Número de Páginas: ${num_paginas}</p>
<p>Número de Cópias: ${num_copias}</p>
<p>Modo de Envio: ${modo_envio}</p>
<p>Observações: ${observacoes}</p>
</div>

<style>
    #span{
        color: red;
    }
</style>
`