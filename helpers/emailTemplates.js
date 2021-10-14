exports.forgotPasswordEmail = (token, mail) => `<div id="principalDiv">
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

exports.pedidoEmail =  (
  nif, centro_custos, titulo_pedido, modo_envio, curso, observacoes, num_copias,
  num_paginas, tipos_copia, acabamento, tamanho_pagina, tipos_capa
) => 
` 
<div> <h1>Reprografia solicitada pelo usuário com nif: <span>${nif}</span></h1>
<p>Centro de Custos: ${centro_custos}</p>
<p>Título do Pedido: ${titulo_pedido}</p>
<p>Modo de Envio: ${modo_envio}</p>
<p>Curso: ${curso}</p>
<p>Observações: ${observacoes}</p>
<p>Número de Cópias: ${num_copias}</p>
<p>Número de Páginas: ${num_paginas}</p>
<p>Tipo de Cópia: ${tipos_copia}</p>
<p>Acabamento: ${acabamento}</p>
<p>Tamanho: ${tamanho_pagina}</p>
<p>Tipos de capa: ${tipos_capa}</p>
</div>

<style>
    #span{
        color: red;
    }
</style>
`