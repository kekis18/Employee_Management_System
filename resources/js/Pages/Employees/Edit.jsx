import { Link, useForm } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';
import Input from '../../Components/Input';

export default function Edit({ employee, positions = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: employee?.user?.first_name ?? '',
        middle_name: employee?.user?.middle_name ?? '',
        last_name: employee?.user?.last_name ?? '',
        email: employee?.user?.email ?? '',
        phone: employee?.phone ?? '',
        position_id: employee?.position_id ?? '',
        hire_date: employee?.hire_date
            ? employee.hire_date.substring(0, 10)
            : '',
        status: employee?.status ?? 'active',
    });

    const submit = (e) => {
        e.preventDefault();

        put(`/employees/${employee.id}`);
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Edit Employee
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Update the employee's information and employment details.
                        </p>
                    </div>

                    <Link href="/employees">
                        <Button variant="secondary">Back</Button>
                    </Link>
                </div>

                {/* Form */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <form onSubmit={submit} className="space-y-8">

                        {/* Personal Information */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Personal Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Update the employee's basic information.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
                                <Input
                                    label="First Name"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData('first_name', e.target.value)
                                    }
                                    placeholder="Enter first name"
                                    error={errors.first_name}
                                />

                                <Input
                                    label="Middle Name"
                                    value={data.middle_name}
                                    onChange={(e) =>
                                        setData('middle_name', e.target.value)
                                    }
                                    placeholder="Enter middle name"
                                    error={errors.middle_name}
                                />

                                <Input
                                    label="Last Name"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData('last_name', e.target.value)
                                    }
                                    placeholder="Enter last name"
                                    error={errors.last_name}
                                />
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="border-t border-gray-200 pt-6">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Account Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Update the employee's contact and account information.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                                <Input
                                    label="Email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    placeholder="Enter email address"
                                    error={errors.email}
                                />

                                <Input
                                    label="Phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    placeholder="Enter phone number"
                                    error={errors.phone}
                                />
                            </div>
                        </div>

                        {/* Employment Information */}
                        <div className="border-t border-gray-200 pt-6">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Employment Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Update the employee's position and employment status.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* Position */}
                                <div>
                                    <label
                                        htmlFor="position_id"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Position
                                    </label>

                                    <select
                                        id="position_id"
                                        value={data.position_id}
                                        onChange={(e) =>
                                            setData(
                                                'position_id',
                                                e.target.value
                                            )
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="">
                                            Select a position
                                        </option>

                                        {positions.map((position) => (
                                            <option
                                                key={position.id}
                                                value={position.id}
                                            >
                                                {position.name}
                                                {position.department?.name
                                                    ? ` — ${position.department.name}`
                                                    : ''}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.position_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.position_id}
                                        </p>
                                    )}
                                </div>

                                {/* Hire Date */}
                                <Input
                                    label="Hire Date"
                                    type="date"
                                    value={data.hire_date}
                                    onChange={(e) =>
                                        setData('hire_date', e.target.value)
                                    }
                                    error={errors.hire_date}
                                />

                                {/* Status */}
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Status
                                    </label>

                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData('status', e.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="active">
                                            Active
                                        </option>

                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>

                                    {errors.status && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
                            <Link href="/employees">
                                <Button
                                    type="button"
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Updating...'
                                    : 'Update Employee'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
