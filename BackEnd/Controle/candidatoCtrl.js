import Candidato from '../Modelo/candidato.js';

export default class CandidatoCtrl {

    gravar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "POST" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const telefone = dados.telefone;

            if (cpf && nome && endereco && cidade && telefone) {
                const candidato = new Candidato(cpf, nome, endereco, cidade, telefone);
                candidato.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um candidato conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "PUT" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const cidade = dados.cidade;
            const telefone = dados.telefone;

            if (cpf && nome && endereco && cidade && telefone) {
                const candidato = new Candidato(cpf, nome, endereco, cidade, telefone);
                candidato.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe adequadamente todos os dados de um candidato conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type("application/json");
    
        if (requisicao.method === "DELETE" && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
    
            if (cpf) {
                const candidato = new Candidato(cpf);
                candidato.removerDoBancoDados().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Candidato excluído com sucesso!"
                    });
                }).catch((erro) => {
                    if (erro.message.includes("a foreign key constraint fails")) {
                        resposta.status(400).json({
                            status: false,
                            mensagem: "Não é possível excluir o candidato, pois ele está vinculado a uma vaga."
                        });
                    } else {
                        resposta.status(500).json({
                            status: false,
                            mensagem: erro.message
                        });
                    }
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o CPF do candidato conforme documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido ou candidato no formato JSON não fornecido! Consulte a documentação da API"
            });
        }
    }
    

    consultar(requisicao, resposta) {
        resposta.type("application/json");

        if (requisicao.method === "GET") {
            const candidato = new Candidato();
            candidato.consultar('').then((candidatos) => {
                resposta.status(200).json({
                    status: true,
                    listaCandidatos: candidatos
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }

    consultarPeloCPF(requisicao, resposta) {
        resposta.type("application/json");

        const cpf = requisicao.params['cpf'];

        if (requisicao.method === "GET") {
            const candidato = new Candidato();
            candidato.consultarCPF(cpf).then((candidato) => {
                resposta.status(200).json({
                    status: true,
                    candidato: candidato
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: erro.message
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido! Consulte a documentação da API"
            });
        }
    }
}
