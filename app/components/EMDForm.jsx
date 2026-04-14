"use client";

import { useState } from "react";
import { INITIAL_STATE, fileToBase64 } from "./constants";
import { submitForm } from "../api/webhook";
import ModeToggle from "./ModeToggle";
import FormFields from "./FormFields";
import SuccessScreen from "./SuccessScreen";

export default function EMDForm() {
  const [mode, setMode] = useState("image");
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = async (file) => {
    const base64 = await fileToBase64(file);
    setForm((prev) => ({
      ...prev,
      referenceImage: base64,
      referenceImageName: file.name,
    }));
  };

  const handleClearFile = () => {
    setForm((prev) => ({
      ...prev,
      referenceImage: null,
      referenceImageName: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await submitForm(mode, form);
      setSubmitted(true);
      setForm(INITIAL_STATE);
    } catch (err) {
      setError(`Error al enviar: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return <SuccessScreen mode={mode} onReset={() => setSubmitted(false)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Mode Toggle */}
      <ModeToggle mode={mode} setMode={setMode} />

      {/* Fields */}
      <FormFields
        mode={mode}
        form={form}
        set={set}
        onFileChange={handleFileChange}
        onClearFile={handleClearFile}
      />

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-[var(--emd-primary)]/30 bg-[var(--emd-primary)]/10 px-5 py-3 text-sm text-[var(--emd-primary)]">
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-shimmer emd-focus-ring cursor-pointer rounded-xl px-10 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_var(--emd-glow-primary)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="opacity-25"
                />
                <path
                  d="M4 12a8 8 0 018-8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="opacity-75"
                />
              </svg>
              Enviando...
            </span>
          ) : (
            `Generar ${mode === "image" ? "Imagen" : "Video"}`
          )}
        </button>
      </div>
    </form>
  );
}
