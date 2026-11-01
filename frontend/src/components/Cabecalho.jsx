import Caixas from "../icons/Caixas";

export default function Cabecalho({
    busca,
    onBuscaChange,
    categoria,
    onCategoriaChange,
    categorias,
    onNovoProduto,
}) {
    return (
        <header className="border-b border-slate-800">
            <div className="mx-auto flex max-w-350 flex-wrap items-center gap-4 px-6 py-3">
                <div className="color-slate-900 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                    <Caixas />
                </div>
            <div>
                <p className="font-semibold">Controle de Estoque</p>
                <p className="text-sm text-slate-500">
                    Gerencie seus produtos de forma eficiente
                </p>
            </div>

            <input
                type="text"
                data-testid="input-busca"
                placeholder="Buscar por produto ou SKU..."
                value={busca}
                onChange={(e) => onBuscaChange(e.target.value)}
                className="min-w-50 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
            />

            <select
                data-testid="select-categoria"
                value={categoria}
                onChange={(e) => onCategoriaChange(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
            >
                <option value="">Todas as categorias</option>
                {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                    {cat}
                    </option>
                ))}
            </select>

            <button
                type="button"
                data-testid="btn-novo-produto"
                onClick={onNovoProduto}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400"
            >
                + Novo Produto
            </button>
            </div>
        </header>
    );
}
