import { useState } from "react";
import { excluirProduto } from "../services/api";

export default function ModalExclusao({ produto, onCancelar, onExcluido }) {
    const [erro, setErro] = useState("");

    if (!produto) return null;

    async function confirmar() {
    setErro("");
    try {
        await excluirProduto(produto.id);
        onExcluido();
    } catch (e) {
        setErro(e.message);
    }
}

return (
        <div
            data-testid="modal-exclusao"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
            <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="text-lg font-semibold">Excluir produto</h3>
                <p data-testid="modal-exclusao-texto" className="mt-2 text-sm text-slate-400">
                Tem certeza que deseja excluir <strong>{produto.nome}</strong> ({produto.sku})?
                </p>

                {erro && <p data-testid="msg-erro-exclusao" className="mt-3 text-sm text-red-400">{erro}</p>}

                <div className="mt-6 flex justify-end gap-2">
                <button type="button" data-testid="btn-cancelar-exclusao" onClick={onCancelar} className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:bg-slate-800">
                    Cancelar
                </button>
                <button type="button" data-testid="btn-confirmar-exclusao" onClick={confirmar} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-400">
                    Excluir
                </button>
                </div>
            </div>
        </div>
    );
}