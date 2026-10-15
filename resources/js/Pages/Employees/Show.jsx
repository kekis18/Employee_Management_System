import { Link } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';

export default function Show({ employee }) {
    const user = employee?.user;
    const position = employee?.position;
    const department = position?.department;

    const fullName = [
        user?.first_name,
        user?.middle_name,
        user?.last_name,
    ]
        .filter(Boolean)
        .join(' ');

    const formatDate = (date) => {
        if (!date) {
            return 'Not specified';
        }

        return new Date(date).toLocaleDateString();
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Employee Details
                        </h1>

                        <p className="mt-1 text-gray-600">
                            View the employee's personal and employment information.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link href="/employees">
                            <Button variant="secondary">Back</Button>
                        </Link>

                        <Link href={`/employees/${employee.id}/edit`}>
                            <Button variant="primary">Edit</Button>
                        </Link>
                    </div>
                </div>

                {/* Personal Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Personal Information
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">
                                Full Name
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {fullName || 'Not specified'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Employee ID
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {employee.employee_id || 'Not specified'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {user?.email || 'Not specified'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Phone
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {employee.phone || 'Not specified'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Employment Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Employment Information
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">
                                Department
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {department?.name || 'No department'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Position
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {position?.name || 'No position'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Hire Date
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {formatDate(employee.hire_date)}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Status
                            </p>

                            <span
                                className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                                    employee.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {employee.status === 'active'
                                    ? 'Active'
                                    : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Account Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Account Information
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <p className="text-sm text-gray-500">
                                Account Email
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {user?.email || 'Not specified'}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Account Created
                            </p>

                            <p className="mt-1 font-medium text-gray-800">
                                {formatDate(user?.created_at)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
