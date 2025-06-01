const { DataTypes } = require('sequelize');
const Clientes = require('./clientesModel');
const conexao = require('../database/bancoDados');

const Vendas = conexao.define('Vendas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Clientes,
            key: 'id'
        }
    },
    data_venda: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor_total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

module.exports = Vendas;