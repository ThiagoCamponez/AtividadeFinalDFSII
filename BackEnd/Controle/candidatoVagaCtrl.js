import Candidato from "../Modelo/candidato.js";
import Vaga from "../Modelo/vaga.js";
import CandidatoVaga from "../Modelo/candidatoVaga.js";

export default class CandidatoVagaCtrl {
    
    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const candCpf = dados.cand_cpf;
            const vagas = dados.vagas; 
            const dataInscricao = new Date(dados.data_inscricao).toLocaleDateString();
            const horarioInscricao = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
            if (candCpf && vagas && vagas.length > 0 && dataInscricao && horarioInscricao) {
                const candidatoVaga = new CandidatoVaga(candCpf, vagas, dataInscricao, horarioInscricao);
    
                candidatoVaga.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Inscrição registrada com sucesso!"
                    });
                }).catch((erro) => {
                    if (erro.code === 'ER_DUP_ENTRY') { 
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Erro ao registrar inscrição: Candidato já está inscrito nessa Vaga"
                        });
                    } else {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar a inscrição: " + erro.message
                        });
                    }
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, forneça todos os dados conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Método inválido! Utilize o método POST para cadastrar uma inscrição."
            });
        }
    }
    consultar(requisicao, resposta) {
        resposta.type('application/json');  
        if (requisicao.method === 'GET') {
            let termo = requisicao.params.termo || ""; 
            const candidatoVaga = new CandidatoVaga();
            candidatoVaga.consultar(termo).then((listaInscricoes) => {
                resposta.status(200).json({
                    "status": true,
                    "listaInscricoes": listaInscricoes
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar as inscrições: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Método inválido! Utilize o método GET para consultar inscrições."
            });
        }
    }


    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE') {
            const candCpf = requisicao.params.cand_cpf; 
            const vagaCodigo = requisicao.params.vaga_codigo; 
    
            if (candCpf && vagaCodigo) {
                const candidatoVaga = new CandidatoVaga(candCpf, vagaCodigo);
    
                candidatoVaga.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: `Inscrição do candidato ${candCpf} na vaga ${vagaCodigo} excluída com sucesso!`
                    });
                }).catch((erro) => {
                    console.error(`Erro ao excluir inscrição: ${erro}`);
                    resposta.status(500).json({
                        status: false,
                        mensagem: `Erro ao excluir a inscrição: ${erro.message}`
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "CPF do candidato ou código da vaga não fornecido!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método de requisição inválido!"
            });
        }
    }
    
}