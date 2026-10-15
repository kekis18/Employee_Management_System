
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../Layouts/DashboardLayout';
import StatusBadge from '../Components/StatusBadge';

const colorStyles = {
    blue: {
        icon: 'bg-blue-50 text-blue-600',
        border: 'border-l-blue-500',
    },
    violet: {
        icon: 'bg-violet-50 text-violet-600',
        border: 'border-l-violet-500',
    },
    emerald: {
        icon: 'bg-emerald-50 text-emerald-600',
        border: 'border-l-emerald-500',
    },
    amber: {
        icon: 'bg-amber-50 text-amber-600',
        border: 'border-l-amber-500',
    },
};

const icons = {
    users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m16-13a4 4 0 0 1 0 8m4 5v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
        </svg>
    ),
    building: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 21h18M5 21V7l8-4v18m0-12h6v12M8 9v1m0 4v1m0 4v1m7-5h1m-1 4h1" />
        </svg>
    ),
    check: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                d="m5 12 4 4L19 6" />
        </svg>
    ),
    calendar: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="1.8" className="h-6 w-6">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
        </svg>
    ),
};

export default function Dashboard({
    statistics = [],
    recentEmployees = [],
    systemOverview = {},
}) {
    const overview = [
        {
            title: 'Attendance Rate',
            value: `${systemOverview.attendanceRate ?? 0}%`,
            description: 'Checked-in employees compared with active employees',
            color: 'bg-emerald-500',
        },
        {
            title: 'Active Employees',
            value: systemOverview.activeEmployees ?? 0,
            description: 'Employees currently marked active',
            color: 'bg-blue-500',
        },
        {
            title: 'Pending Requests',
            value: systemOverview.pendingRequests ?? 0,
            description: 'Leave applications awaiting review',
            color: 'bg-amber-500',
        },
    ];

    return (
        <DashboardLayout>
            <Head title="Admin Dashboard" />

            <div className="min-h-screen space-y-8 bg-gray-50/50 p-1">

                {/* Header */}
                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Employee Management System
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                            Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Monitor your workforce and manage daily operations.
                        </p>
                    </div>

                </section>

                {/* Statistics */}
                <section>
                    <div className="mb-4">
                        <h2 className="text-lg font-bold text-gray-900">
                            At a Glance
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Current statistics from your employee records
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {statistics.map((stat) => {
                            const style = colorStyles[stat.color] ?? colorStyles.blue;

                            return (
                                <div
                                    key={stat.title}
                                    className={`rounded-2xl border border-gray-200 border-l-4 ${style.border} bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">
                                                {stat.title}
                                            </p>

                                            <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                                {stat.value}
                                            </p>
                                        </div>

                                        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${style.icon}`}>
                                            {icons[stat.icon] ?? icons.users}
                                        </div>
                                    </div>

                                    <p className="mt-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
                                        {stat.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Employees and Quick Actions */}
                <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    {/* Recent Employees */}
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm xl:col-span-2">
                        <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Recent Employees
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Latest employee records in your system
                                </p>
                            </div>

                            <Link
                                href="/employees"
                                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                            >
                                View all employees →
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/80">
                                        <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Employee
                                        </th>
                                        <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Department
                                        </th>
                                        <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Position
                                        </th>
                                        <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {recentEmployees.length > 0 ? (
                                        recentEmployees.map((employee) => (
                                            <tr
                                                key={employee.id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                                                            {employee.initials || '?'}
                                                        </div>

                                                        <span className="text-sm font-semibold text-gray-800">
                                                            {employee.name}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {employee.department}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {employee.position}
                                                </td>

                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <StatusBadge status={employee.status} />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="px-6 py-12 text-center"
                                            >
                                                <p className="font-medium text-gray-700">
                                                    No employees found
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    Employee records will appear here after they are created.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="border-t border-gray-100 px-6 py-4">
                            <p className="text-xs text-gray-400">
                                Showing the five most recently created employee records.
                            </p>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="border-b border-gray-100 px-6 py-5">
                            <h2 className="text-lg font-bold text-gray-900">
                                Quick Actions
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Common administrative tasks
                            </p>
                        </div>

                        <div className="space-y-2 p-4">
                            <Link
                                href="/employees/create"
                                className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-gray-50"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-600">
                                    +
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                                        Add Employee
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Register a new employee
                                    </p>
                                </div>
                                <span className="text-lg text-gray-300 group-hover:text-blue-600">
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/departments"
                                className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-gray-50"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl font-bold text-violet-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="1.8" className="h-5 w-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M3 21h18M5 21V7l8-4v18m0-12h6v12" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                                        Departments
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Manage organizational units
                                    </p>
                                </div>
                                <span className="text-lg text-gray-300 group-hover:text-blue-600">
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/attendance/admin"
                                className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-gray-50"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl font-bold text-emerald-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="1.8" className="h-5 w-5">
                                        <circle cx="12" cy="12" r="9" />
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 7v5l3 2" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                                        Attendance
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Monitor daily attendance
                                    </p>
                                </div>
                                <span className="text-lg text-gray-300 group-hover:text-blue-600">
                                    →
                                </span>
                            </Link>

                            <Link
                                href="/leave-requests/admin"
                                className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-gray-50"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl font-bold text-amber-600">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="1.8" className="h-5 w-5">
                                        <rect x="4" y="4" width="16" height="17" rx="2" />
                                        <path strokeLinecap="round" d="M8 2v4m8-4v4M4 9h16m-11 4h6m-6 4h4" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                                        Leave Requests
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Review employee applications
                                    </p>
                                </div>
                                <span className="text-lg text-gray-300 group-hover:text-blue-600">
                                    →
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* System Overview */}
                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-100 px-6 py-5">
                        <h2 className="text-lg font-bold text-gray-900">
                            System Overview
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Workforce indicators calculated from your records
                        </p>
                    </div>

                    <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                        {overview.map((item) => (
                            <div key={item.title} className="p-6">
                                <div className="flex items-center gap-2">
                                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                                    <p className="text-sm font-medium text-gray-500">
                                        {item.title}
                                    </p>
                                </div>

                                <p className="mt-3 text-3xl font-bold text-gray-900">
                                    {item.value}
                                </p>

                                <p className="mt-2 text-xs leading-5 text-gray-400">
                                    {item.description}
                                </p>

                                {item.title === 'Pending Requests' && (
                                    <Link
                                        href="/leave-requests/admin"
                                        className="mt-3 inline-flex text-xs font-semibold text-blue-600 hover:text-blue-800"
                                    >
                                        Review requests →
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="pb-4 text-center text-xs text-gray-400">
                    Employee Management System · Admin Dashboard
                </footer>
            </div>
        </DashboardLayout>
    );
}
