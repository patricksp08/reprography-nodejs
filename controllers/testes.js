

const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//Inicializando as models e as recebendo
const { initModels } = require("../models/init-models");
var { det_pedido, pedido, departamento, curso} = initModels(sequelize)

// SELECT num_copias AS 'copias',createdAt FROM det_pedido WHERE createdAt LIKE '%%%%-10-%%';

// SELECT id_tipos_copia, count(*) AS 'quantidade' FROM det_pedido GROUP BY id_tipos_copia ;

// SELECT  SUM(custo_total),createdAt FROM pedido WHERE createdAt LIKE '%%%%-10-%%';

// SELECT id_tipos_capa, count(*) AS 'quantidade' FROM det_pedido GROUP BY id_tipos_capa ;

// SELECT id_depto, count(*) AS 'quantidade' FROM usuario GROUP BY id_depto HAVING count(*)   ;

// SELECT id_curso, count(*) AS 'quantidade ' FROM pedido GROUP BY id_curso HAVING count(*)   ;


//Passado para controller det_pedido
// exports.getSumCopias = () => det_pedido.findAll ({
//     attributes: [
//         'createdAt',
//         [sequelize.fn('sum', sequelize.col('num_copias')), 'total_copias'],
//       ],
//       group: ['createdAt'],
// })