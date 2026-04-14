export default function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative flex rounded-full bg-[var(--emd-surface)] p-1 toggle-glow">
        <button
          type="button"
          onClick={() => setMode("image")}
          className={`relative z-10 rounded-full px-7 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${
            mode === "image"
              ? "text-white"
              : "text-[var(--emd-text-muted)] hover:text-[var(--emd-text)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Imagen
          </span>
        </button>
        <button
          type="button"
          onClick={() => setMode("video")}
          className={`relative z-10 rounded-full px-7 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${
            mode === "video"
              ? "text-white"
              : "text-[var(--emd-text-muted)] hover:text-[var(--emd-text)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            Video
          </span>
        </button>
        {/* Sliding pill */}
        <span
          className="absolute top-1 bottom-1 rounded-full bg-[var(--emd-primary)] transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{
            left: mode === "image" ? "4px" : "50%",
            width: "calc(50% - 4px)",
          }}
        />
      </div>
    </div>
  );
}
