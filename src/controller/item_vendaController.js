const Item_Venda = require('../Model/item_vendaModel');
const Vendas = require('../Model/vendasModel');
const Livros = require('../Model/livrosModel');

exports.listarItemVenda = async (req, res) => {
    try {
        const itens = await Item_Venda.findAll();
        res.status(200).json(itens);
    } catch (erro) {
        console.error('Erro ao listar itens:', erro);
        res.status(500).json({ erro: 'Erro ao listar itens da venda.' });
    }
};

exports.adicionarItemVenda = async (req, res) => {
    const { venda_id, livro_id, quantidade, preco_unitario } = req.body;

    try {
        if (!venda_id || !livro_id) {
            return res.status(400).json({ erro: 'venda_id e livro_id são obrigatórios' });
        }

        const vendaExiste = await Vendas.findByPk(venda_id);
        if (!vendaExiste) {
            return res.status(404).json({ erro: `Venda com ID ${venda_id} não encontrada.` });
        }

        const livroExiste = await Livros.findByPk(livro_id);
        if (!livroExiste) {
            return res.status(404).json({ erro: `Livro com ID ${livro_id} não encontrado.` });
        }

        const novoItem = await Item_Venda.create({ venda_id, livro_id, quantidade, preco_unitario });

        res.status(201).json(novoItem);
    } catch (erro) {
        console.error('Erro ao adicionar item da venda:', erro);
        res.status(500).json({ erro: 'Erro interno ao adicionar item da venda.' });
    }
};

exports.editarItemVenda = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item_Venda.findByPk(id);
        if (!item) return res.status(404).json({ erro: 'Item da venda não encontrado.' });

        res.status(200).json(item);
    } catch (erro) {
        console.error('Erro ao buscar item:', erro);
        res.status(500).json({ erro: 'Erro ao buscar item da venda.' });
    }
};

exports.alterarItemVenda = async (req, res) => {
    const { id } = req.params;
    const { venda_id, livro_id, quantidade, preco_unitario } = req.body;

    try {
        const atualizado = await Item_Venda.update(
            { venda_id, livro_id, quantidade, preco_unitario },
            { where: { id } }
        );

        if (atualizado[0] === 0) return res.status(404).json({ erro: 'Item da venda não encontrado.' });

        res.status(200).json({ mensagem: 'Item da venda atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao alterar item:', erro);
        res.status(500).json({ erro: 'Erro ao alterar item da venda.' });
    }
};

exports.excluirItemVenda = async (req, res) => {
    const { id } = req.params;

    try {
        const excluido = await Item_Venda.destroy({ where: { id } });

        if (!excluido) return res.status(404).json({ erro: 'Item da venda não encontrado.' });

        res.status(200).json({ mensagem: 'Item da venda excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir item:', erro);
        res.status(500).json({ erro: 'Erro ao excluir item da venda.' });
    }
};