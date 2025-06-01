const { DataTypes } = require('sequelize');
const Livros = require('./livrosModel');
const Vendas = require('./vendasModel');
const conexao = require('../database/bancoDados');

const ItemVenda = conexao.define('Item_Venda', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    venda_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Vendas,
            key: 'id'
        }
    },
    livro_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Livros,
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco_unitario: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

module.exports = ItemVenda;