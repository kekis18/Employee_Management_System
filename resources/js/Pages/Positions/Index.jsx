import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';

export default function Index({ positions = [] }) {
    const [search, setSearch] = useState('');

    const filteredPositions = positions.filter((position) =>
        `${position.name ?? ''} ${position.description ?? ''} ${
            position.department?.name ?? ''
        }`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const deletePosition = (position) => {
        if (
            confirm(
                `Are you sure you want to delete ${position.name}?`
            )
        ) {
            router.delete(`/positions/${position.id}`, {
                preserveScroll: true,
            });
        }
    };

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

                    <Link href="/positions/create">
                        <Button variant="primary">
                            + Add Position
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <label
                        htmlFor="search"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Search Positions
                    </label>

                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by position or department..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Position List */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Position List
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {filteredPositions.length} position
                            {filteredPositions.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Position
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Department
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Description
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Employees
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredPositions.length > 0 ? (
                                    filteredPositions.map((position) => (
                                        <tr
                                            key={position.id}
                                            className="border-b last:border-b-0 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-800">
                                                    {position.name}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {position.department?.name ||
                                                    'No department'}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {position.description ||
                                                    'No description'}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {position.employees_count ?? 0}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/positions/${position.id}/edit`}
                                                    >
                                                        <Button variant="primary">
                                                            Edit
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        variant="danger"
                                                        onClick={() =>
                                                            deletePosition(
                                                                position
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No positions found.
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
