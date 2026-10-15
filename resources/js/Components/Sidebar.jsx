
import { Link, usePage } from '@inertiajs/react';

export default function Sidebar() {
    const { auth } = usePage().props;

    const roles = auth?.user?.roles ?? [];

    const hasRole = (roleName) =>
        roles.some(
            (role) =>
                (typeof role === 'string' ? role : role.name) === roleName
        );

    const isAdmin = hasRole('Admin');
    const isManager = hasRole('Manager');

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">
                EMS
            </h1>

            <nav className="space-y-2">
                <Link
                    href="/dashboard"
                    className="block px-4 py-2 rounded hover:bg-gray-800"
                >
                    Dashboard
                </Link>

                {isAdmin && (
                    <>
                        <Link
                            href="/employees"
                            className="block px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Employees
                        </Link>

                        <Link
                            href="/departments"
                            className="block px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Departments
                        </Link>

                        <Link
                            href="/positions"
                            className="block px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Positions
                        </Link>

                        <Link
                            href="/attendance/admin"
                            className="block px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Attendance Dashboard
                        </Link>

                        <Link
                            href="/leave-requests/admin"
                            className="block px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Leave Requests Dashboard
                        </Link>
                    </>
                )}

                {!isAdmin && (
                    <>
                        <Link
                            href="/attendance"
                            className="block px-4 py-2 rounded hover:bg-gray-800"
                        >
                            My Attendance
                        </Link>

                        <Link
                            href="/leave-requests"
                            className="block px-4 py-2 rounded hover:bg-gray-800"
                        >
                            My Leave Requests
                        </Link>
                    </>
                )}
            </nav>
        </aside>
    );
}
