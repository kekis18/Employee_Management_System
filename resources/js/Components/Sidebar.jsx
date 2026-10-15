
import { Link, usePage } from '@inertiajs/react';

const iconBase = 'h-5 w-5';

function iconHome() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5M5 10.5V20h14v-9.5" />
        </svg>
    );
}

function iconUsers() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m16.5-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17 11a4 4 0 0 1 0 8" />
        </svg>
    );
}

function iconBuilding() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" />
        </svg>
    );
}

function iconBriefcase() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" />
        </svg>
    );
}

function iconCalendar() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase}>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path strokeLinecap="round" d="M8 3v4M16 3v4M3 10h18" />
        </svg>
    );
}

function iconClipboard() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconBase}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l1 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l1-2Zm-1 8h8M8 15h8" />
        </svg>
    );
}

export default function Sidebar() {
    const { auth, url } = usePage().props;
    const roles = auth?.user?.roles ?? [];

    const hasRole = (roleName) =>
        roles.some(
            (role) => (typeof role === 'string' ? role : role.name) === roleName
        );

    const isAdmin = hasRole('Admin');
    const isManager = hasRole('Manager');
    const canManage = isAdmin || isManager;
    const currentPath = url || '/dashboard';

    const navItems = [
        { label: 'Dashboard', href: '/dashboard', icon: iconHome(), visible: true },
        { label: 'Employees', href: '/employees', icon: iconUsers(), visible: canManage },
        { label: 'Departments', href: '/departments', icon: iconBuilding(), visible: canManage },
        { label: 'Positions', href: '/positions', icon: iconBriefcase(), visible: canManage },
        { label: 'Attendance Dashboard', href: '/attendance/admin', icon: iconCalendar(), visible: canManage },
        { label: 'Leave Requests Dashboard', href: '/leave-requests/admin', icon: iconClipboard(), visible: canManage },
        { label: 'My Attendance', href: '/attendance', icon: iconCalendar(), visible: !canManage },
        { label: 'My Leave Requests', href: '/leave-requests', icon: iconClipboard(), visible: !canManage },
    ].filter((item) => item.visible);

    return (
        <aside className="w-72 shrink-0 border-r border-slate-800/60 bg-slate-950 text-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.35)]">
            <div className="flex h-full flex-col p-5">
                <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                        EMS
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-200/80">Portal</p>
                        <h1 className="text-lg font-semibold text-white">Employee Suite</h1>
                    </div>
                </div>

                <nav className="space-y-1.5">
                    {navItems.map((item) => {
                        const active = currentPath === item.href || currentPath.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={[
                                    'group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200',
                                    active
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/15'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                                ].join(' ')}
                            >
                                <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Role</p>
                    <div className="mt-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200 ring-1 ring-inset ring-blue-400/30">
                        {isAdmin ? 'Admin' : isManager ? 'Manager' : 'Employee'}
                    </div>
                </div>
            </div>
        </aside>
    );
}
