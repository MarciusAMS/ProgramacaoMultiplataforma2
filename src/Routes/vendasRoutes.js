const express = require('express');
const router = express.Router();
const vendasController = require('../controller/vendasController');

router.get('/novo', (req, res) => {res.render('vendas/adicionarVendas'); });

router.get('/', vendasController.listarVendas);
router.post('/novo', vendasController.adicionarVenda);
router.get('/:id', vendasController.editarVenda);
router.put('/:id', vendasController.alterarVenda);
router.delete('/excluir/:id', vendasController.excluirVenda);


module.exports = router;