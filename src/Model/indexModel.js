const conexao = require('../database/bancoDados');

// Importando os models
const Clientes = require('./clientesModel');
const Livros = require('./livrosModel');
const Vendas = require('./vendasModel');
const ItemVenda = require('./item_vendaModel');

// Associações
Vendas.belongsTo(Clientes, { foreignKey: 'cliente_id' });
ItemVenda.belongsTo(Vendas, { foreignKey: 'venda_id' });
ItemVenda.belongsTo(Livros, { foreignKey: 'livro_id' });

module.exports = {
    conexao,
    Clientes,
    Livros,
    Vendas,
    ItemVenda
};
