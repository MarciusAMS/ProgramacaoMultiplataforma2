const express = require('express');
const router = express.Router();
const livrosController = require('../controller/livrosController');
const token = require('../middleware/token');

router.get('/novo', (req, res) => {res.render('livros/adicionarLivros'); });

router.get('/', livrosController.listarLivros);
router.post('/novo', token, livrosController.adicionarLivro);
router.get('/:id', livrosController.editarLivro);
router.put('/:id', token, livrosController.alterarLivro);
router.delete('/excluir/:id', token, livrosController.excluirLivro);


module.exports = router;