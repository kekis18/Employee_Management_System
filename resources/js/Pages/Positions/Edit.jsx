import { Link, useForm } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';
import Input from '../../Components/Input';

export default function Edit({ position, departments = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        department_id: position?.department_id ?? '',
        name: position?.name ?? '',
        description: position?.description ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/positions/${position.id}`);
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-3xl space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Edit Position
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Update the position and its department.
                        </p>
                    </div>

                    <Link href="/positions">
                        <Button variant="secondary">
                            Back
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">

                        {/* Department */}
                        <div>
                            <label
                                htmlFor="department_id"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Department
                            </label>

                            <select
                                id="department_id"
                                value={data.department_id}
                                onChange={(e) =>
                                    setData(
                                        'department_id',
                                        e.target.value
                                    )
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="">
                                    Select a department
                                </option>

                                {departments.map((department) => (
                                    <option
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </option>
                                ))}
                            </select>

                            {errors.department_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.department_id}
                                </p>
                            )}
                        </div>

                        {/* Position Name */}
                        <Input
                            label="Position Name"
                            value={data.name}
                            onChange={(e) =>
                                setData('name', e.target.value)
                            }
                            placeholder="Enter position name"
                            error={errors.name}
                        />

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData(
                                        'description',
                                        e.target.value
                                    )
                                }
                                placeholder="Enter position description"
                                rows="5"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

                            <Link href="/positions">
                                <Button
                                    type="button"
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            </Link>

                            <Button type="submit" variant="primary" disabled={processing} className="!w-auto px-3 py-1.5 text-sm">
                                {processing ? 'Updating...' : 'Update Position'}
                            </Button>

                        </div>

                    </form>
                </div>

            </div>
        </DashboardLayout>
    );
}
