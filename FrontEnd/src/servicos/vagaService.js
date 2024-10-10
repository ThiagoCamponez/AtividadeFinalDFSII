const urlBase = "http://localhost:4000/vagas";  

export async function gravarVaga(vaga, token) {
    const resposta = await fetch(urlBase,
        {
            method: "POST",
            headers: { 
                        "Content-Type": "application/json",
                        "Authorization": token
                     },
            credentials: 'include',
            body: JSON.stringify(vaga)
        });
    return await resposta.json();
}

export async function alterarVaga(vaga, token) {
    const url = `${urlBase}/${vaga.vaga_codigo}`; 
    const resposta = await fetch(url,
        {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
             },
            credentials: 'include',
            body: JSON.stringify(vaga)
        });
    return await resposta.json();
}

export async function consultarTodasVagas(token) {
    const resposta = await fetch(urlBase, 
        {
            method: "GET",
            headers: { 
                "Authorization": token
             },
             credentials: 'include'
        });
    return await resposta.json();
}


export async function excluir(vaga, token) {
    const resposta = await fetch(`http://localhost:4000/vagas/${vaga.codigo}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include'
    });

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
        throw new Error("Erro ao consultar todas as vagas");
    }

    return await resposta.json();
}