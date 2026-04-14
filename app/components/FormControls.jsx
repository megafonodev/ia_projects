export function FieldGroup({ label, htmlFor, required, children, delay = 0 }) {
  return (
    <div className="field-animate" style={{ animationDelay: `${delay}ms` }}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium text-[var(--emd-secondary)]"
      >
        {label}
        {required && <span className="ml-1 text-[var(--emd-primary)]">*</span>}
      </label>
      {children}
    </div>
  );
}

export function TextInput({ id, placeholder, value, onChange, required }) {
  return (
    <input
      id={id}
      name={id}
      type="text"
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="emd-focus-ring w-full rounded-xl border border-[var(--emd-border)] bg-[var(--emd-surface)] px-4 py-3 text-sm text-[var(--emd-text)] placeholder-[var(--emd-text-muted)] transition-all duration-200 hover:border-[var(--emd-secondary)]/30 focus:border-[var(--emd-primary)]/50 focus:bg-[var(--emd-surface-light)]"
    />
  );
}

export function TextArea({ id, placeholder, value, onChange, required, rows = 3 }) {
  return (
    <textarea
      id={id}
      name={id}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="emd-focus-ring w-full rounded-xl border border-[var(--emd-border)] bg-[var(--emd-surface)] px-4 py-3 text-sm text-[var(--emd-text)] placeholder-[var(--emd-text-muted)] transition-all duration-200 hover:border-[var(--emd-secondary)]/30 focus:border-[var(--emd-primary)]/50 focus:bg-[var(--emd-surface-light)] resize-y"
    />
  );
}

export function Select({ id, value, onChange, options, placeholder, required }) {
  return (
    <select
      id={id}
      name={id}
      required={required}
      value={value}
      onChange={onChange}
      className="emd-focus-ring w-full cursor-pointer appearance-none rounded-xl border border-[var(--emd-border)] bg-[var(--emd-surface)] px-4 py-3 text-sm text-[var(--emd-text)] transition-all duration-200 hover:border-[var(--emd-secondary)]/30 focus:border-[var(--emd-primary)]/50 focus:bg-[var(--emd-surface-light)]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23AE9AD6' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 16px center",
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const display = typeof opt === "string" ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {display}
          </option>
        );
      })}
    </select>
  );
}

export function PillSelector({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
            value === opt
              ? "border-[var(--emd-primary)] bg-[var(--emd-primary)]/15 text-[var(--emd-primary)] shadow-[0_0_12px_var(--emd-glow-primary)]"
              : "border-[var(--emd-border)] bg-[var(--emd-surface)] text-[var(--emd-text-muted)] hover:border-[var(--emd-secondary)]/30 hover:text-[var(--emd-text)]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function NumberStepper({ id, value, onChange, min = 1, max = 10 }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[var(--emd-border)] bg-[var(--emd-surface)] text-[var(--emd-secondary)] transition hover:border-[var(--emd-primary)] hover:text-[var(--emd-primary)]"
      >
        <svg width="14" height="2" viewBox="0 0 14 2" fill="currentColor">
          <rect width="14" height="2" rx="1" />
        </svg>
      </button>
      <span className="min-w-[2.5rem] text-center font-mono text-lg font-bold text-[var(--emd-text)]">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[var(--emd-border)] bg-[var(--emd-surface)] text-[var(--emd-secondary)] transition hover:border-[var(--emd-primary)] hover:text-[var(--emd-primary)]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="currentColor"
        >
          <rect y="6" width="14" height="2" rx="1" />
          <rect x="6" width="2" height="14" rx="1" />
        </svg>
      </button>
    </div>
  );
}
