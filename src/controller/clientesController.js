const Cliente = require('../Model/clientesModel.js');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/utils');


// exports.cadastrarCliente = async (req, res) => {
//     const { email } = req.body;

//     if (!email || !senha) {
//         return res.status(400).json({ mensagem: 'Email e senha são obrigatórios!' });
//     }

//     try {
//         const clienteExistente = await Cliente.findOne({ where: { email } });

//         if (clienteExistente) {
//             return res.status(409).json({ mensagem: 'Usuário já existe!' });
//         }

//         const novoCliente = await Cliente.create({ email, senha });

//         res.status(201).json({
//             mensagem: 'Cliente criado com sucesso!',
//             cliente: { id: novoCliente.id, email: novoCliente.email }
//         });
//     } catch (erro) {
//         console.error(erro);
//         res.status(500).json({ mensagem: 'Erro ao criar cliente.' });
//     }
// };

// exports.getPerfil = async (req, res) => {
//     const { email } = req.user;

//     try {
//         const cliente = await Cliente.findOne({ where: { email } });

//         if (!cliente) {
//             return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
//         }

//         res.status(200).json({
//             id: cliente.id,
//             email: cliente.email
//         });
//     } catch (erro) {
//         console.error(erro);
//         res.status(500).json({ mensagem: 'Erro ao buscar perfil.' });
//     }
// };

exports.listarClientes = async (req, res) => {
    Cliente.findAll({
        order: [
            ['email', 'ASC']
        ]
    }).then(clientes => {
        res.status(200).json({
            mensagem: 'Clientes encontrados:',
            clientes: clientes.map(cli => {
                return {
                    id: cli.id,
                    email: cli.email
                }
            })
        }).catch(erro => {
            console.log(erro);
            res.status(500).json({
                mensagem: 'Erro ao buscar clientes!'
            });
        });
    });
};


exports.adicionarCliente = async (req, res) => {
    try {
        const { email } = req.body;

        console.log(req.body);  // ✅ Já vimos que tá chegando

        if (!email) {
            return res.status(400).json({
                mensagem: 'Campo Inválido!'
            });
        }

        const clienteExistente = await Cliente.findOne({ where: { email } });

        if (!clienteExistente) {
            const clienteCriado = await Cliente.create({ email });

            return res.status(201).json({
                mensagem: 'Usuário criado com sucesso!',
                cliente: {
                    id: clienteCriado.id,
                    email: clienteCriado.email
                }
            });
        } else {
            return res.status(409).json({
                mensagem: 'Usuário já existe!'
            });
        }
    } catch (erro) {
        console.error(erro);
        return res.status(500).json({
            mensagem: 'Erro ao criar cliente!'
        });
    }
};



exports.editarCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        return res.status(200).json({ cliente });
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar cliente' });
    }
};




exports.alterarCliente = async (req, res) => {
    const { id, email } = req.body;

    if (!id || !email) {
        return res.status(400).json({
            mensagem: 'Campos Inválidos'
        });
    }

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado' });
        }

        await Cliente.update({
            email,
        }, {
            where: { id }
        });

        return res.status(200).json({
            mensagem: 'Usuário atualizado com sucesso!'
        });
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({
            mensagem: 'Erro ao atualizar cliente!'
        });
    }
};


exports.excluirCliente = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            mensagem: 'Campos Inválidos!'
        });
    }

    try {
        const deletado = await Cliente.destroy({ where: { id } });

        if (deletado) {
            return res.status(200).json({
                mensagem: 'Usuário deletado com sucesso!'
            });
        } else {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado!'
            });
        }
    } catch (erro) {
        console.log(erro);
        return res.status(500).json({
            mensagem: 'Erro ao deletar usuário'
        });
    }
};


exports.login = (req, res, next) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({
            mensagem: 'Campo Inválido'
        });
    }

    Cliente.findOne({ where: { email: email } })
        .then(cliente => {
            if (!cliente) {
                return res.status(401).json({
                    mensagem: 'Falha na Autenticação!'
                });
            }

            const token = jwt.sign({
                email: cliente.email
            }, JWT_KEY, {
                expiresIn: '1h'
            });

            return res.status(200).json({
                mensagem: 'Autenticado com Sucesso!',
                token: token,
                expiresIn: 3600
            });
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json({
                mensagem: 'Erro ao fazer login'
            });
        });
};
