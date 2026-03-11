// src/pages/transactions/components/TransactionForm.tsx
import { useState, useEffect } from "react";
import {
  type CreateTransacaoDto,
  type Item,
  TipoTransacao,
  CategoriaDestino,
} from "../../types/index";
import { itemsService } from "../../services/items.service";

interface Props {
  itemPreSelecionado?: Item | null;
  onSubmit: (dto: CreateTransacaoDto) => void;
  onCancel: () => void;
}

const categoriasDestino = [
  { value: CategoriaDestino.FAMILIA, label: "Família" },
  { value: CategoriaDestino.EVENTO, label: "Evento" },
  { value: CategoriaDestino.PARCEIRO, label: "Parceiro" },
  { value: CategoriaDestino.OUTRO, label: "Outro" },
];

export default function TransactionForm({
  itemPreSelecionado,
  onSubmit,
  onCancel,
}: Props) {
  const [itens, setItens] = useState<Item[]>([]);
  const [form, setForm] = useState<CreateTransacaoDto>({
    itemId: itemPreSelecionado?.id ?? "",
    tipo: TipoTransacao.ENTRADA,
    quantidade: 0,
    observacao: "",
    categoriaDestino: undefined,
    descricaoDestino: "",
  });

  useEffect(() => {
    itemsService.getAll().then(setItens);
  }, []);

  useEffect(() => {
    if (itemPreSelecionado) {
      setForm((prev) => ({ ...prev, itemId: itemPreSelecionado.id }));
    }
  }, [itemPreSelecionado]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantidade" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      ...form,
      categoriaDestino:
        form.tipo === TipoTransacao.SAIDA ? form.categoriaDestino : undefined,
      descricaoDestino:
        form.tipo === TipoTransacao.SAIDA ? form.descricaoDestino : undefined,
    });
  }

  const isSaida = form.tipo === TipoTransacao.SAIDA;

  return (
    <div>
      <div>
        <h2>Nova Movimentação</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Item */}
          <div>
            <label>Item</label>
            <select
              name="itemId"
              value={form.itemId}
              onChange={handleChange}
              required
              disabled={!!itemPreSelecionado}
            >
              {itens.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome} ({item.quantidadeAtual} {item.unidadeMedida})
                </option>
              ))}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label>Tipo</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, tipo: TipoTransacao.ENTRADA }))
                }
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  form.tipo === TipoTransacao.ENTRADA
                    ? "bg-green-500 text-white border-green-500"
                    : "text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                ↓ Entrada
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({ ...prev, tipo: TipoTransacao.SAIDA }))
                }
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  form.tipo === TipoTransacao.SAIDA
                    ? "bg-red-500 text-white border-red-500"
                    : "text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                ↑ Saída
              </button>
            </div>
          </div>

          {/* Quantidade */}
          <div>
            <label>Quantidade</label>
            <input
              name="quantidade"
              type="number"
              min={1}
              value={form.quantidade}
              onChange={handleChange}
              required
            />
          </div>

          {/* Campos de saída */}
          {isSaida && (
            <>
              <div>
                <label>Categoria do Destino</label>
                <select
                  name="categoriaDestino"
                  value={form.categoriaDestino ?? ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  {categoriasDestino.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Descrição do Destino</label>
                <input
                  name="descricaoDestino"
                  value={form.descricaoDestino ?? ""}
                  onChange={handleChange}
                  placeholder="Ex: Família Silva, Evento de Natal..."
                />
              </div>
            </>
          )}

          {/* Observação */}
          <div>
            <label>Observação</label>
            <textarea
              name="observacao"
              value={form.observacao ?? ""}
              onChange={handleChange}
              rows={2}
              placeholder="Opcional..."
            />
          </div>

          {/* Botões */}
          <div>
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
