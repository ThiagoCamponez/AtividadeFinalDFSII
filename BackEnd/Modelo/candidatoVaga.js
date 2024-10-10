import CandidatoVagaDAO from "../Persistencia/candidatoVagaDAO.js";

export default class CandidatoVaga {
    #candCpf;
    #vagas;
    #dataInscricao;
    #horarioInscricao;

    constructor(candCpf, vagas, dataInscricao, horarioInscricao) {
        this.#candCpf = candCpf;
        this.#vagas = vagas; 
        this.#dataInscricao = dataInscricao;
        this.#horarioInscricao = horarioInscricao;
    }

    get candCpf() {
        return this.#candCpf;
    }

    set candCpf(novoCandCpf) {
        this.#candCpf = novoCandCpf;
    }

    get vagas() {
        return this.#vagas;
    }

    set vagas(novasVagas) {
        this.#vagas = novasVagas;
    }

    get dataInscricao() {
        return this.#dataInscricao;
    }

    set dataInscricao(novaDataInscricao) {
        this.#dataInscricao = novaDataInscricao;
    }

    get horarioInscricao() {
        return this.#horarioInscricao;
    }

    set horarioInscricao(novoHorarioInscricao) {
        this.#horarioInscricao = novoHorarioInscricao;
    }

    async gravar() {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        await candidatoVagaDAO.gravar(this);
    }


    async atualizar() {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        await candidatoVagaDAO.alterar(this);
    }

    async excluir() {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        await candidatoVagaDAO.excluir(this);
    }

    async consultar(termoBusca) {
        const candidatoVagaDAO = new CandidatoVagaDAO();
        const listaInscricoes = await candidatoVagaDAO.consultar(termoBusca);
        return listaInscricoes;
    }
}