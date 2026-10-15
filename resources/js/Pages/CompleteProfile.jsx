import { useForm } from '@inertiajs/react';
import Input from '../Components/Input';
import Button from '../Components/Button';

export default function CompleteProfile({
    user,
    departments,
    positions,
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

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Complete Your Employee Profile
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Welcome, {user.name}. Please provide your employee
                        information to continue.
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        Account email: {user.email}
                    </p>
                </div>

                <form onSubmit={submit}>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Employee Information
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Enter your employment information.
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">


                        <Input
                            label="Phone Number"
                            value={data.phone}
                            onChange={(e) =>
                                setData('phone', e.target.value)
                            }
                            placeholder="Enter phone number"
                            error={errors.phone}
                        />

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Department
                            </label>

                            <select
                                value={data.department_id}
                                onChange={(e) =>
                                    setData(
                                        'department_id',
                                        e.target.value
                                    )
                                }
                                className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.department_id
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
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

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Position
                            </label>

                            <select
                                value={data.position_id}
                                onChange={(e) =>
                                    setData(
                                        'position_id',
                                        e.target.value
                                    )
                                }
                                className={`w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.position_id
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            >
                                <option value="">
                                    Select Position
                                </option>

                                {positions.map((position) => (
                                    <option
                                        key={position.id}
                                        value={position.id}
                                    >
                                        {position.name}
                                    </option>
                                ))}
                            </select>

                            {errors.position_id && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.position_id}
                                </p>
                            )}
                        </div>

                        <Input
                            label="Hire Date"
                            type="date"
                            value={data.hire_date}
                            onChange={(e) =>
                                setData('hire_date', e.target.value)
                            }
                            error={errors.hire_date}
                        />

                    </div>

                    <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={processing}
                        >
                            {processing
                                ? 'Saving...'
                                : 'Save Profile'}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
