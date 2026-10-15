import { router, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const fullName = [user?.first_name, user?.middle_name, user?.last_name]
        .filter(Boolean)
        .join(' ');

    const role = user?.roles?.[0]?.name ?? user?.roles?.[0] ?? 'No Role';

    const logout = () => {
        router.post('/logout');
    };

    return (
        <header className="border-b border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Workspace</p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-900">Employee Management System</h2>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-blue-600 text-sm font-semibold text-white">
                            {(fullName || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-slate-800">{fullName || 'User'}</p>
                            <p className="text-xs text-slate-500">{role}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={logout}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
