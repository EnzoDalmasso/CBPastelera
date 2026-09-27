"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import type { ImageAsset } from "@/lib/types";
import { useScrollLock } from "@/lib/use-scroll-lock";

type LightboxProps = {
  images: ImageAsset[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  return (
    <AnimatePresence>
      {index !== null && (
        <LightboxDialog
          key="lightbox"
          images={images}
          index={index}
          onClose={onClose}
          onNavigate={onNavigate}
        />
      )}
    </AnimatePresence>
  );
}

const SWIPE_THRESHOLD = 50;

const controlClass =
  "flex size-11 shrink-0 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-cream-50/20";

function LightboxDialog({ images, index, onClose, onNavigate }: LightboxProps & { index: number }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const image = images[index];
  const hasMultiple = images.length > 1;

  useScrollLock(true);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  if (!image) return null;

  const goTo = (offset: number) => {
    onNavigate((index + offset + images.length) % images.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") onClose();
    else if (event.key === "ArrowLeft" && hasMultiple) goTo(-1);
    else if (event.key === "ArrowRight" && hasMultiple) goTo(1);
    else if (event.key === "Tab") trapFocus(event, dialogRef.current);
  };

  const handleTouchEnd = (clientX: number | undefined) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || clientX === undefined || !hasMultiple) return;
    const distance = clientX - startX;
    if (Math.abs(distance) > SWIPE_THRESHOLD) goTo(distance < 0 ? 1 : -1);
  };

  const closeOnBackdrop = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <m.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onKeyDown={handleKeyDown}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX)}
      className="fixed inset-0 z-[60] flex flex-col bg-cocoa-950/95"
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        <p className="text-sm tabular-nums text-cream-100/80">
          {index + 1} / {images.length}
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className={controlClass}
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-4 sm:px-24" onClick={closeOnBackdrop}>
        <m.div
          key={image.src}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-full max-w-5xl"
          onClick={closeOnBackdrop}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-contain"
          />
        </m.div>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pb-6 pt-4 sm:justify-center sm:pb-8">
        {hasMultiple && (
          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Foto anterior"
            className={cn(controlClass, "sm:absolute sm:left-6 sm:top-1/2 sm:-translate-y-1/2")}
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
        )}
        <p className="max-w-md text-center text-sm text-cream-100/80" aria-live="polite">
          {image.alt}
        </p>
        {hasMultiple && (
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Foto siguiente"
            className={cn(controlClass, "sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2")}
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </m.div>
  );
}

function trapFocus(event: KeyboardEvent, container: HTMLElement | null) {
  const focusable = container?.querySelectorAll<HTMLElement>("button:not([disabled])");
  const first = focusable?.[0];
  const last = focusable?.[focusable.length - 1];
  if (!first || !last) return;

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
