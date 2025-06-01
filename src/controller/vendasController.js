const Venda = require('../Model/vendasModel');
const ItemVenda = require('../Model/item_vendaModel');
const Cliente = require('../Model/clientesModel');

exports.listarVendas = async (req, res) => {
    const venda = await Venda.findAll();
    res.render('vendas/consultaVendas', { venda: venda || [] });
}


exports.adicionarVenda = async (req, res) => {
    const { cliente_id, data_venda, valor_total } = req.body;

    try {
        // Verifica se o cliente existe
        const cliente = await Cliente.findOne({ where: { id: cliente_id } });

        if (!cliente) {
            return res.status(400).send("Não é possível criar: não existe cliente com esse ID");
        }

        // Cria a venda
        await Venda.create({ cliente_id, data_venda, valor_total });

        res.redirect('/api/vendas');

    } catch (error) {
        console.error('Erro ao adicionar venda:', error);
        res.status(500).send("Erro no servidor");
    }
};


exports.editarVenda = async (req, res) => {
    const { id } = req.params;
    const venda = await Venda.findByPk(id);
    res.render('vendas/editarVendas', { venda: venda });
};


exports.alterarVenda = async (req, res) => {
    const { id } = req.params;
    const { cliente_id, data_venda, valor_total } = req.body;
    await Venda.update({ cliente_id, data_venda, valor_total }, { where: { id } });
    res.redirect('/api/vendas');
};

exports.excluirVenda = async (req, res) => {
    const { id } = req.params;
    const itemVendas = await ItemVenda.findOne({ where: { venda_id: id } });

    if (itemVendas) {
  return res.status(400).send("Não é possível excluir:  a venda com esse ID já foi feita.");
    }
    await Venda.destroy({ where: { id } });
    res.redirect('/api/vendas');
};
