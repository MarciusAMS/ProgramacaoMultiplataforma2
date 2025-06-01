const Cliente = require('../Model/clientesModel.js');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/utils');
const bcrypt = require('bcryptjs');


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

exports.getOne = (req, res, next) => {
    const id = req.body.id;

    if (id === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Cliente.findByPk(id).then(clientes => {
            res.status(200).json({
                mensagem: 'Usuário encontrado:',
                cliente: {
                    id: clientes.id,
                    email: clientes.email
                }
            });
        }).catch(erro => {
            console.log(erro);
            res.status(500).json({
                mensagem: 'Erro ao buscar cliente'
            });
        });
    };
}

exports.adicionarCliente = async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    if (email === undefined || senha === undefined) {
        res.status(400).json({
            mensagem: 'Campos Inválidos!'
        });
    } else {
        Cliente.findOne({
            where: {
                email: email
            }
        }).then(clientes => {
            if (clientes == undefined) {
                const salt = bcrypt.genSaltSync();
                const senhaCriptografada = bcrypt.hashSync(senha, salt);

                Cliente.create({
                    email: email,
                    senha: senhaCriptografada
                }).then(clienteCriado => {
                    res.status(201).json({
                        mensagem: 'Usuário criado com sucesso!',
                        clientes: {
                            id: clienteCriado.id,
                            email: clienteCriado.email
                        }
                    });
                });
            } else {
                res.status(409).json({
                    mensagem: 'Usuário já existe!'
                });
            }
        }).catch(erro => {
            console.log(erro);
            res.status(500).json({
                mensagem: 'Erro ao criar cliente!'
            });
        });
    };
};


exports.alterarCliente = async (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const senha = req.body.senha;

    if (id === undefined || email === undefined) {
        res.status(400).json({
            mensagem: 'Campos Inválidos'
        });
    } else {
        const salt = bcrypt.genSaltSync();
        const senhaCriptografada = bcrypt.hashSync(senha, salt);

        Cliente.update({
            email: email,
            senha: senhaCriptografada
        }, {
            where: {
                id: id
            }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Usuário atualizado com sucesso!'
            });
        }).catch(erro => {
            console.log(erro);
        })
    }
};

exports.excluirCliente = async (req, res) => {
    const id = req.body.id;

    if(id === undefined) {
        res.status(400).json({
            mensagem: 'Campos Inválidos!'
        });
    }

    Cliente.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(400).json({
            mensagem: 'Usuário deletado com sucesso!'
        });
    }).catch(erro => {
        console.log(erro);
        res.status(500).json({
            mensagem: 'Erro ao deletar usuário'
        });
    });
};

exports.login = (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    let erro = false;
    let clienteEncontrado = false;

    if (email === undefined || senha === undefined) {
        res.status(400).json({
            mensagem: 'Campos Inválidos'
        });
    } else {
        Cliente.findOne({
            where: {
                email: email
            }
        }).then(cliente => {
            if (!cliente) {
                erro = true;
                res.status(401).json({
                    mensagem: 'Falha na Autenticação!'
                });
            } else {
                clienteEncontrado = cliente;
                return bcrypt.compare(senha, cliente.senha);
            }
        }).then(resultado => {
            if (!erro) {
                if (!resultado) {
                    return res.status(401).json({
                        mensagem: 'Falha na Autenticação! 2'
                    });
                }
                const token = jwt.sign({
                    email: clienteEncontrado.email
                }, JWT_KEY, {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    mensagem: 'Autenticado com Sucesso!',
                    token: token,
                    expiresIn: 3600
                })
            }
        }).catch(erro => {
            console.log(erro);
            res.status(500).json({
                mensagem: 'Erro ao fazer login'
            });
        });
    }
};