
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../../Layouts/DashboardLayout';

export default function AdminIndex({
    leaveRequests = [],
    filters = {},
    summary = {},
}) {
    const [status, setStatus] = useState(filters.status ?? '');

    const filterRequests = (e) => {
        e.preventDefault();

        router.get(
            '/leave-requests/admin',
            status ? { status } : {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const reviewRequest = (id, action) => {
        const actionLabel = action === 'approve' ? 'approve' : 'reject';

        if (!confirm(`Are you sure you want to ${actionLabel} this leave request?`)) {
            return;
        }

        router.patch(`/leave-requests/${id}/${action}`, {}, {
            preserveScroll: true,
        });
    };

    const statusStyles = {
        pending: 'bg-amber-100 text-amber-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
    };

    const cards = [
        {
            label: 'Pending Requests',
            value: summary.pending ?? 0,
            color: 'text-amber-700',
        },
        {
            label: 'Approved Requests',
            value: summary.approved ?? 0,
            color: 'text-green-700',
        },
        {
            label: 'Rejected Requests',
            value: summary.rejected ?? 0,
            color: 'text-red-700',
        },
    ];

    return (
        <DashboardLayout>
            <Head title="Admin Leave Requests" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Leave Requests Dashboard
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Review and manage employee leave applications.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {cards.map((card) => (
                        <div
                            key={card.label}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <p className="text-sm font-medium text-gray-500">
                                {card.label}
                            </p>
                            <p className={`mt-3 text-3xl font-bold ${card.color}`}>
                                {card.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <form
                        onSubmit={filterRequests}
                        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Employee Applications
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Filter requests by their current status.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                            <div>
                                <label
                                    htmlFor="leave-status"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Request Status
                                </label>

                                <select
                                    id="leave-status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                                >
                                    <option value="">All Requests</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                            >
                                Apply Filter
                            </button>
                        </div>
                    </form>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Leave Applications
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {leaveRequests.length} request(s) displayed
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Employee
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Leave Details
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Reason
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Review Information
                                    </th>
                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {leaveRequests.length > 0 ? (
                                    leaveRequests.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b last:border-b-0 hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4 align-top">
                                                <p className="font-medium text-gray-800">
                                                    {item.employee_name}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    {item.employee_id}
                                                </p>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    {item.department}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {item.position}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <p className="font-medium text-gray-800">
                                                    {item.leave_type}
                                                </p>
                                                <p className="mt-2 text-sm text-gray-600">
                                                    {item.start_date}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    to {item.end_date}
                                                </p>
                                            </td>

                                            <td className="max-w-xs whitespace-normal break-words px-5 py-4 align-top text-sm text-gray-600">
                                                {item.reason}
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                        statusStyles[item.status] ??
                                                        'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 align-top text-sm text-gray-600">
                                                <p>
                                                    {item.reviewed_by || 'Not reviewed'}
                                                </p>
                                                {item.reviewed_at && (
                                                    <p className="mt-1 text-xs text-gray-500">
                                                        {item.reviewed_at}
                                                    </p>
                                                )}
                                            </td>

                                            <td className="px-5 py-4 align-top">
                                                {item.status === 'pending' ? (
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                reviewRequest(item.id, 'approve')
                                                            }
                                                            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                                                        >
                                                            Approve
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                reviewRequest(item.id, 'reject')
                                                            }
                                                            className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">
                                                        Completed
                                                    </span>
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
                                            No leave requests found for this filter.
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
