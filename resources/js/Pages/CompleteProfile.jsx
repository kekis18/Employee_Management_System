import { useForm } from '@inertiajs/react';
import DashboardLayout from '../Layouts/DashboardLayout';
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
        <DashboardLayout>
            <div className="space-y-6">
                <div className="panel-surface p-6 sm:p-8">
                    <div className="mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Profile Setup</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            Complete Your Employee Profile
                        </h1>

                        <p className="mt-3 text-slate-600">
                            Welcome, {user.name}. Please provide your employee information to continue.
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            Account email: {user.email}
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
                            <h2 className="text-lg font-semibold text-slate-900">Employee Information</h2>
                            <p className="mt-1 text-sm text-slate-500">Enter your employment details below.</p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Phone Number"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Enter phone number"
                                error={errors.phone}
                                name="phone"
                            />

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Department</label>
                                <select
                                    value={data.department_id}
                                    onChange={(e) => setData('department_id', e.target.value)}
                                    className={[
                                        'w-full rounded-xl border bg-slate-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition',
                                        errors.department_id
                                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100',
                                    ].join(' ')}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.department_id && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.department_id}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Position</label>
                                <select
                                    value={data.position_id}
                                    onChange={(e) => setData('position_id', e.target.value)}
                                    className={[
                                        'w-full rounded-xl border bg-slate-50/80 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition',
                                        errors.position_id
                                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                            : 'border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100',
                                    ].join(' ')}
                                >
                                    <option value="">Select Position</option>
                                    {positions.map((position) => (
                                        <option key={position.id} value={position.id}>
                                            {position.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.position_id && (
                                    <p className="mt-1.5 text-sm text-red-600">{errors.position_id}</p>
                                )}
                            </div>

                            <Input
                                label="Hire Date"
                                type="date"
                                value={data.hire_date}
                                onChange={(e) => setData('hire_date', e.target.value)}
                                error={errors.hire_date}
                                name="hire_date"
                            />
                        </div>

                        <div className="mt-8 flex justify-end border-t border-slate-200 pt-6">
                            <div className="w-full max-w-xs">
                                <Button type="submit" variant="primary" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Profile'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
