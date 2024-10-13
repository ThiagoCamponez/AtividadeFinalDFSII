import Candidato from '../Modelo/candidato.js';
import conectar from "./conexao.js";

export default class CandidatoDAO {

    async incluir(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = "INSERT INTO Candidato(cand_cpf, cand_nome, cand_endereco, cand_cidade, cand_telefone) VALUES (?, ?, ?, ?, ?)";
            const valores = [candidato.cpf, candidato.nome, candidato.endereco, candidato.cidade, candidato.telefone];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = "UPDATE Candidato SET cand_nome = ?, cand_endereco = ?, cand_cidade = ?, cand_telefone = ? WHERE cand_cpf = ?";
            const valores = [candidato.nome, candidato.endereco, candidato.cidade, candidato.telefone, candidato.cpf];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar();
            const sql = "DELETE FROM Candidato WHERE cand_cpf = ?";
            const valores = [candidato.cpf];
            await conexao.query(sql, valores);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Candidato WHERE cand_nome LIKE ? ORDER BY cand_nome";
        const valores = ['%' + termo + '%'];
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaCandidatos = [];
        for (const row of rows) {
            const candidato = new Candidato(row['cand_cpf'], row['cand_nome'], row['cand_endereco'], row['cand_cidade'], row['cand_telefone']);
            listaCandidatos.push(candidato);
        }
        return listaCandidatos;
    }

    async consultarCPF(cpf) {
        const conexao = await conectar();
        const sql = "SELECT * FROM Candidato WHERE cand_cpf = ?";
        const valores = [cpf];
        const [rows] = await conexao.query(sql, valores);
        global.poolConexoes.releaseConnection(conexao);
        const listaCandidatos = [];
        for (const row of rows) {
            const candidato = new Candidato(row['cand_cpf'], row['cand_nome'], row['cand_endereco'], row['cand_cidade'], row['cand_telefone']);
            listaCandidatos.push(candidato);
        }
        return listaCandidatos;
    }
}
