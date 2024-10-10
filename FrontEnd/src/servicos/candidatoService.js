const urlBase = "http://localhost:4000/candidatos";

export async function gravarCandidato(candidato, token) {
    const resposta = await fetch(urlBase, 
        {
            method: "POST",
            headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
            credentials: 'include',
            body: JSON.stringify(candidato)
        });

    if (!resposta.ok) {
        throw new Error("Erro ao gravar candidato");
    }

    return await resposta.json();
}

export async function alterarCandidato(candidato, token) {
    const resposta = await fetch(urlBase, 
        {
            method: "PUT",
            headers: {
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
        credentials: 'include',
        body: JSON.stringify(candidato)
    });

    if (!resposta.ok) {
        throw new Error("Erro ao alterar candidato");
    }

    return await resposta.json();
}

export async function buscarTodosCandidatos(token) {
    const resposta = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Authorization": token
        },
        credentials: 'include'
    });

    if (!resposta.ok) {
        throw new Error("Erro ao buscar todos os candidatos");
    }

    return await resposta.json();
}

export async function buscarCandidatoPorNome(nome, token) {
    const resposta = await fetch(`${urlBase}?nome=${nome}`, {
        method: "GET",
        headers: {
            "Authorization": token
        },
    });

    if (!resposta.ok) {
        throw new Error("Erro ao buscar candidatos por nome");
    }

    return await resposta.json();
}

export async function consultarTodos(token) {
    const resposta = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Authorization": token
        },
        credentials: 'include'
    });

    if (!resposta.ok) {
        throw new Error("Erro ao consultar todos os candidatos");
    }

    return await resposta.json();
}

export async function excluir(candidato, token) {
    const resposta = await fetch(urlBase,
        {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
             },
            credentials: 'include',
            body: JSON.stringify(candidato)
        });
    return await resposta.json();
}
