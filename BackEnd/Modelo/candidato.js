import CandidatoDAO from '../Persistencia/CandidatoDAO.js';

export default class Candidato {

    #cpf;  
    #nome;
    #endereco;
    #cidade;
    #telefone;

    constructor(cpf, nome, endereco, cidade, telefone) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#telefone = telefone;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        if (novoNome != "") 
            this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    toJSON() {
        return {
            "cpf": this.#cpf,
            "nome": this.#nome,
            "endereco": this.#endereco,
            "cidade": this.#cidade,
            "telefone": this.#telefone
        }
    }

    async gravar() {
        const candidatoDAO = new CandidatoDAO();
        await candidatoDAO.incluir(this);
    }

    async atualizar() {
        const candidatoBD = new CandidatoDAO();
        await candidatoBD.alterar(this);
    }

    async removerDoBancoDados() {
        const candidatoBD = new CandidatoDAO();
        await candidatoBD.excluir(this);
    }

    async consultar(termo) {
        const candidatoBD = new CandidatoDAO();
        const candidatos = await candidatoBD.consultar(termo);
        return candidatos;
    }

    async consultarCPF(cpf) {
        const candidatoBD = new CandidatoDAO();
        const candidatos = await candidatoBD.consultarCPF(cpf);
        return candidatos;
    }
}
