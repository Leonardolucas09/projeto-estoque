import { useState } from "react";
import { criarProduto, atualizarProduto } from "../services/api";

const VAZIO = {
    sku: "", nome: "", categoria: "",
    preco_unitario: "", quantidade_estoque: "", quantidade_minima: "",
};

export default function ModalProduto({ produto, categorias, onCancelar, onSalvo }) {
    const editando = produto !== null;

    const [form, setForm] = useState(
        editando
        ? {
            sku: produto.sku,
            nome: produto.nome,
            categoria: produto.categoria,
            preco_unitario: produto.preco_unitario.toString(),
            quantidade_estoque: produto.quantidade_estoque.toString(),
            quantidade_minima: produto.quantidade_minima.toString(),
            }
        : VAZIO
    );
    const [erro, setErro] = useState("");
    const [salvando, setSalvando] = useState(false);

    function alterar(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function salvar(e) {
        e.preventDefault();
        setErro("");
        setSalvando(true);

        const dados = {
        sku: form.sku.trim(),
        nome: form.nome.trim(),
        categoria: form.categoria.trim(),
        preco_unitario: Number(form.preco_unitario),
        quantidade_estoque: Number(form.quantidade_estoque),
        quantidade_minima: Number(form.quantidade_minima),
        };

        try {
        if (editando) {
            await atualizarProduto(produto.id, dados);
        } else {
            await criarProduto(dados);
        }
        onSalvo(editando ? "Produto atualizado com sucesso." : "Produto cadastrado com sucesso.");
        } catch (error) {
        setErro(error.message);
        } finally {
        setSalvando(false);
        }
    }

    return (
        <div data-testid="modal-produto" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <form onSubmit={salvar} noValidate className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 data-testid="titulo-modal-produto" className="text-lg font-semibold">
            {editando ? "Editar produto" : "Novo produto"}
            </h3>

            <label htmlFor="sku" className="mt-4 block text-sm text-slate-400">SKU</label>
            <input
                id="sku"
                name="sku"
                type="text"
                data-testid="input-sku"
                value={form.sku}
                onChange={alterar}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            
            <label htmlFor="nome" className="mt-4 block text-sm text-slate-400">Nome</label>
            <input
                id="nome"
                name="nome"
                type="text"
                data-testid="input-nome"
                value={form.nome}
                onChange={alterar}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            
            <label htmlFor="categoria" className="mt-4 block text-sm text-slate-400">Categoria</label>
            <input
                id="categoria"
                name="categoria"
                type="text"
                data-testid="input-categoria"
                value={form.categoria}
                onChange={alterar}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            
            <label htmlFor="preco_unitario" className="mt-4 block text-sm text-slate-400">Preço Unitário</label>
            <input
                id="preco_unitario"
                name="preco_unitario"
                type="number"
                data-testid="input-preco"
                value={form.preco_unitario}
                onChange={alterar}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            
            <label htmlFor="quantidade_estoque" className="mt-4 block text-sm text-slate-400">Estoque</label>
            <input
                id="quantidade_estoque"
                name="quantidade_estoque"
                type="number"
                data-testid="input-estoque"
                value={form.quantidade_estoque}
                onChange={alterar}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            
            <label htmlFor="quantidade_minima" className="mt-4 block text-sm text-slate-400">Quantidade Mínima</label>
            <input
                id="quantidade_minima"
                name="quantidade_minima"
                type="number"
                data-testid="input-minimo"
                value={form.quantidade_minima}
                onChange={alterar}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
            />
            
            {erro && <p data-testid="msg-erro-produto" className="mt-3 text-sm text-red-400">{erro}</p>}

            <div className="mt-6 flex justify-end gap-2">
            <button type="button" data-testid="btn-cancelar-produto" onClick={onCancelar} className="rounded-lg px-4 py-2 text-sm text-slate-400 hover:bg-slate-800">
                Cancelar
            </button>
            <button type="submit" data-testid="btn-salvar-produto" disabled={salvando} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-50">
                Salvar
            </button>
            </div>
        </form>
        </div>
    );
}