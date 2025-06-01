const { Sequelize } = require('sequelize');

const conexao = new Sequelize('Livraria', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

conexao.authenticate()
  .then(() => console.log('🔥 Conexão com o banco de dados bem-sucedida!'))
  .catch(err => console.error('❌ Erro ao conectar ao banco:', err));

module.exports = conexao;  
