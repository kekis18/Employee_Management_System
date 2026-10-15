
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import StatusBadge from '../../Components/StatusBadge';

export default function EmployeeDashboard({
    employee = {},
    todayAttendance = null,
    attendanceSummary = {},
    leaveSummary = {},
    recentAttendance = [],
    recentLeaves = [],
}) {
    const statistics = [
        {
            title: 'Present This Month',
            value: attendanceSummary.present ?? 0,
            description: 'Days marked present',
        },
        {
            title: 'Late This Month',
            value: attendanceSummary.late ?? 0,
            description: 'Late attendance records',
        },
        {
            title: 'Pending Leaves',
            value: leaveSummary.pending ?? 0,
            description: 'Awaiting approval',
        },
        {
            title: 'Approved Leaves',
            value: leaveSummary.approved ?? 0,
            description: 'Approved requests',
        },
    ];

    const formatTime = (time) => {
        if (!time) return '—';
        return String(time).slice(0, 5);
    };

    const formatDate = (date) => {
        if (!date) return '—';
        return String(date).slice(0, 10);
    };

    return (
        <DashboardLayout>
            <Head title="Employee Dashboard" />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {employee.name || 'Employee'}!
                </h1>

                <p className="mt-1 text-gray-600">
                    Here's your personal attendance and leave overview.
                </p>
            </div>

            {/* Employee Profile */}
            <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Employee ID: {employee.employee_id || '—'}
                        </p>

                        <h2 className="mt-1 text-xl font-semibold text-gray-800">
                            {employee.name || 'Employee'}
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            {employee.position || 'No position assigned'}
                            {' · '}
                            {employee.department || 'No department assigned'}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {employee.email || ''}
                        </p>
                    </div>

                    <span className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium capitalize ${
                        employee.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                    }`}>
                        {employee.status || 'Unknown'}
                    </span>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {statistics.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            {stat.title}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-800">
                            {stat.value}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Attendance and Quick Actions */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
                    <div className="flex flex-col gap-3 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Today's Attendance
                            </h2>

                            <p className="text-sm text-gray-500">
                                {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <Link
                            href="/attendance"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Go to Attendance
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="mt-2 font-semibold capitalize text-gray-800">
                                {todayAttendance?.status ?? 'Not recorded'}
                            </p>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-500">Time In</p>
                            <p className="mt-2 font-semibold text-gray-800">
                                {formatTime(todayAttendance?.time_in)}
                            </p>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-sm text-gray-500">Time Out</p>
                            <p className="mt-2 font-semibold text-gray-800">
                                {formatTime(todayAttendance?.time_out)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Quick Actions
                        </h2>

                        <p className="text-sm text-gray-500">
                            Your common tasks
                        </p>
                    </div>

                    <div className="space-y-3 p-6">
                        <Link
                            href="/attendance"
                            className="block rounded-lg bg-blue-600 px-4 py-3 text-center font-medium text-white hover:bg-blue-700"
                        >
                            My Attendance
                        </Link>

                        <Link
                            href="/leave-requests"
                            className="block rounded-lg border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Request Leave
                        </Link>

                        <Link
                            href="/leave-requests"
                            className="block rounded-lg border border-gray-300 px-4 py-3 text-center font-medium text-gray-700 hover:bg-gray-50"
                        >
                            My Leave Requests
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Attendance */}
            <div className="mt-8 rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Recent Attendance
                        </h2>

                        <p className="text-sm text-gray-500">
                            Your latest attendance records
                        </p>
                    </div>

                    <Link
                        href="/attendance"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        View All
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Time In</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Time Out</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentAttendance.length > 0 ? (
                                recentAttendance.map((record) => (
                                    <tr key={record.id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatDate(record.date)}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatTime(record.time_in)}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatTime(record.time_out)}
                                        </td>

                                        <td className="px-6 py-4">
                                            <StatusBadge status={record.status} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                                        No attendance records yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Leave Requests */}
            <div className="mt-8 rounded-xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Recent Leave Requests
                        </h2>

                        <p className="text-sm text-gray-500">
                            Track your leave applications
                        </p>
                    </div>

                    <Link
                        href="/leave-requests"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        View All
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Leave Type</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Start Date</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">End Date</th>
                                <th className="px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentLeaves.length > 0 ? (
                                recentLeaves.map((leave) => (
                                    <tr key={leave.id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {leave.leave_type}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatDate(leave.start_date)}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {formatDate(leave.end_date)}
                                        </td>

                                        <td className="px-6 py-4">
                                            <StatusBadge status={leave.status} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500">
                                        No leave requests yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
