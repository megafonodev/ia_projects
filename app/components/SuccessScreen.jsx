export default function SuccessScreen({ mode, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--emd-primary)]/15">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--emd-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[var(--emd-text)]">
        Solicitud enviada
      </h2>
      <p className="max-w-md text-[var(--emd-text-muted)]">
        Tu solicitud de generación de{" "}
        {mode === "image" ? "imagen" : "video"} ha sido enviada
        correctamente. En breve, recibirá el resultado por correo electrónico.
      </p>
      <button
        onClick={onReset}
        className="mt-4 cursor-pointer rounded-xl bg-[var(--emd-surface)] px-8 py-3 text-sm font-semibold text-[var(--emd-secondary)] transition hover:bg-[var(--emd-surface-light)]"
      >
        Nueva solicitud
      </button>
    </div>
  );
}
