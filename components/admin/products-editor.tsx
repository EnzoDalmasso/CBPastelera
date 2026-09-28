"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Card, ImageField, ItemControls, PLACEHOLDER_IMAGE, TextField } from "@/components/admin/fields";
import { move, removeAt, replaceAt, slugify } from "@/lib/admin/list";
import type { Category, Product, SiteContent } from "@/lib/content/types";

type ProductsEditorProps = {
  value: SiteContent["products"];
  onChange: (value: SiteContent["products"]) => void;
};

const addButtonClass =
  "inline-flex h-10 items-center gap-1.5 rounded-full bg-cocoa-800 px-4 text-sm font-semibold text-cream-50 hover:bg-cocoa-900";

export function ProductsEditor({ value, onChange }: ProductsEditorProps) {
  return (
    <>
      <Card title="Encabezado">
        <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Título" value={value.title} maxLength={80} onChange={(title) => onChange({ ...value, title })} />
        <TextField label="Texto" rows={3} value={value.text} maxLength={300} onChange={(text) => onChange({ ...value, text })} />
      </Card>
      <CategoriesEditor value={value} onChange={onChange} />
      <ProductList value={value} onChange={onChange} />
    </>
  );
}

function CategoriesEditor({ value, onChange }: ProductsEditorProps) {
  const { categories, items } = value;
  const [draft, setDraft] = useState("");

  function addCategory() {
    const name = draft.trim();
    const base = slugify(name) || "categoria";
    if (!name) return;
    let id = base;
    for (let n = 2; categories.some((category) => category.id === id); n++) id = `${base}-${n}`;
    onChange({ ...value, categories: [...categories, { id, name }] });
    setDraft("");
  }

  function removeCategory(category: Category, index: number) {
    const used = items.filter((item) => item.category === category.id).length;
    if (used > 0) {
      window.alert(`"${category.name}" tiene ${used} producto(s). Cambialos de categoría antes de eliminarla.`);
      return;
    }
    onChange({ ...value, categories: removeAt(categories, index) });
  }

  return (
    <Card title="Categorías">
      <p className="text-sm text-cocoa-600">
        Son los filtros del catálogo (el filtro &quot;Todos&quot; se agrega solo). Las categorías sin productos no se muestran.
      </p>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li key={category.id} className="flex items-end gap-2">
            <div className="flex-1">
              <TextField
                label={`Categoría ${index + 1}`}
                value={category.name}
                maxLength={40}
                onChange={(name) => onChange({ ...value, categories: replaceAt(categories, index, { ...category, name }) })}
              />
            </div>
            <ItemControls
              index={index}
              total={categories.length}
              itemLabel={`la categoría ${category.name}`}
              onMove={(offset) => onChange({ ...value, categories: move(categories, index, offset) })}
              onRemove={() => removeCategory(category, index)}
            />
          </li>
        ))}
      </ul>
      {categories.length < 20 && (
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <TextField label="Nueva categoría" value={draft} maxLength={40} onChange={setDraft} placeholder="Ej: Tartas" />
          </div>
          <button type="button" onClick={addCategory} disabled={!draft.trim()} className={`${addButtonClass} disabled:opacity-40`}>
            <Plus className="size-4" aria-hidden="true" />
            Agregar
          </button>
        </div>
      )}
    </Card>
  );
}

function ProductList({ value, onChange }: ProductsEditorProps) {
  const { categories, items } = value;
  const [openId, setOpenId] = useState<string | null>(null);

  function addProduct() {
    const firstCategory = categories[0];
    if (!firstCategory) {
      window.alert("Primero creá al menos una categoría.");
      return;
    }
    const product: Product = {
      id: crypto.randomUUID(),
      name: "Nuevo producto",
      category: firstCategory.id,
      description: "",
      image: { src: PLACEHOLDER_IMAGE, alt: "" },
      price: null,
    };
    onChange({ ...value, items: [...items, product] });
    setOpenId(product.id);
  }

  const update = (index: number, product: Product) => onChange({ ...value, items: replaceAt(items, index, product) });

  return (
    <Card
      title={`Productos (${items.length})`}
      actions={
        items.length < 60 && (
          <button type="button" onClick={addProduct} className={addButtonClass}>
            <Plus className="size-4" aria-hidden="true" />
            Agregar
          </button>
        )
      }
    >
      {items.map((product, index) => {
        const open = openId === product.id;
        const category = categories.find((c) => c.id === product.category);
        return (
          <div key={product.id} className="rounded-xl border border-cocoa-900/10 bg-white/60">
            <div className="flex items-center gap-3 p-3">
              <button
                type="button"
                onClick={() => setOpenId(open ? null : product.id)}
                aria-expanded={open}
                className="min-w-0 flex-1 text-left"
              >
                <span className="block truncate font-semibold">{product.name || "Sin nombre"}</span>
                <span className="block text-xs text-cocoa-500">
                  {category?.name ?? "Sin categoría"} · {open ? "Cerrar" : "Editar"}
                </span>
              </button>
              <ItemControls
                index={index}
                total={items.length}
                itemLabel={`"${product.name}"`}
                onMove={(offset) => onChange({ ...value, items: move(items, index, offset) })}
                onRemove={() => onChange({ ...value, items: removeAt(items, index) })}
              />
            </div>

            {open && (
              <div className="space-y-4 border-t border-cocoa-900/10 p-3 sm:p-4">
                <TextField label="Nombre" value={product.name} maxLength={80} onChange={(name) => update(index, { ...product, name })} />
                <div>
                  <label htmlFor={`category-${product.id}`} className="text-sm font-medium text-cocoa-800">
                    Categoría
                  </label>
                  <select
                    id={`category-${product.id}`}
                    value={product.category}
                    onChange={(event) => update(index, { ...product, category: event.target.value })}
                    className="mt-1.5 h-11 w-full rounded-xl border border-cocoa-900/15 bg-white px-3 text-base"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <TextField
                  label="Descripción"
                  rows={3}
                  maxLength={300}
                  value={product.description}
                  onChange={(description) => update(index, { ...product, description })}
                />
                <TextField
                  label="Precio en pesos (opcional)"
                  type="number"
                  hint="Dejalo vacío para mostrar solo el botón Consultar."
                  value={product.price === null ? "" : String(product.price)}
                  maxLength={10}
                  onChange={(raw) => {
                    const digits = raw.replace(/\D/g, "");
                    update(index, { ...product, price: digits ? Number(digits) : null });
                  }}
                />
                <ImageField label="Foto" folder="products" value={product.image} onChange={(image) => update(index, { ...product, image })} />
              </div>
            )}
          </div>
        );
      })}
    </Card>
  );
}
