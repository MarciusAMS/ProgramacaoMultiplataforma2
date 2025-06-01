const { DataTypes } = require('sequelize');
const conexao = require('../database/bancoDados');

const Livros = conexao.define('Livros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    editora: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ano_publicacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    quantidade_estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Livros;