const express = require('express');
//const bodyParser = require('body-parser');
const clientesRoutes = require('./Routes/clientesRoutes');
const vendasRoutes = require('./Routes/vendasRoutes');
const livrosRoutes = require('./Routes/livrosRoutes');
const itemVendaRoutes = require('./Routes/itemVendaRoutes');
const menuRoutes = require('./Routes/menuRoutes');
const { conexao } = require('./Model/indexModel');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

app.use('/api/clientes', clientesRoutes);
app.use('/api/vendas', vendasRoutes);
app.use('/api/livros', livrosRoutes);
app.use('/api/itens', itemVendaRoutes);
app.use('/api/menu', menuRoutes);

conexao.sync().then(() => {
    console.log('Banco de dados sincronizado!');
}).catch(err => console.log('Erro ao sincronizar com o banco: ', err));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
