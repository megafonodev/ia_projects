import EMDForm from "./components/EMDForm";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background mesh orbs */}
      <div
        className="mesh-orb"
        style={{
          width: "500px",
          height: "500px",
          top: "-150px",
          right: "-100px",
          background:
            "radial-gradient(circle, rgba(255,77,77,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="mesh-orb"
        style={{
          width: "600px",
          height: "600px",
          bottom: "-200px",
          left: "-150px",
          background:
            "radial-gradient(circle, rgba(174,154,214,0.07) 0%, transparent 70%)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="mesh-orb"
        style={{
          width: "350px",
          height: "350px",
          top: "40%",
          left: "60%",
          background:
            "radial-gradient(circle, rgba(26,7,71,0.3) 0%, transparent 70%)",
          animationDelay: "-8s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--emd-border)] bg-[var(--emd-surface)] px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--emd-text-muted)]">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--emd-primary)]"
              style={{ boxShadow: "0 0 6px var(--emd-primary)" }}
            />
            Esquemas de Medios Digitales
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--emd-text)] sm:text-4xl">
            Generador de{" "}
            <span className="bg-gradient-to-r from-[var(--emd-primary)] to-[var(--emd-secondary)] bg-clip-text text-transparent">
              contenido multimedia
            </span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--emd-text-muted)] sm:text-base">
            Completa el formulario para iniciar la generación automatizada de
            imágenes o vídeos.
          </p>
        </header>

        {/* Form card */}
        <div className="rounded-2xl border border-[var(--emd-border)] bg-[var(--emd-dark)]/60 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-10">
          <EMDForm />
        </div>

        {/* Footer */}
        <footer className="mt-10 flex items-center justify-center gap-4 text-xs text-[var(--emd-text-muted)]/50">
          <span>©2026 El Megáfono Digital. Todos los derechos reservados.</span>
          <a
            href="/api/logout"
            className="rounded-md border border-[var(--emd-border)] px-3 py-1 transition-colors hover:border-[var(--emd-primary)]/40 hover:text-[var(--emd-text-muted)]"
          >
            Cerrar sesión
          </a>
        </footer>
      </div>
    </div>
  );
}
