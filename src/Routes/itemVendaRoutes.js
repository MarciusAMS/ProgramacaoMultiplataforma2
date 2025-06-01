const express = require('express');
const router = express.Router();
const itemVendaController = require('../controller/item_vendaController');

router.get('/novo', (req, res) => {res.render('itens/adicionarItens'); });
router.get('/', itemVendaController.listarItemVenda);
router.post('/novo', itemVendaController.adicionarItemVenda);
router.get('/:id', itemVendaController.editarItemVenda);
router.put('/:id', itemVendaController.alterarItemVenda);
router.delete('/excluir/:id', itemVendaController.excluirItemVenda);


module.exports = router;