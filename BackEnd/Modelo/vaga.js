import VagaDAO from "../Persistencia/vagaDAO.js";

export default class Vaga {
    #codigo;
    #cargo;
    #salario;
    #cidade;
    #quantidade;

    constructor(codigo = 0, cargo = "", salario = 0, cidade = "", quantidade = 0) {
        this.#codigo = codigo;
        this.#cargo = cargo;
        this.#salario = salario;
        this.#cidade = cidade;
        this.#quantidade = quantidade;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get cargo() {
        return this.#cargo;
    }

    set cargo(novoCargo) {
        this.#cargo = novoCargo;
    }

    get salario() {
        return this.#salario;
    }

    set salario(novoSalario) {
        this.#salario = novoSalario;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(novaQuantidade) {
        this.#quantidade = novaQuantidade;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            cargo: this.#cargo,
            salario: this.#salario,
            cidade: this.#cidade,
            quantidade: this.#quantidade
        };
    }

    async gravar() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.gravar(this);
    }

    async excluir() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.excluir(this);
    }

    async alterar() {
        const vagaDAO = new VagaDAO();
        await vagaDAO.atualizar(this);
    }

    async consultar(termo) {
        const vagaDAO = new VagaDAO();
        return await vagaDAO.consultar(termo);
    }
}
