import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';

export default function Index({
    employees = [],
    status = 'active',
}) {
    const [search, setSearch] = useState('');

    const filteredEmployees = employees.filter((employee) => {
        const fullName = [
            employee.user?.first_name,
            employee.user?.middle_name,
            employee.user?.last_name,
        ]
            .filter(Boolean)
            .join(' ');

        const searchableText = `
            ${fullName}
            ${employee.employee_id ?? ''}
            ${employee.user?.email ?? ''}
            ${employee.phone ?? ''}
            ${employee.position?.name ?? ''}
            ${employee.position?.department?.name ?? ''}
        `.toLowerCase();

        return searchableText.includes(search.toLowerCase());
    });

    const deleteEmployee = (employee) => {
        const fullName = [
            employee.user?.first_name,
            employee.user?.last_name,
        ]
            .filter(Boolean)
            .join(' ');

        if (
            confirm(
                `Are you sure you want to deactivate ${fullName}?`
            )
        ) {
            router.delete(`/employees/${employee.id}`, {
                preserveScroll: true,
            });
        }
    };

    const reactivateEmployee = (employee) => {
        if (!confirm(`Are you sure you want to reactivate ${employee.user?.first_name ?? 'this employee'}?`)) {
            return;
        }

        router.patch(`/employees/${employee.id}/status`, {
            status: 'active',
        });
    };
    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Employees
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Manage employee records and employment information.
                        </p>
                    </div>

                    <Link href="/employees/create">
                        <Button variant="primary">
                            + Add Employee
                        </Button>
                    </Link>
                </div>

                {/* Status Filter */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/employees?status=active"
                        className={`rounded-lg px-4 py-2 text-sm font-medium ${
                            status === 'active'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Active Employees
                    </Link>

                    <Link
                        href="/employees?status=inactive"
                        className={`rounded-lg px-4 py-2 text-sm font-medium ${
                            status === 'inactive'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Inactive Employees
                    </Link>
                </div>

                {/* Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <label
                        htmlFor="search"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Search Employees
                    </label>

                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, employee ID, position, or department..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Employee List */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {status === 'active'
                                ? 'Active Employees'
                                : 'Inactive Employees'}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {filteredEmployees.length} employee
                            {filteredEmployees.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Employee
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Employee ID
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Position
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Department
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Hire Date
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEmployees.length > 0 ? (
                                    filteredEmployees.map((employee) => {
                                        const fullName = [
                                            employee.user?.first_name,
                                            employee.user?.middle_name,
                                            employee.user?.last_name,
                                        ]
                                            .filter(Boolean)
                                            .join(' ');

                                        return (
                                            <tr
                                                key={employee.id}
                                                className="border-b last:border-b-0 hover:bg-gray-50"
                                            >
                                                {/* Employee */}
                                                <td className="px-6 py-4">
                                                    <p className="font-medium text-gray-800">
                                                        {fullName || 'Unnamed Employee'}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        {employee.user?.email ||
                                                            'No email'}
                                                    </p>
                                                </td>

                                                {/* Employee ID */}
                                                <td className="px-6 py-4 text-gray-600">
                                                    {employee.employee_id}
                                                </td>

                                                {/* Position */}
                                                <td className="px-6 py-4 text-gray-600">
                                                    {employee.position?.name ||
                                                        'No position'}
                                                </td>

                                                {/* Department */}
                                                <td className="px-6 py-4 text-gray-600">
                                                    {employee.position?.department
                                                        ?.name ||
                                                        'No department'}
                                                </td>

                                                {/* Hire Date */}
                                                <td className="px-6 py-4 text-gray-600">
                                                    {employee.hire_date
                                                        ? new Date(
                                                              employee.hire_date
                                                          ).toLocaleDateString()
                                                        : 'Not specified'}
                                                </td>

                                               {/* Actions */}
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <Link href={`/employees/${employee.id}`}>
                                                            <Button variant="secondary">
                                                                View
                                                            </Button>
                                                        </Link>

                                                        <Link href={`/employees/${employee.id}/edit`}>
                                                            <Button variant="primary">
                                                                Edit
                                                            </Button>
                                                        </Link>

                                                        {employee.status === 'active' ? (
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => deleteEmployee(employee)}
                                                            >
                                                                Deactivate
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                variant="primary"
                                                                onClick={() => reactivateEmployee(employee)}
                                                            >
                                                                Reactivate
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No employees found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

