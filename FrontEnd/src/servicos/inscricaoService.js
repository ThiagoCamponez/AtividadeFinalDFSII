const urlBase = "http://localhost:4000/inscricoes";  

export async function gravarInscricao(inscricao, token) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include',
        body: JSON.stringify(inscricao)
    });
    return await resposta.json();
}

export async function buscarTodasInscricoes(token) {
    const resposta = await fetch(urlBase, {
        method: "GET",
        headers: {
            "Authorization": token
        },
        credentials: 'include'
    });
    return await resposta.json();
}

export async function excluirInscricao(inscricao, token) {
    const cpf = inscricao.candidato.cpf; 
    const vagaCodigo = inscricao.vaga.codigo; 

    const resposta = await fetch(`${urlBase}/${cpf}/${vagaCodigo}`, { 
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include'
    });

    return await resposta.json();
}