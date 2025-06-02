const Venda = require('../Model/vendasModel');
const ItemVenda = require('../Model/item_vendaModel');
const Cliente = require('../Model/clientesModel');

exports.listarVendas = async (req, res) => {
    try {
        const vendas = await Venda.findAll();
        res.status(200).json(vendas);
    } catch (erro) {
        console.error('Erro ao listar vendas:', erro);
        res.status(500).json({ erro: 'Erro ao listar vendas.' });
    }
};

exports.adicionarVenda = async (req, res) => {
    const { cliente_id, data_venda, valor_total } = req.body;

    try {
        const cliente = await Cliente.findByPk(cliente_id);
        if (!cliente) return res.status(400).json({ erro: 'Não existe cliente com esse ID.' });

        const venda = await Venda.create({ cliente_id, data_venda, valor_total });
        res.status(201).json(venda);
    } catch (erro) {
        console.error('Erro ao adicionar venda:', erro);
        res.status(500).json({ erro: 'Erro ao adicionar venda.' });
    }
};

exports.editarVenda = async (req, res) => {
    const { id } = req.params;

    try {
        const venda = await Venda.findByPk(id);
        if (!venda) return res.status(404).json({ erro: 'Venda não encontrada.' });

        res.status(200).json(venda);
    } catch (erro) {
        console.error('Erro ao buscar venda:', erro);
        res.status(500).json({ erro: 'Erro ao buscar venda.' });
    }
};

exports.alterarVenda = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, data_venda, valor_total } = req.body;

    try {
        const atualizado = await Venda.update(
            { cliente_id, data_venda, valor_total },
            { where: { id } }
        );

        if (atualizado[0] === 0) return res.status(404).json({ erro: 'Venda não encontrada.' });

        res.status(200).json({ mensagem: 'Venda atualizada com sucesso.' });
    } catch (erro) {
        console.error('Erro ao alterar venda:', erro);
        res.status(500).json({ erro: 'Erro ao alterar venda.' });
    }
};

exports.excluirVenda = async (req, res) => {
    const { id } = req.params;

    try {
        const itemVendas = await ItemVenda.findOne({ where: { venda_id: id } });
        if (itemVendas) return res.status(400).json({ erro: 'Não é possível excluir: a venda já possui itens.' });

        const excluido = await Venda.destroy({ where: { id } });
        if (!excluido) return res.status(404).json({ erro: 'Venda não encontrada.' });

        res.status(200).json({ mensagem: 'Venda excluída com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir venda:', erro);
        res.status(500).json({ erro: 'Erro ao excluir venda.' });
    }
};
