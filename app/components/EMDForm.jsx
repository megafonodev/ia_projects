"use client";

import { useEffect, useState } from "react";
import {
  INITIAL_STATE,
  VIDEO_ASPECT_RATIOS,
  fileToBase64,
  getAspectRatiosForPlatform,
} from "./constants";
import { submitForm } from "../api/webhook";
import ModeToggle from "./ModeToggle";
import FormFields from "./FormFields";
import SuccessScreen from "./SuccessScreen";

const MAX_OUTPUTS = 4;
const VIDEO_MAX_OUTPUTS = 4;
const REFERENCE_IMAGE_MAX_SIZE_BYTES = 20 * 1024 * 1024;

export default function EMDForm() {
  const [mode, setMode] = useState("image");
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const getMaxOutputsForMode = (currentMode) =>
    currentMode === "video" ? VIDEO_MAX_OUTPUTS : MAX_OUTPUTS;

  useEffect(() => {
    setForm((prev) => {
      const next = { ...prev };
      let changed = false;

      const maxOutputs = getMaxOutputsForMode(mode);
      if (next.numberOfOutputs > maxOutputs) {
        next.numberOfOutputs = maxOutputs;
        changed = true;
      }

      const validAspectRatios =
        mode === "video"
          ? VIDEO_ASPECT_RATIOS
          : getAspectRatiosForPlatform(next.platform);

      if (!validAspectRatios.includes(next.aspectRatio)) {
        next.aspectRatio = validAspectRatios[0];
        changed = true;
      }

      if (mode === "video" && next.referenceImage && next.duration !== "8s") {
        next.duration = "8s";
        changed = true;
      }

      return changed ? next : prev;
    });
  }, [mode]);

  const set = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((prev) => {
      if (field === "numberOfOutputs") {
        const nextValue = Number(value);
        if (Number.isNaN(nextValue)) return prev;
        const maxOutputs = getMaxOutputsForMode(mode);
        return {
          ...prev,
          numberOfOutputs: Math.min(maxOutputs, nextValue),
        };
      }

      if (field === "duration" && mode === "video" && prev.referenceImage) {
        return { ...prev, duration: "8s" };
      }

      if (field === "platform") {
        if (mode === "video") {
          const aspectRatio = VIDEO_ASPECT_RATIOS.includes(prev.aspectRatio)
            ? prev.aspectRatio
            : VIDEO_ASPECT_RATIOS[0];
          return { ...prev, platform: value, aspectRatio };
        }

        const availableAspectRatios = getAspectRatiosForPlatform(value);
        const aspectRatio = availableAspectRatios.includes(prev.aspectRatio)
          ? prev.aspectRatio
          : availableAspectRatios[0];
        return { ...prev, platform: value, aspectRatio };
      }

      if (field !== "aspectRatio") {
        return { ...prev, [field]: value };
      }

      const validAspectRatios =
        mode === "video"
          ? VIDEO_ASPECT_RATIOS
          : getAspectRatiosForPlatform(prev.platform);
      return validAspectRatios.includes(value)
        ? { ...prev, aspectRatio: value }
        : prev;
    });
  };

  const handleFileChange = async (file) => {
    if (file.size > REFERENCE_IMAGE_MAX_SIZE_BYTES) {
      setError("La imagen de referencia no puede superar 20 MB.");
      return;
    }

    const base64 = await fileToBase64(file);
    setError("");
    setForm((prev) => ({
      ...prev,
      referenceImage: base64,
      referenceImageName: file.name,
      duration:
        mode === "video"
          ? "8s"
          : prev.duration,
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
        maxOutputs={getMaxOutputsForMode(mode)}
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
