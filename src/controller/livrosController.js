const Livros = require('../Model/livrosModel');
const ItemVenda = require('../Model/item_vendaModel');

exports.listarLivros = async (req, res) => {
    try {
        const livros = await Livros.findAll();
        res.status(200).json(livros);
    } catch (erro) {
        console.error('Erro ao listar livros:', erro);
        res.status(500).json({ erro: 'Erro ao listar livros.' });
    }
};

exports.adicionarLivro = async (req, res) => {
    const { titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque } = req.body;

    try {
        const livro = await Livros.create({ titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque });
        res.status(201).json(livro);
    } catch (erro) {
        console.error('Erro ao adicionar livro:', erro);
        res.status(500).json({ erro: 'Erro ao adicionar livro.' });
    }
};

exports.editarLivro = async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livros.findByPk(id);
        if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });

        res.status(200).json(livro);
    } catch (erro) {
        console.error('Erro ao buscar livro:', erro);
        res.status(500).json({ erro: 'Erro ao buscar livro.' });
    }
};

exports.alterarLivro = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque } = req.body;

    try {
        const atualizado = await Livros.update(
            { titulo, autor, editora, ano_publicacao, isbn, preco, quantidade_estoque },
            { where: { id } }
        );

        if (atualizado[0] === 0) return res.status(404).json({ erro: 'Livro não encontrado.' });

        res.status(200).json({ mensagem: 'Livro atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao alterar livro:', erro);
        res.status(500).json({ erro: 'Erro ao alterar livro.' });
    }
};

exports.excluirLivro = async (req, res) => {
    const { id } = req.params;

    try {
        const itemVendas = await ItemVenda.findOne({ where: { livro_id: id } });
        if (itemVendas) return res.status(400).json({ erro: 'Não é possível excluir: o livro já foi vendido.' });

        const excluido = await Livros.destroy({ where: { id } });
        if (!excluido) return res.status(404).json({ erro: 'Livro não encontrado.' });

        res.status(200).json({ mensagem: 'Livro excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir livro:', erro);
        res.status(500).json({ erro: 'Erro ao excluir livro.' });
    }
};




