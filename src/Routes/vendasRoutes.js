const express = require('express');
const router = express.Router();
const vendasController = require('../controller/vendasController');
const token = require('../middleware/token');

router.get('/novo', (req, res) => {res.render('vendas/adicionarVendas'); });

router.get('/', vendasController.listarVendas);
router.post('/novo', token, vendasController.adicionarVenda);
router.get('/:id', vendasController.editarVenda);
router.put('/:id', token, vendasController.alterarVenda);
router.delete('/excluir/:id', token, vendasController.excluirVenda);


module.exports = router;