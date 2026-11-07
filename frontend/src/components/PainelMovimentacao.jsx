import { useEffect, useState } from "react";
import { registrarMovimentacao } from "../services/api";

export default function PainelMovimentacao({ produto, onMovimentacaoRegistrada }) {
    const [tipo, setTipo] = useState("ENTRADA");
    const [quantidade, setQuantidade] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [erro, setErro] = useState("");

    useEffect(() => {
        setSucesso("");
        setErro("");
    }, [produto?.id]);

    async function confirmar() {
        setSucesso("");
        setErro("");

        const qntd = Number(quantidade);
        if (! Number.isInteger(qntd) || qntd <= 0) {
            setErro("A quantidade deve ser um número inteiro positivo.");
            return;
        }

        try {
            await registrarMovimentacao({ produto_id: produto.id, tipo, quantidade: qntd });
            setSucesso("Movimentação registrada com sucesso.");
            setQuantidade("");
            onMovimentacaoRegistrada();
        } catch (error) {
            setErro(error.message);
        }
    }

    if (!produto) {
        return (
            <div data-testid="painel-movimentacao">
                <h3 className="text-lg font-semibold">Movimentar Estoque</h3>
                <p data-testid="msg-sem-selecao" className="mt-1 text-sm text-slate-500">Selecione um produto para registrar movimentações.</p>
            </div>
        )
    }
    return (
            <div data-testid="painel-movimentacao">
        <h3 className="font-semibold">Movimentar estoque</h3>

        <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
            <p data-testid="produto-selecionado-nome" className="font-medium">{produto.nome}</p>
            <p data-testid="produto-selecionado-sku" className="text-xs text-slate-500">{produto.sku}</p>
            <p data-testid="produto-selecionado-estoque" className="text-xs text-emerald-400">
                {produto.quantidade_estoque} em estoque
            </p>
        </div>

        <div className="mt-4 flex gap-1 rounded-lg bg-slate-950 p-1">
            <button 
                type="button" 
                data-testid="btn-tipo-entrada" 
                onClick={() => setTipo("ENTRADA")} 
                className={`flex-1 rounded-md px-3 py-2 text-sm ${ tipo === "ENTRADA" ? "bg-emerald-500 text-slate-950" : "text-slate-400"}`}
                >
                Entrada
            </button>

            <button 
                type="button" 
                data-testid="btn-tipo-saida" 
                onClick={() => setTipo("SAIDA")}
                className={`flex-1 rounded-md px-3 py-2 text-sm ${ tipo === "SAIDA" ? "bg-rose-500 text-slate-950" : "text-slate-400"}`}
                >
                Saída
            </button>
        </div>

        <label htmlFor="quantidade" className="mt-4 block text-sm text-slate-400">Quantidade</label>
        <input
            id="quantidade"
            type="number"
            min="1"
            data-testid="input-quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
        />

        {sucesso && <p data-testid="msg-sucesso" className="mt-3 text-sm text-emerald-400">{sucesso}</p>}
        {erro && <p data-testid="msg-erro" className="mt-3 text-sm text-red-400">{erro}</p>}

        <button
            type="button"
            data-testid="btn-confirmar-movimentacao"
            onClick={confirmar}
            className="mt-4 w-full rounded-lg bg-emerald-500 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400"
        >
            {tipo === "ENTRADA" ? "Confirmar entrada" : "Confirmar saída"}
        </button>
    </div>
    );
}