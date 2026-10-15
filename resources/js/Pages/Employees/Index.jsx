
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';
import SearchBar from '../../Components/SearchBar';
import DataTable from '../../Components/DataTable';
import StatusBadge from '../../Components/StatusBadge';

export default function Index({ employees = [], status = 'active' }) {
    const [search, setSearch] = useState('');

    const filteredEmployees = employees.filter((employee) => {
        const fullName = [
            employee.user?.first_name,
            employee.user?.middle_name,
            employee.user?.last_name,
        ]
            .filter(Boolean)
            .join(' ');

        const searchableText = [
            fullName,
            employee.employee_id,
            employee.user?.email,
            employee.phone,
            employee.position?.name,
            employee.position?.department?.name,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

        return searchableText.includes(search.toLowerCase().trim());
    });

    const deactivateEmployee = (employee) => {
        const name = [
            employee.user?.first_name,
            employee.user?.last_name,
        ]
            .filter(Boolean)
            .join(' ');

        if (window.confirm(`Are you sure you want to deactivate ${name || 'this employee'}?`)) {
            router.delete(`/employees/${employee.id}`, {
                preserveScroll: true,
            });
        }
    };

    const reactivateEmployee = (employee) => {
        const name = employee.user?.first_name || 'this employee';

        if (window.confirm(`Are you sure you want to reactivate ${name}?`)) {
            router.patch(
                `/employees/${employee.id}/status`,
                { status: 'active' },
                { preserveScroll: true }
            );
        }
    };

    const columns = [
        {
            key: 'employee',
            label: 'Employee',
            render: (employee) => {
                const fullName = [
                    employee.user?.first_name,
                    employee.user?.middle_name,
                    employee.user?.last_name,
                ]
                    .filter(Boolean)
                    .join(' ');

                return (
                    <div className="min-w-40">
                        <p className="font-semibold text-gray-800">
                            {fullName || 'Unnamed Employee'}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            {employee.user?.email || 'No email'}
                        </p>
                    </div>
                );
            },
        },
        {
            key: 'employee_id',
            label: 'Employee ID',
            render: (employee) => (
                <span className="whitespace-nowrap font-medium text-gray-600">
                    {employee.employee_id || '—'}
                </span>
            ),
        },
        {
            key: 'position',
            label: 'Position',
            render: (employee) => employee.position?.name || 'No position',
        },
        {
            key: 'department',
            label: 'Department',
            render: (employee) =>
                employee.position?.department?.name || 'No department',
        },
        {
            key: 'hire_date',
            label: 'Hire Date',
            render: (employee) => {
                const hireDate = employee.hire_date;

                if (!hireDate) {
                    return (
                        <span className="whitespace-nowrap">
                            Not specified
                        </span>
                    );
                }

                const date = new Date(hireDate);

                return (
                    <span className="whitespace-nowrap">
                        {Number.isNaN(date.getTime())
                            ? 'Invalid Date'
                            : date.toLocaleDateString('en-PH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                    </span>
                );
            },
        },
        {
            key: 'status',
            label: 'Status',
            render: (employee) => <StatusBadge status={employee.status} />,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (employee) => (
                <div className="flex min-w-max items-center gap-2">
                    <Link
                        href={`/employees/${employee.id}`}
                        className="inline-flex"
                    >
                        <Button
                            variant="secondary"
                            className="whitespace-nowrap px-3 py-2"
                        >
                            View
                        </Button>
                    </Link>

                    <Link
                        href={`/employees/${employee.id}/edit`}
                        className="inline-flex"
                    >
                        <Button
                            variant="primary"
                            className="whitespace-nowrap px-3 py-2"
                        >
                            Edit
                        </Button>
                    </Link>

                   {employee.status === 'active' ? (
                        <Button
                            variant="danger"
                            onClick={() => deactivateEmployee(employee)}
                            className="!w-auto shrink-0 whitespace-nowrap px-2.5 py-1.5 text-xs"
                        >
                            Deactivate
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={() => reactivateEmployee(employee)}
                            className="!w-auto shrink-0 whitespace-nowrap px-3 py-2"
                        >
                            Reactivate
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600">
                            Employee Management
                        </p>
                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                            Employees
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Manage employee records and employment information.
                        </p>
                    </div>

                    <Link href="/employees/create" className="inline-flex self-start">
                        <Button className="whitespace-nowrap">
                            + Add Employee
                        </Button>
                    </Link>
                </div>

                {/* Status Filters */}
                <div className="flex flex-wrap gap-2">
                    <Link
                        href="/employees?status=active"
                        className={`inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                            status === 'active'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Active Employees
                    </Link>

                    <Link
                        href="/employees?status=inactive"
                        className={`inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                            status === 'inactive'
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Inactive Employees
                    </Link>
                </div>

                {/* Search */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Search Employees
                    </label>
                    <SearchBar
                        value={search}
                        onChange={(value) =>
                            setSearch(
                                typeof value === 'string'
                                    ? value
                                    : value.target.value
                            )
                        }
                        placeholder="Search by name, ID, email, position, or department..."
                    />
                </div>

                {/* Employee Table */}
                <section className="space-y-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                {status === 'active'
                                    ? 'Active Employees'
                                    : 'Inactive Employees'}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Showing {filteredEmployees.length} employee
                                {filteredEmployees.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredEmployees}
                        emptyMessage="No employees match your search."
                    />
                </section>
            </div>
        </DashboardLayout>
    );
}
