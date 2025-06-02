const ItemVenda = require('../Model/item_vendaModel');
const Venda = require('../Model/vendasModel');
const Livro = require('../Model/livrosModel');

exports.listarItensVenda = async (req, res) => {
    try {
        const itens = await ItemVenda.findAll();
        res.status(200).json(itens);
    } catch (erro) {
        console.error('Erro ao listar itens da venda:', erro);
        res.status(500).json({ erro: 'Erro ao listar itens da venda.' });
    }
};

exports.adicionarItemVenda = async (req, res) => {
    const { venda_id, livro_id, quantidade, preco_unitario } = req.body;

    try {
        if (!venda_id || !livro_id) {
            return res.status(400).json({ erro: 'Campos venda_id e livro_id são obrigatórios.' });
        }

        const venda = await Venda.findByPk(venda_id);
        if (!venda) {
            return res.status(404).json({ erro: `Venda com ID ${venda_id} não encontrada.` });
        }

        const livro = await Livro.findByPk(livro_id);
        if (!livro) {
            return res.status(404).json({ erro: `Livro com ID ${livro_id} não encontrado.` });
        }

        const novoItem = await ItemVenda.create({ venda_id, livro_id, quantidade, preco_unitario });

        res.status(201).json(novoItem);
    } catch (erro) {
        console.error('Erro ao adicionar item da venda:', erro);
        res.status(500).json({ erro: 'Erro ao adicionar item da venda.' });
    }
};

exports.buscarItemVenda = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await ItemVenda.findByPk(id);
        if (!item) return res.status(404).json({ erro: 'Item da venda não encontrado.' });

        res.status(200).json(item);
    } catch (erro) {
        console.error('Erro ao buscar item da venda:', erro);
        res.status(500).json({ erro: 'Erro ao buscar item da venda.' });
    }
};

exports.alterarItemVenda = async (req, res) => {
    const { id } = req.params;
    const { venda_id, livro_id, quantidade, preco_unitario } = req.body;

    try {
        const atualizado = await ItemVenda.update(
            { venda_id, livro_id, quantidade, preco_unitario },
            { where: { id } }
        );

        if (atualizado[0] === 0) return res.status(404).json({ erro: 'Item da venda não encontrado.' });

        res.status(200).json({ mensagem: 'Item da venda atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao alterar item da venda:', erro);
        res.status(500).json({ erro: 'Erro ao alterar item da venda.' });
    }
};

exports.excluirItemVenda = async (req, res) => {
    const { id } = req.params;

    try {
        const excluido = await ItemVenda.destroy({ where: { id } });

        if (!excluido) return res.status(404).json({ erro: 'Item da venda não encontrado.' });

        res.status(200).json({ mensagem: 'Item da venda excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir item da venda:', erro);
        res.status(500).json({ erro: 'Erro ao excluir item da venda.' });
    }
};
