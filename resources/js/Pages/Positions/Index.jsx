import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';
import SearchBar from '../../Components/SearchBar';
import DataTable from '../../Components/DataTable';

export default function Index({ positions = [] }) {
    const [search, setSearch] = useState('');

    const filteredPositions = positions.filter((position) =>
        `${position.name ?? ''} ${position.description ?? ''} ${
            position.department?.name ?? ''
        }`
            .toLowerCase()
            .includes(search.toLowerCase().trim())
    );

    const deletePosition = (position) => {
        if (window.confirm(`Are you sure you want to delete ${position.name}?`)) {
            router.delete(`/positions/${position.id}`, {
                preserveScroll: true,
            });
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'Position',
            render: (position) => (
                <span className="font-semibold text-gray-800">
                    {position.name}
                </span>
            ),
        },
        {
            key: 'department',
            label: 'Department',
            render: (position) => position.department?.name || 'No department',
        },
        {
            key: 'description',
            label: 'Description',
            render: (position) => position.description || 'No description',
        },
        {
            key: 'employees_count',
            label: 'Employees',
            render: (position) => position.employees_count ?? 0,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (position) => (
                <div className="flex w-max items-center gap-2 whitespace-nowrap">
                    <Link
                        href={`/positions/${position.id}/edit`}
                        className="inline-flex"
                    >
                        <Button
                            variant="primary"
                            className="!w-auto px-3 py-1.5 text-sm"
                        >
                            Edit
                        </Button>
                    </Link>

                    <Button
                        variant="danger"
                        onClick={() => deletePosition(position)}
                        className="!w-auto shrink-0 whitespace-nowrap px-3 py-1.5 text-sm"
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
                            Positions
                        </h1>
                        <p className="mt-1 text-gray-600">
                            Manage employee positions and their departments.
                        </p>
                    </div>

                    <Link
                        href="/positions/create"
                        className="inline-flex self-start"
                    >
                        <Button
                            variant="primary"
                            className="!w-auto px-3 py-1.5 text-sm"
                        >
                            + Add Position
                        </Button>
                    </Link>
                </div>

                {/* Reusable Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Search Positions
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
                        placeholder="Search by position or department..."
                    />
                </div>

                {/* Reusable DataTable */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Position List
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {filteredPositions.length} position
                            {filteredPositions.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <DataTable
                        columns={columns}
                        data={filteredPositions}
                        emptyMessage="No positions found."
                    />
                </section>
            </div>
        </DashboardLayout>
    );
}
