export default function Input({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    error = '',
    name,
    id,
    ...props
}) {
    const inputId = id ?? name ?? label;

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-700">
                    {label}
                </label>
            )}

            <input
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={[
                    'w-full rounded-xl border bg-slate-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400',
                    error
                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                        : 'border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100',
                ].join(' ')}
                {...props}
            />

            {error && (
                <p className="mt-1.5 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
