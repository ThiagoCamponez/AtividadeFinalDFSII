import CandidatoVaga from "../Modelo/candidatoVaga.js";
import Candidato from "../Modelo/candidato.js";
import Vaga from "../Modelo/vaga.js";
import conectar from "./conexao.js";

export default class CandidatoVagaDAO {
    async gravar(candidatoVaga) {
        if (Array.isArray(candidatoVaga.vagas) && candidatoVaga.vagas.length > 0) {
            const conexao = await conectar();
            await conexao.beginTransaction(); 

            try {
                for (const vaga of candidatoVaga.vagas) {
                    const sql = 'INSERT INTO Candidato_Vaga(cand_cpf, vaga_codigo, data_inscricao, horario_inscricao) VALUES (?, ?, str_to_date(?, "%d/%m/%Y"), ?)';
                    const parametros = [candidatoVaga.candCpf, vaga.codigo, candidatoVaga.dataInscricao, candidatoVaga.horarioInscricao];
                    await conexao.execute(sql, parametros);
                }

                await conexao.commit(); 
                global.poolConexoes.releaseConnection(conexao);
            } catch (error) {
                await conexao.rollback(); 
                throw error;
            }
        } else {
            throw new Error('Nenhuma vaga foi fornecida para o candidato.');
        }
    }

    async alterar(candidatoVaga) {
        if (candidatoVaga instanceof CandidatoVaga) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql = 'UPDATE Candidato_Vaga SET data_inscricao = str_to_date(?, "%d/%m/%Y"), horario_inscricao = ? WHERE cand_cpf = ? AND vaga_codigo = ?';
                const parametros = [candidatoVaga.dataInscricao, candidatoVaga.horarioInscricao, candidatoVaga.candCpf, candidatoVaga.vagaCodigo];
                await conexao.execute(sql, parametros);

                await conexao.commit();
                global.poolConexoes.releaseConnection(conexao);
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }

    async excluir(candidatoVaga) {
        const conexao = await conectar();
        try {
            await conexao.beginTransaction();
    
            const sql = 'DELETE FROM Candidato_Vaga WHERE cand_cpf = ? AND vaga_codigo = ?';
            const parametros = [candidatoVaga.candCpf, candidatoVaga.vagas]; 
            await conexao.execute(sql, parametros);
    
            await conexao.commit();
            global.poolConexoes.releaseConnection(conexao);
        } catch (error) {
            await conexao.rollback();
            global.poolConexoes.releaseConnection(conexao);
            throw error;
        }
    }
    
    

    async consultar(termoBusca = "") {
        const listaInscricoes = [];
        const conexao = await conectar();
        let sql = "";
        let parametros = [];
    
        if (!isNaN(termoBusca) && termoBusca !== "") {
            sql = `SELECT cv.cand_cpf, c.cand_nome, c.cand_endereco, c.cand_telefone, 
                          cv.vaga_codigo, v.vaga_cargo, v.vaga_salario, v.vaga_cidade, v.vaga_quantidade, 
                          cv.data_inscricao, cv.horario_inscricao 
                   FROM Candidato_Vaga cv
                   INNER JOIN Candidato c ON cv.cand_cpf = c.cand_cpf
                   INNER JOIN Vaga v ON cv.vaga_codigo = v.vaga_codigo
                   WHERE cv.cand_cpf = ? OR cv.vaga_codigo = ?
                   ORDER BY c.cand_nome`;
            parametros = [termoBusca, termoBusca];
        } else {
            sql = `SELECT cv.cand_cpf, c.cand_nome, c.cand_endereco, c.cand_telefone, 
                          cv.vaga_codigo, v.vaga_cargo, v.vaga_salario, v.vaga_cidade, v.vaga_quantidade, 
                          cv.data_inscricao, cv.horario_inscricao 
                   FROM Candidato_Vaga cv
                   INNER JOIN Candidato c ON cv.cand_cpf = c.cand_cpf
                   INNER JOIN Vaga v ON cv.vaga_codigo = v.vaga_codigo
                   ORDER BY c.cand_nome`;
        }
    
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
    
        if (registros.length > 0) {
            for (const registro of registros) {
                const candidato = new Candidato(
                    registro.cand_cpf, 
                    registro.cand_nome, 
                    registro.cand_endereco, 
                    registro.cand_telefone
                );
                
                const vaga = new Vaga(
                    registro.vaga_codigo, 
                    registro.vaga_cargo, 
                    registro.vaga_salario, 
                    registro.vaga_cidade, 
                    registro.vaga_quantidade
                );
    
                listaInscricoes.push({
                    candidato: {
                        cpf: candidato.cpf,
                        nome: candidato.nome,
                        endereco: candidato.endereco,
                        telefone: candidato.telefone
                    },
                    vaga: {
                        codigo: vaga.codigo,
                        cargo: vaga.cargo,
                        salario: vaga.salario,
                        cidade: vaga.cidade,
                        quantidade: vaga.quantidade
                    },
                    dataInscricao: new Date (registro.data_inscricao).toLocaleDateString('pt-BR'),
                    horarioInscricao: registro.horario_inscricao
                });
            }
        }
    
        return listaInscricoes; 
    }
    
}