function estoqueBaixo(produto) {
    return produto.quantidade_estoque < 5;
}

export default function TabelaProdutos({ 
    produtos, produtosSelecionadoId, onSelecionar, onEditar, onExcluir
}) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/50">
            <div className="border-b border-slate-800 px-6 py-4">
                <h2 className="font-semibold">Inventário de produtos</h2>
                <p data-testid="contador-produtos" className="text-xs text-slate-500">
                {produtos.length} produtos encontrados
                </p>
            </div>

            <table data-testid="tabela-produtos" className="w-full table-auto">
                <thead>
                    <tr className="text-xs uppercase tracking-wider text-slate-500">
                        <th className="px-6 py-3">SKU</th>
                        <th className="px-6 py-3">Produto</th>
                        <th className="px-6 py-3">Categoria</th>
                        <th className="px-6 py-3">Preço unitário</th>
                        <th className="px-6 py-3">Estoque</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr 
                            key={produto.id} 
                            data-testid={`linha-produto-${produto.id}`}
                            onClick={() => onSelecionar(produto)}
                            className={`cursor-pointer border-t border-slate-800 hover:bg-slate-800/50 ${
                                produto.id === produtosSelecionadoId ? "bg-slate-800/70" : ""
                            }`}
                        >
                            <td className="px-6 py-4 text-slate-400">{produto.sku}</td>
                            <td className="px-6 py-4 font-medium">{produto.nome}</td>
                            <td className="px-6 py-4 text-slate-400">{produto.categoria}</td>
                            <td className="px-6 py-4">{`R$ ${produto.preco_unitario}`}</td>
                            <td className="px-6 py-4">{produto.quantidade_estoque}</td>
                            <td className="px-6 py-4">
                                {estoqueBaixo(produto) ? (
                                    <span data-testid={`alert-estoque-baixo-${produto.id}`} className="rounded-full bg-red-500/15 px-2 py-1 text-xs text-red-400">
                                        Estoque Baixo
                                    </span>
                                ) : (
                                    <span data-testid={`status-em-dia-${produto.id}`} className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs text-emerald-400">
                                        Em Dia
                                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    type="button"
                                    data-testid={`btn-editar-${produto.id}`}
                                    onClick={(e) => { e.stopPropagation(); onEditar(produto); }}
                                    className="rounded-md px-2 py-1 text-xs text-slate-400 hover:bg-slate-700 hover:text-slate-100"
                                    >
                                    Editar
                                </button>

                                <button
                                    type="button"
                                    data-testid={`btn-excluir-${produto.id}`}
                                    onClick={(e) => { e.stopPropagation(); onExcluir(produto); }}
                                    className="ml-2 rounded-md px-2 py-1 text-xs text-red-400 hover:bg-red-700/20 hover:text-red-100"
                                    >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                ))}
                </tbody>
            </table> 
        </div>
    )
}