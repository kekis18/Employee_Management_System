export default function Button({
    children,
    type = 'button',
    onClick,
    variant = 'primary',
    disabled = false,
    className = '',
}) {
    const styles = {
        primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500',
        secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
        danger: 'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/15',
        success: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/15',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={[
                'inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-70',
                styles[variant] ?? styles.primary,
                className,
            ].join(' ')}
        >
            {children}
        </button>
    );
}
