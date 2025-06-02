const express = require('express');
const router = express.Router();
const itemVendaController = require('../controller/item_vendaController');
const token = require('../middleware/token');

router.get('/', itemVendaController.listarItensVenda);
router.post('/novo', token, itemVendaController.adicionarItemVenda);
router.get('/:id', itemVendaController.buscarItemVenda);
router.put('/:id', token, itemVendaController.alterarItemVenda);
router.delete('/excluir/:id', token, itemVendaController.excluirItemVenda);


module.exports = router;