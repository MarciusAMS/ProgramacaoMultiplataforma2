const Livros = require('../Model/livrosModel');
const ItemVenda = require('../Model/item_vendaModel');

exports.listarLivros = async (req, res) => {
    const livros = await Livros.findAll();
    res.render('livros/consultaLivros', { livros: livros || [] });
};


exports.adicionarLivro = async (req, res) => {
    const { titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque } = req.body;
     await Livros.create({ titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque });
    res.redirect('/api/livros');
} 

exports.editarLivro = async (req, res) => {
    const { id } = req.params;
    const livros = await Livros.findByPk(id);
    res.render('livros/editarLivros', { livro: livros });
};


exports.alterarLivro = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque } = req.body;
    await Livros.update({ titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque }, { where: { id } });
    res.redirect('/api/livros');
};


exports.excluirLivro = async (req, res) => {
    const { id } = req.params;
    const itemVendas = await ItemVenda.findOne({ where: { livro_id: id } });

    if (itemVendas) {
  return res.status(400).send("Não é possível excluir: o livro já foi vendido.");
    }

    await Livros.destroy({ where: { id } });
    res.redirect('/api/livros');
};




