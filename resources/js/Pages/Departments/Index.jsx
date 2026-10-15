import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';
import SearchBar from '../../Components/SearchBar';
import DataTable from '../../Components/DataTable';

export default function Index({ departments = [] }) {
    const [search, setSearch] = useState('');

    const filteredDepartments = departments.filter((department) =>
        `${department.name ?? ''} ${department.description ?? ''}`
            .toLowerCase()
            .includes(search.toLowerCase().trim())
    );

    const deleteDepartment = (department) => {
        if (window.confirm(`Are you sure you want to delete ${department.name}?`)) {
            router.delete(`/departments/${department.id}`, {
                preserveScroll: true,
            });
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'Department',
            render: (department) => (
                <span className="font-semibold text-gray-800">
                    {department.name}
                </span>
            ),
        },
        {
            key: 'description',
            label: 'Description',
            render: (department) => (
                <span className="text-gray-600">
                    {department.description || 'No description'}
                </span>
            ),
        },
        {
            key: 'positions_count',
            label: 'Positions',
            render: (department) => department.positions_count ?? 0,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (department) => (
                <div className="flex w-fit items-center gap-2 whitespace-nowrap">
                    <Link href={`/departments/${department.id}/edit`}>
                        <Button variant="primary" className="!w-auto px-3 py-1.5 text-sm">
                            Edit
                        </Button>
                    </Link>

                    <Button
                        variant="danger"
                        onClick={() => deleteDepartment(department)}
                        className="!w-auto px-3 py-1.5 text-sm"
                    >
                        Delete
                    </Button>
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
                        <h1 className="text-3xl font-bold text-gray-800">
                            Departments
                        </h1>
                        <p className="mt-1 text-gray-600">
                            Manage departments and their assigned employees.
                        </p>
                    </div>

                    <Link
                        href="/departments/create"
                        className="inline-flex self-start"
                    >
                        <Button
                            variant="primary"
                            className="!w-auto px-3 py-1.5 text-sm"
                        >
                            + Add Department
                        </Button>
                    </Link>
                </div>

                {/* Reusable Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Search Departments
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
                        placeholder="Search by department name or description..."
                    />
                </div>

                {/* Reusable DataTable */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Department List
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {filteredDepartments.length} department
                            {filteredDepartments.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredDepartments}
                        emptyMessage="No departments found."
                    />
                </section>
            </div>
        </DashboardLayout>
    );
}
