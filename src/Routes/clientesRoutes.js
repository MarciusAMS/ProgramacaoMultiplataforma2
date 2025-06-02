const express = require('express');
const router = express.Router();
const clientesController = require('../controller/clientesController');
const token = require('../middleware/token');

// Adaptar rotas, toda vez que chamar Alterar, Incluir chamar GET por estar consultando o banco.
// Quando necessitar manipular os valores do banco usar POST, PUT, DELETE, etc.

router.get('/', clientesController.listarClientes);
// router.post('/cadastrar', clientesController.cadastrarCliente);
router.post('/login', clientesController.login);
router.post('/novo', token, clientesController.adicionarCliente);
router.get('/:id', clientesController.editarCliente);
router.put('/:id', token, clientesController.alterarCliente);
router.delete('/excluir/:id', token, clientesController.excluirCliente);
 

module.exports = router;