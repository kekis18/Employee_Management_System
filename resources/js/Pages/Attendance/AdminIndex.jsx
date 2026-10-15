import { router } from '@inertiajs/react';
import { useState } from 'react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';

export default function AdminIndex({
    employees = [],
    selectedDate = '',
    summary = {},
}) {
    const [date, setDate] = useState(selectedDate);

    const filterByDate = (e) => {
        e.preventDefault();

        router.get(
            '/attendance/admin',
            { date },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const formatTime = (time) => {
        if (!time) return '—';

        return String(time).slice(0, 5);
    };

    const statusStyles = {
        present: 'bg-green-100 text-green-700',
        late: 'bg-amber-100 text-amber-700',
        absent: 'bg-red-100 text-red-700',
        leave: 'bg-blue-100 text-blue-700',
    };

    const cards = [
        {
            label: 'Total Employees',
            value: summary.total ?? 0,
            color: 'text-gray-800',
            background: 'bg-gray-50',
        },
        {
            label: 'Present',
            value: summary.present ?? 0,
            color: 'text-green-700',
            background: 'bg-green-50',
        },
        {
            label: 'Late',
            value: summary.late ?? 0,
            color: 'text-amber-700',
            background: 'bg-amber-50',
        },
        {
            label: 'Absent',
            value: summary.absent ?? 0,
            color: 'text-red-700',
            background: 'bg-red-50',
        },
        {
            label: 'On Leave',
            value: summary.leave ?? 0,
            color: 'text-blue-700',
            background: 'bg-blue-50',
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Attendance Dashboard
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Monitor daily attendance across all active employees.
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {cards.map((card) => (
                        <div
                            key={card.label}
                            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                        >
                            <p className="text-sm font-medium text-gray-500">
                                {card.label}
                            </p>

                            <p
                                className={`mt-3 text-3xl font-bold ${card.color}`}
                            >
                                {card.value}
                            </p>

                            <div
                                className={`mt-3 h-1.5 rounded-full ${card.background}`}
                            />
                        </div>
                    ))}
                </div>

                {/* Date Filter */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Daily Attendance
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Select a date to review employee attendance.
                            </p>
                        </div>

                        <form
                            onSubmit={filterByDate}
                            className="flex flex-col gap-3 sm:flex-row sm:items-end"
                        >
                            <div>
                                <label
                                    htmlFor="attendance-date"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Attendance Date
                                </label>

                                <input
                                    id="attendance-date"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <Button type="submit" variant="primary">
                                Apply Filter
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Attendance Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Employee Attendance Records
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {employees.length} active employee
                            {employees.length !== 1 ? 's' : ''}
                            {' '}for {selectedDate}
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
                                        Department
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Position
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Time In
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                                        Time Out
                                    </th>

                                    <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {employees.length > 0 ? (
                                    employees.map((employee) => (
                                        <tr
                                            key={employee.id}
                                            className="border-b last:border-b-0 hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="font-medium text-gray-800">
                                                    {employee.name || 'Unnamed Employee'}
                                                </p>

                                                <p className="mt-1 text-xs text-gray-500">
                                                    {employee.employee_id}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {employee.department}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {employee.position}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {formatTime(employee.time_in)}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-gray-600">
                                                {formatTime(employee.time_out)}
                                            </td>

                                            <td className="px-5 py-4 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                        statusStyles[employee.status] ??
                                                        'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {employee.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No active employees found.
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
