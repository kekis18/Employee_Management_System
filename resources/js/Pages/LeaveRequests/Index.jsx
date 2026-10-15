
import { Head, router, useForm } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';

export default function Index({ leaveRequests = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        leave_type: 'Vacation Leave',
        start_date: '',
        end_date: '',
        reason: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post('/leave-requests', {
            onSuccess: () => reset(),
        });
    };

    const cancelRequest = (id) => {
        if (confirm('Are you sure you want to cancel this leave request?')) {
            router.delete(`/leave-requests/${id}`);
        }
    };

    const statusStyle = {
        pending: 'bg-amber-100 text-amber-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
    };

    return (
        <DashboardLayout>
            <Head title="Leave Requests" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Leave Requests
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Submit and track your leave applications.
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-xl font-semibold text-gray-800">
                        Submit a Leave Request
                    </h2>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Leave Type
                            </label>
                            <select
                                value={data.leave_type}
                                onChange={(e) =>
                                    setData('leave_type', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                required
                            >
                                <option>Vacation Leave</option>
                                <option>Sick Leave</option>
                                <option>Emergency Leave</option>
                                <option>Personal Leave</option>
                                <option>Other</option>
                            </select>
                            {errors.leave_type && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.leave_type}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    min={new Date().toLocaleDateString('en-CA')}
                                    onChange={(e) =>
                                        setData('start_date', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    required
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.start_date}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    min={data.start_date || new Date().toLocaleDateString('en-CA')}
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                    required
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.end_date}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Reason
                            </label>
                            <textarea
                                value={data.reason}
                                onChange={(e) =>
                                    setData('reason', e.target.value)
                                }
                                rows="4"
                                maxLength="1000"
                                placeholder="Explain why you are requesting leave..."
                                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                                required
                            />
                            {errors.reason && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.reason}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </form>
                </div>

                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            My Leave History
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-5 py-4 text-sm">Leave Type</th>
                                    <th className="px-5 py-4 text-sm">Start Date</th>
                                    <th className="px-5 py-4 text-sm">End Date</th>
                                    <th className="px-5 py-4 text-sm">Reason</th>
                                    <th className="px-5 py-4 text-sm">Status</th>
                                    <th className="px-5 py-4 text-sm">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {leaveRequests.length > 0 ? (
                                    leaveRequests.map((item) => (
                                        <tr key={item.id} className="border-t">
                                            <td className="px-5 py-4 text-sm">
                                                {item.leave_type}
                                            </td>
                                            <td className="px-5 py-4 text-sm">
                                                {String(item.start_date).slice(0, 10)}
                                            </td>
                                            <td className="px-5 py-4 text-sm">
                                                {String(item.end_date).slice(0, 10)}
                                            </td>
                                            <td className="max-w-xs px-5 py-4 text-sm">
                                                {item.reason}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                    statusStyle[item.status] ??
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                {item.status === 'pending' && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            cancelRequest(item.id)
                                                        }
                                                        className="text-sm font-medium text-red-600 hover:text-red-800"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            You have not submitted any leave requests.
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
