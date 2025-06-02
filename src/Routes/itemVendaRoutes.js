const express = require('express');
const router = express.Router();
const itemVendaController = require('../controller/item_vendaController');
const token = require('../middleware/token');

router.get('/', itemVendaController.listarItemVenda);
router.post('/novo', token, itemVendaController.adicionarItemVenda);
router.get('/:id', itemVendaController.editarItemVenda);
router.put('/:id', token, itemVendaController.alterarItemVenda);
router.delete('/excluir/:id', token, itemVendaController.excluirItemVenda);


module.exports = router;