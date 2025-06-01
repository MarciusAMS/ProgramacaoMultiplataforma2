const express = require('express');
const router = express.Router();
const livrosController = require('../controller/livrosController');

router.get('/novo', (req, res) => {res.render('livros/adicionarLivros'); });

router.get('/', livrosController.listarLivros);
router.post('/novo', livrosController.adicionarLivro);
router.get('/:id', livrosController.editarLivro);
router.put('/:id', livrosController.alterarLivro);
router.delete('/excluir/:id', livrosController.excluirLivro);


module.exports = router;