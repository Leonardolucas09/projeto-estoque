const API_URL = "http://localhost:8000/api";

export async function listarProdutos({ busca="", categoria="" } = {}) {
    const params = new URLSearchParams();
    
    if (busca) {
        params.set("busca", busca);
    }
    
    if (categoria) {
        params.set("categoria", categoria);
    }

    const response = await fetch(`${API_URL}/produtos?${params}`);

    if (! response.ok) {
        throw new Error("Erro ao listar os produtos.");
    }

    return response.json();
}

export async function listarCategorias() {

    const response = await fetch(`${API_URL}/produtos/categorias`);

    if (! response.ok) {
        throw new Error("Erro ao listar as categorias.")
    }

    return response.json();
}

export async function registrarMovimentacao({ produto_id, tipo, quantidade }) {
            const response = await fetch(`${API_URL}/movimentacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ produto_id, tipo, quantidade })
    });

    if (! response.ok) {
        const corpo = await response.json().catch(() => null);
        throw new Error(extrairMensagem(corpo));
    }
    return response.json();
}

export async function criarProduto(dados) {
    const response = await fetch(`${API_URL}/produtos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    if (! response.ok) {
        const corpo = await response.json().catch(() => null);
        throw new Error(extrairMensagem(corpo));
    }
    return response.json();
}

export async function atualizarProduto(id, dados) {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    if (! response.ok) {
        const corpo = await response.json().catch(() => null);
        throw new Error(extrairMensagem(corpo));
    }
    return response.json();
}

export async function excluirProduto(id) {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: "DELETE"
    });

    if (! response.ok) {
        const corpo = await response.json().catch(() => null);
        throw new Error(extrairMensagem(corpo));
    }
}


function extrairMensagem(corpo) {
    const detalhe = corpo?.detail;
    if (typeof detalhe === "string") {
        return detalhe;
    }
    if (Array.isArray(detalhe)) {
        return detalhe[0]?.msg ?? "Erro ao registrar a movimentação.";
    }
    return "Erro ao registrar a movimentação.";
}