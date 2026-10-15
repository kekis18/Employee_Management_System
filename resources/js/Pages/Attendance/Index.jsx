import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

import DashboardLayout from '../../Layouts/DashboardLayout';
import Button from '../../Components/Button';

export default function Index({
    todayAttendance = null,
    history = [],
    filters = {},
    summary = {},
}) {
    const { flash = {} } = usePage().props;

    const [startDate, setStartDate] = useState(
        filters.start_date ?? ''
    );

    const [endDate, setEndDate] = useState(
        filters.end_date ?? ''
    );

    const [processing, setProcessing] = useState(false);

    const hasClockedIn = Boolean(todayAttendance?.time_in);
    const hasClockedOut = Boolean(todayAttendance?.time_out);

    const formatTime = (time) => {
        if (!time) return '—';

        return time.slice(0, 5);
    };

    const formatDate = (date) => {
        if (!date) return '—';

        return date.slice(0, 10);
    };

    const clockIn = () => {
        if (processing || hasClockedIn) return;

        setProcessing(true);

        router.post(
            '/attendance/clock-in',
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            }
        );
    };

    const clockOut = () => {
        if (processing || !hasClockedIn || hasClockedOut) return;

        setProcessing(true);

        router.post(
            '/attendance/clock-out',
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            }
        );
    };

    const filterHistory = (e) => {
        e.preventDefault();

        router.get(
            '/attendance',
            {
                start_date: startDate,
                end_date: endDate,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const clearFilters = () => {
        const today = new Date();
        const firstDay = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const toDateString = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        };

        const start = toDateString(firstDay);
        const end = toDateString(today);

        setStartDate(start);
        setEndDate(end);

        router.get(
            '/attendance',
            {
                start_date: start,
                end_date: end,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const statCards = [
        {
            label: 'Present This Month',
            value: summary.present ?? 0,
            color: 'text-green-700',
            background: 'bg-green-50',
        },
        {
            label: 'Late This Month',
            value: summary.late ?? 0,
            color: 'text-amber-700',
            background: 'bg-amber-50',
        },
        {
            label: 'Absent This Month',
            value: summary.absent ?? 0,
            color: 'text-red-700',
            background: 'bg-red-50',
        },
        {
            label: 'Leave This Month',
            value: summary.leave ?? 0,
            color: 'text-blue-700',
            background: 'bg-blue-50',
        },
    ];

    const statusStyle = {
        present: 'bg-green-100 text-green-700',
        late: 'bg-amber-100 text-amber-700',
        absent: 'bg-red-100 text-red-700',
        leave: 'bg-blue-100 text-blue-700',
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Attendance
                    </h1>

                    <p className="mt-1 text-gray-600">
                        Record your working hours and view your attendance history.
                    </p>
                </div>

                {/* Flash Messages */}
                {flash.success && (
                    <div
                        role="status"
                        className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700"
                    >
                        {flash.success}
                    </div>
                )}

                {flash.error && (
                    <div
                        role="alert"
                        className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700"
                    >
                        {flash.error}
                    </div>
                )}

                {/* Clock In / Clock Out */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Today's Attendance
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Record your time in and time out for today.
                            </p>

                            <p className="mt-3 text-sm text-gray-600">
                                Status:{' '}
                                <span
                                    className={`font-semibold ${
                                        hasClockedOut
                                            ? 'text-green-700'
                                            : hasClockedIn
                                              ? 'text-blue-700'
                                              : 'text-gray-500'
                                    }`}
                                >
                                    {hasClockedOut
                                        ? 'Completed'
                                        : hasClockedIn
                                          ? 'Clocked In'
                                          : 'Not Clocked In'}
                                </span>
                            </p>

                            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                <p>
                                    Time In:{' '}
                                    <span className="font-semibold text-gray-800">
                                        {formatTime(todayAttendance?.time_in)}
                                    </span>
                                </p>

                                <p>
                                    Time Out:{' '}
                                    <span className="font-semibold text-gray-800">
                                        {formatTime(todayAttendance?.time_out)}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="primary"
                                disabled={processing || hasClockedIn}
                                onClick={clockIn}
                            >
                                {processing && !hasClockedIn
                                    ? 'Processing...'
                                    : hasClockedIn
                                      ? 'Already Clocked In'
                                      : 'Clock In'}
                            </Button>

                            <Button
                                variant="secondary"
                                disabled={
                                    processing ||
                                    !hasClockedIn ||
                                    hasClockedOut
                                }
                                onClick={clockOut}
                            >
                                {processing && hasClockedIn && !hasClockedOut
                                    ? 'Processing...'
                                    : hasClockedOut
                                      ? 'Already Clocked Out'
                                      : 'Clock Out'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Monthly Summary */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">
                        Monthly Summary
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {statCards.map((card) => (
                            <div
                                key={card.label}
                                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                            >
                                <p className="text-sm font-medium text-gray-500">
                                    {card.label}
                                </p>

                                <div className="mt-3 flex items-center justify-between">
                                    <p className="text-3xl font-bold text-gray-800">
                                        {card.value}
                                    </p>

                                    <span
                                        className={`rounded-lg px-3 py-2 text-sm font-semibold ${card.background} ${card.color}`}
                                    >
                                        Days
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Date Filter */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Attendance History
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Filter your attendance records by date.
                    </p>

                    <form
                        onSubmit={filterHistory}
                        className="mt-5 grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        <div>
                            <label
                                htmlFor="start_date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Start Date
                            </label>

                            <input
                                id="start_date"
                                type="date"
                                value={startDate}
                                max={endDate || undefined}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="end_date"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                End Date
                            </label>

                            <input
                                id="end_date"
                                type="date"
                                value={endDate}
                                min={startDate || undefined}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <Button type="submit" variant="primary">
                            Filter
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={clearFilters}
                        >
                            Reset Dates
                        </Button>
                    </form>
                </div>

                {/* History Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h3 className="font-semibold text-gray-800">
                            My Attendance Records
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            {history.length} record
                            {history.length !== 1 ? 's' : ''} found
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Time In
                                    </th>

                                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">
                                        Time Out
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {history.length > 0 ? (
                                    history.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="border-b last:border-b-0 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {formatDate(record.date)}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {formatTime(record.time_in)}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {formatTime(record.time_out)}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                                                        statusStyle[record.status] ??
                                                        'bg-gray-100 text-gray-700'
                                                    }`}
                                                >
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="px-6 py-10 text-center text-gray-500"
                                        >
                                            No attendance records found for these dates.
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
