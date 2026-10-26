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