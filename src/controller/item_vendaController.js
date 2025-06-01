const Item_Venda = require('../Model/item_vendaModel');
const Vendas = require('../Model/vendasModel');
const Livros = require('../Model/livrosModel');

exports.listarItemVenda = async (req, res) => {
    const itens = await Item_Venda.findAll();
    res.render('itens/consultaItens', { itens });
}


exports.adicionarItemVenda = async (req, res) => {
    const { venda_id, livro_id, quantidade, preco_unitario } = req.body;
    try {

        // Verifica se os campos obrigatórios foram enviados
        if (!venda_id || !livro_id) {
            return res.status(400).json({ erro: 'venda_id e livro_id são obrigatórios' });
        }

        // Verifica se a venda existe
        const vendaExiste = await Vendas.findByPk(venda_id);
        if (!vendaExiste) {
            return res.status(404).json({ erro: `Venda com ID ${venda_id} não encontrada.` });
        }

        // Verifica se o livro existe
        const livroExiste = await Livros.findByPk(livro_id);
        if (!livroExiste) {
            return res.status(404).json({ erro: `Livro com ID ${livro_id} não encontrado.` });
        }

        // Cria o item da venda
        const novoItem = await ItemVenda.create({
            venda_id,
            livro_id,
            quantidade,
            preco_unitario,
        });

        res.status(201).json(novoItem);
    } catch (erro) {
        console.error('Erro ao adicionar item da venda:', erro);
        res.status(500).json({ erro: 'Erro interno ao adicionar item da venda.' });
    }

    await Item_Venda.create({ venda_id, livro_id, quantidade, preco_unitario });
    res.redirect('/api/itens/novo');
} 


exports.editarItemVenda = async (req, res) => {
    const { id } = req.params;
    const itens = await Item_Venda.findByPk(id);
    res.render('itens/editaritens', { itens });
};


exports.alterarItemVenda = async (req, res) => {
    const { id } = req.params;
    const { venda_id, livro_id, quantidade, preco_unitario } = req.body;
    await Item_Venda.update({ venda_id, livro_id, quantidade, preco_unitario }, { where: { id } });
    res.redirect('/api/itens');
};


exports.excluirItemVenda = async (req, res) => {
    const { id } = req.params;
    await Item_Venda.destroy({ where: { id } });
    res.redirect('/api/itens');
};