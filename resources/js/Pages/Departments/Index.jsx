import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';

export default function Index({ departments = [] }) {
    const [search, setSearch] = useState('');

    const filteredDepartments = departments.filter((department) =>
        `${department.name ?? ''} ${department.description ?? ''}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const deleteDepartment = (department) => {
        if (
            confirm(
                `Are you sure you want to delete ${department.name}?`
            )
        ) {
            router.delete(`/departments/${department.id}`, {
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
                            Departments
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Manage departments and their assigned employees.
                        </p>
                    </div>

                    <Link href="/departments/create">
                        <Button variant="primary">
                            + Add Department
                        </Button>
                    </Link>
                </div>

                {/* Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <label
                        htmlFor="search"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Search Departments
                    </label>

                    <input
                        id="search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by department name or description..."
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Department List
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {filteredDepartments.length} department
                            {filteredDepartments.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Department
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Description
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                        Positions
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredDepartments.length > 0 ? (
                                    filteredDepartments.map((department) => (
                                        <tr
                                            key={department.id}
                                            className="border-b last:border-b-0 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-800">
                                                    {department.name}
                                                </p>
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {department.description ||
                                                    'No description'}
                                            </td>

                                            <td className="px-6 py-4 text-center text-gray-600">
                                                {department.positions_count ?? 0}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/departments/${department.id}/edit`}
                                                    >
                                                        <Button variant="primary">
                                                            Edit
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        variant="danger"
                                                        onClick={() =>
                                                            deleteDepartment(
                                                                department
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
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No departments found.
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
