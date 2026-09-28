"use client";

import { ArrowDown, ArrowUp, ImageUp, LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { createContext, useContext, useId, useState, type ReactNode } from "react";
import { uploadImage } from "@/lib/admin/upload-image";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/types";

export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const AdminModeContext = createContext({ previewOnly: false });

const inputClass =
  "mt-1.5 w-full rounded-xl border border-cocoa-900/15 bg-white px-3.5 text-base text-cocoa-900 outline-none transition-colors focus:border-cocoa-700";

export function Card({ title, children, actions }: { title?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="rounded-[1.25rem] bg-cream-50 p-4 shadow-soft ring-1 ring-cocoa-900/5 sm:p-6">
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-display text-2xl font-medium">{title}</h2>}
          {actions}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  rows?: number;
  hint?: string;
  type?: "text" | "url" | "number";
  placeholder?: string;
};

export function TextField({ label, value, onChange, maxLength = 200, rows, hint, type = "text", placeholder }: TextFieldProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-cocoa-800">
        {label}
        {rows && (
          <span className="text-xs font-normal text-cocoa-500">
            {value.length}/{maxLength}
          </span>
        )}
      </label>
      {rows ? (
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputClass, "resize-y py-2.5 leading-relaxed")}
        />
      ) : (
        <input
          id={id}
          type={type}
          inputMode={type === "number" ? "numeric" : undefined}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={cn(inputClass, "h-11")}
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-cocoa-500">{hint}</p>}
    </div>
  );
}

type ImageFieldProps = {
  label: string;
  value: ImageAsset;
  onChange: (value: ImageAsset) => void;
  folder: string;
  aspect?: "portrait" | "square";
};

export function ImageField({ label, value, onChange, folder, aspect = "portrait" }: ImageFieldProps) {
  return (
    <div>
      {label && <p className="mb-1.5 text-sm font-medium text-cocoa-800">{label}</p>}
      <div className="flex gap-4">
        <div
          className={cn(
            "relative w-28 shrink-0 overflow-hidden rounded-xl bg-cream-200 sm:w-36",
            aspect === "portrait" ? "aspect-[4/5]" : "aspect-square",
          )}
        >
          <Image src={value.src} alt="" fill sizes="144px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1 space-y-3">
          <UploadButton
            folder={folder}
            label="Cambiar foto"
            onUploaded={(src) => onChange({ ...value, src })}
          />
          <TextField
            label="Descripción de la foto"
            hint="Ayuda a la accesibilidad y a Google."
            value={value.alt}
            maxLength={200}
            onChange={(alt) => onChange({ ...value, alt })}
          />
        </div>
      </div>
    </div>
  );
}

type UploadButtonProps = {
  folder: string;
  label: string;
  onUploaded: (src: string) => void;
  variant?: "outline" | "solid";
};

export function UploadButton({ folder, label, onUploaded, variant = "outline" }: UploadButtonProps) {
  const { previewOnly } = useContext(AdminModeContext);
  const [status, setStatus] = useState<"idle" | "uploading">("idle");
  const [error, setError] = useState("");
  const id = useId();

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setStatus("uploading");
    setError("");
    try {
      onUploaded(await uploadImage(file, folder));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No se pudo subir la imagen.");
    } finally {
      setStatus("idle");
    }
  }

  const disabled = previewOnly || status === "uploading";

  return (
    <div>
      <label
        htmlFor={id}
        aria-disabled={disabled}
        className={cn(
          "inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-caramel-500",
          variant === "solid"
            ? "bg-cocoa-800 text-cream-50 hover:bg-cocoa-900"
            : "border border-cocoa-900/15 bg-white text-cocoa-900 hover:border-cocoa-900/40",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        {status === "uploading" ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <ImageUp className="size-4" aria-hidden="true" />
        )}
        {status === "uploading" ? "Subiendo…" : label}
        <input
          id={id}
          type="file"
          accept="image/*"
          disabled={disabled}
          className="sr-only"
          onChange={(event) => {
            void handleFile(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </label>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

type ItemControlsProps = {
  index: number;
  total: number;
  onMove: (offset: -1 | 1) => void;
  onRemove: () => void;
  itemLabel: string;
};

export function ItemControls({ index, total, onMove, onRemove, itemLabel }: ItemControlsProps) {
  const buttonClass =
    "flex size-9 items-center justify-center rounded-full border border-cocoa-900/10 bg-white text-cocoa-700 transition-colors hover:border-cocoa-900/40 disabled:opacity-30";

  return (
    <div className="flex shrink-0 gap-1.5">
      <button type="button" onClick={() => onMove(-1)} disabled={index === 0} aria-label={`Subir ${itemLabel}`} className={buttonClass}>
        <ArrowUp className="size-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} aria-label={`Bajar ${itemLabel}`} className={buttonClass}>
        <ArrowDown className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => {
          if (window.confirm(`¿Eliminar ${itemLabel}?`)) onRemove();
        }}
        aria-label={`Eliminar ${itemLabel}`}
        className={cn(buttonClass, "text-red-700")}
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
