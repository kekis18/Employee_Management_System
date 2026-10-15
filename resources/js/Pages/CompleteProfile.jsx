
import { useForm } from '@inertiajs/react';
import Input from '../Components/Input';
import Button from '../Components/Button';

export default function CompleteProfile({
    user,
    departments = [],
    positions = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        phone: '',
        department_id: '',
        position_id: '',
        hire_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/employee-profile');
    };

    const selectClass = (field) =>
        [
            'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition',
            errors[field]
                ? 'border-red-300 focus:ring-2 focus:ring-red-100'
                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
        ].join(' ');

    const filteredPositions = positions.filter(
        (position) =>
            String(position.department_id) ===
            String(data.department_id)
    );

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:py-12">
            <div className="mx-auto max-w-3xl">
                {/* Page Header */}
                <div className="mb-6">
                    <p className="text-sm font-semibold text-blue-600">
                        Employee Management System
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Complete Your Profile
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Provide your employee information to finish setting
                        up your account.
                    </p>
                </div>

                {/* Profile Form */}
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-5 sm:px-8">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Employee Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Account: {user?.email}
                        </p>
                    </div>

                    <form onSubmit={submit} className="p-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            {/* First Name */}
                            <Input
                                label="First Name"
                                name="first_name"
                                placeholder="Enter first name"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                                error={errors.first_name}
                                required
                            />

                            {/* Middle Name */}
                            <Input
                                label="Middle Name (Optional)"
                                name="middle_name"
                                placeholder="Enter middle name"
                                value={data.middle_name}
                                onChange={(e) =>
                                    setData('middle_name', e.target.value)
                                }
                                error={errors.middle_name}
                            />

                            {/* Last Name */}
                            <Input
                                label="Last Name"
                                name="last_name"
                                placeholder="Enter last name"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                                error={errors.last_name}
                                required
                            />

                            {/* Phone */}
                            <Input
                                label="Phone Number"
                                name="phone"
                                placeholder="Enter phone number"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                error={errors.phone}
                            />

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
                                    name="department_id"
                                    value={data.department_id}
                                    onChange={(e) => {
                                        setData('department_id', e.target.value);
                                        setData('position_id', '');
                                    }}
                                    className={selectClass('department_id')}
                                    required
                                >
                                    <option value="">
                                        Select Department
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

                            {/* Position: visible only after selecting a department */}
                            {data.department_id && (
                                <div>
                                    <label
                                        htmlFor="position_id"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Position
                                    </label>

                                    <select
                                        id="position_id"
                                        name="position_id"
                                        value={data.position_id}
                                        onChange={(e) =>
                                            setData('position_id', e.target.value)
                                        }
                                        className={selectClass('position_id')}
                                        required
                                    >
                                        <option value="">
                                            Select Position
                                        </option>

                                        {filteredPositions.map((position) => (
                                            <option
                                                key={position.id}
                                                value={position.id}
                                            >
                                                {position.name}
                                            </option>
                                        ))}
                                    </select>

                                    {filteredPositions.length === 0 && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            No positions available for this department.
                                        </p>
                                    )}

                                    {errors.position_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.position_id}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Hire Date */}
                            <div className="sm:col-span-2">
                                <Input
                                    label="Hire Date"
                                    type="date"
                                    name="hire_date"
                                    value={data.hire_date}
                                    onChange={(e) =>
                                        setData('hire_date', e.target.value)
                                    }
                                    error={errors.hire_date}
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={processing}
                                className="!w-auto px-4 py-2 text-sm"
                            >
                                {processing ? 'Saving...' : 'Save Profile'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
