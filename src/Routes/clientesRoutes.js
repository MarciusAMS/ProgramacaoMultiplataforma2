const express = require('express');
const router = express.Router();
const clientesController = require('../controller/clientesController');
const token = require('../middleware/token');

router.get('/', clientesController.listarClientes);
router.post('/login', clientesController.login);
router.post('/novo', token, clientesController.adicionarCliente);
router.get('/:id', clientesController.editarCliente);
router.put('/:id', token, clientesController.alterarCliente);
router.delete('/excluir/:id', token, clientesController.excluirCliente);
 

module.exports = router;