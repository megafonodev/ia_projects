"use client";

import { useState, useRef, useCallback } from "react";

export default function FileUpload({ file, fileName, onFileChange, onClear }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const dropped = e.dataTransfer?.files?.[0];
      if (dropped && dropped.type.startsWith("image/")) onFileChange(dropped);
    },
    [onFileChange]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`group relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
        dragging
          ? "drop-zone-active"
          : file
          ? "border-[var(--emd-secondary)]/30 bg-[var(--emd-surface)]"
          : "border-[var(--emd-border)] bg-[var(--emd-surface)] hover:border-[var(--emd-secondary)]/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileChange(f);
        }}
      />
      {file ? (
        <div className="flex items-center justify-center gap-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--emd-secondary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="text-sm text-[var(--emd-text)]">{fileName}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="ml-2 rounded-md p-1 text-[var(--emd-text-muted)] transition hover:text-[var(--emd-primary)]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--emd-text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition group-hover:stroke-[var(--emd-secondary)]"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="text-sm text-[var(--emd-text-muted)] transition group-hover:text-[var(--emd-text)]">
            Arrastra una imagen o haz clic para subir
          </span>
          <span className="text-xs text-[var(--emd-text-muted)]/60">
            PNG, JPG, WEBP
          </span>
        </div>
      )}
    </div>
  );
}
