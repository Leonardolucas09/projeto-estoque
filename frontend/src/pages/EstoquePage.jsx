import { useEffect, useState } from "react";
import { listarProdutos, listarCategorias } from "../services/api";

export default function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [busca, setBusca] = useState("");
    const [categoria, setCategoria] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        listarCategorias().then(setCategorias).catch(() => setErro("Erro ao carregar a categoria"));
    }, []);

    useEffect(() => {
        listarProdutos({ busca, categoria })
            .then((dados) => { 
                setProdutos(dados);
                setErro("");
            })
            .catch(() => setErro("Erro ao carregar produtos"));
    }, [busca, categoria]);

    return (
        <div>         
            <input type="text" value={busca} onChange={ (e) => setBusca(e.target.value) } data-testid="input-busca"/>

            <select name="categoria" value={categoria} onChange={ (e) => setCategoria(e.target.value) } data-testid="select-categoria">
                <option value="">Todas as categorias</option>
                {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            {erro ? (
                <p data-testid="msg-erro-carregar">{erro}</p>
            ) : produtos.length === 0 ? (
                <p data-testid="msg-lista-vazia">Nenhum produto encontrado.</p>
            ) : (
                <table data-testid="tabela-produtos">
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Produto</th>
                            <th>Categoria</th>
                            <th>Preço Unitário</th>
                            <th>Estoque</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id} data-testid={`linha-produto-${produto.id}`}>
                                <td>{produto.sku}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.categoria}</td>
                                <td>{Number(produto.preco_unitario).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                <td>{produto.quantidade_estoque}</td>
                                <td>{produto.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}