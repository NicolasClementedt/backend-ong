// src/pages/items/components/ItemForm.tsx
import { useState, useEffect } from "react";
import { Categoria, type CreateItemDto, type Item } from "../../types";

interface Props {
  itemParaEditar?: Item | null;
  onSubmit: (dto: CreateItemDto) => void;
  onCancel: () => void;
}

const categorias = [
  { value: Categoria.ALIMENTO, label: "Alimento" },
  { value: Categoria.ROUPA, label: "Roupa" },
  { value: Categoria.HIGIENE, label: "Higiene" },
  { value: Categoria.BRINQUEDO, label: "Brinquedo" },
  { value: Categoria.LIMPEZA, label: "Limpeza" },
  { value: Categoria.OUTRO, label: "Outro" },
];

const unidades = ["kg", "g", "un", "L", "ml", "par", "cx", "pct"];

const estadoInicial: CreateItemDto = {
  nome: "",
  categoria: Categoria.ALIMENTO,
  unidadeMedida: "un",
  quantidadeMinima: 0,
};

export default function ItemForm({
  itemParaEditar,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<CreateItemDto>(estadoInicial);

  useEffect(() => {
    if (itemParaEditar) {
      setForm({
        nome: itemParaEditar.nome,
        categoria: itemParaEditar.categoria,
        unidadeMedida: itemParaEditar.unidadeMedida,
        quantidadeMinima: itemParaEditar.quantidadeMinima,
      });
    } else {
      setForm(estadoInicial);
    }
  }, [itemParaEditar]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: name === "quantidadeMinima" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-5">
          {itemParaEditar ? "Editar Item" : "Novo Item"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Ex: Arroz, Feijão..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categorias.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Unidade de medida */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unidade de Medida
            </label>
            <select
              name="unidadeMedida"
              value={form.unidadeMedida}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {unidades.map((un) => (
                <option key={un} value={un}>
                  {un}
                </option>
              ))}
            </select>
          </div>

          {/* Quantidade mínima */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade Mínima
            </label>
            <input
              name="quantidadeMinima"
              type="number"
              min={0}
              value={form.quantidadeMinima}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {itemParaEditar ? "Salvar" : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
