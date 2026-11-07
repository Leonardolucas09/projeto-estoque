import { useEffect, useState } from "react";
import { listarProdutos, listarCategorias } from "../services/api";
import Cabecalho from "../components/Cabecalho";
import TabelaProdutos from "../components/TabelaProdutos";
import PainelMovimentacao from "../components/PainelMovimentacao";

export default function ProdutosPage() {
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [busca, setBusca] = useState("");
    const [categoria, setCategoria] = useState("");
    const [erro, setErro] = useState("");
    const [idSelecionado, setIdSelecionado] = useState(null);
    const produtoSelecionado = produtos.find((p) => p.id === idSelecionado) ?? null;
    const [versao, setVersao] = useState(0);
    const recarregar = () => setVersao((v) => v + 1);

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
    }, [busca, categoria, versao]);

    return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
        <Cabecalho
            busca={busca}
            onBuscaChange={setBusca}
            categoria={categoria}
            onCategoriaChange={setCategoria}
            categorias={categorias}
            onNovoProduto={() => {}}
        />

        <main className="mx-auto max-w-350 px-6 py-8">
            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                    Visão geral
                </p>
                <h2 className="text-2xl font-bold">Gestão de estoque</h2>
                <p className="text-sm text-slate-400">
                    Acompanhe produtos, níveis de estoque e movimentações.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                <section>
                    {erro ? (
                        <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
                            <p data-testid="msg-erro-carregar" className="text-red-400">
                                {erro}
                            </p>
                        </div>
                    ) : produtos.length === 0 ? (
                        <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-6 py-16 text-center">
                            <p data-testid="msg-lista-vazia" className="text-slate-400">
                                Nenhum produto encontrado.
                            </p>
                        </div>
                    ) : (
                        <TabelaProdutos
                            produtos={produtos}
                            produtoSelecionadoId={idSelecionado}
                            onSelecionar={(p) => setIdSelecionado(p.id)}
                            onEditar={() => {}}
                            onExcluir={() => {}}
                        />
                    )}
                </section>

                <aside className="self-start rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <PainelMovimentacao produto={produtoSelecionado} onMovimentacaoRegistrada={recarregar} />
                </aside>
            </div>
        </main>
    </div>
);
}