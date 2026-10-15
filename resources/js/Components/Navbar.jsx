import { router, usePage } from '@inertiajs/react';

export default function Navbar() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const fullName = [
        user?.first_name,
        user?.middle_name,
        user?.last_name,
    ]
        .filter(Boolean)
        .join(' ');

    const role = user?.roles?.[0] ?? 'No Role';

    const logout = () => {
        router.post('/logout');
    };

    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">

            <h2 className="text-xl font-semibold text-gray-800">
                Employee Management System
            </h2>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="font-medium text-gray-800">
                        {fullName || 'User'}
                    </p>

                    <p className="text-sm text-gray-500">
                        {role}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={logout}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Logout
                </button>
            </div>

        </header>
    );
}
