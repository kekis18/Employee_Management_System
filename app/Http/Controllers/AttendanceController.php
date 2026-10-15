<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AttendanceController extends Controller
{
    public function index(Request $request): Response
    {
        $employee = $request->user()
            ->employee()
            ->firstOrFail();

        $today = now()->toDateString();

        $validated = $request->validate([
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
        ]);

        $startDate = $validated['start_date']
            ?? now()->startOfMonth()->toDateString();

        $endDate = $validated['end_date'] ?? $today;

        $todayAttendance = Attendance::where('employee_id', $employee->id)
            ->whereDate('date', $today)
            ->first();

        $history = Attendance::where('employee_id', $employee->id)
            ->whereDate('date', '>=', $startDate)
            ->whereDate('date', '<=', $endDate)
            ->orderByDesc('date')
            ->get();

        $monthlyAttendance = Attendance::where('employee_id', $employee->id)
            ->whereYear('date', now()->year)
            ->whereMonth('date', now()->month);

        return Inertia::render('Attendance/Index', [
            'todayAttendance' => $todayAttendance,
            'history' => $history,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'summary' => [
                'present' => (clone $monthlyAttendance)
                    ->where('status', 'present')
                    ->count(),
                'late' => (clone $monthlyAttendance)
                    ->where('status', 'late')
                    ->count(),
                'absent' => (clone $monthlyAttendance)
                    ->where('status', 'absent')
                    ->count(),
                'leave' => (clone $monthlyAttendance)
                    ->where('status', 'leave')
                    ->count(),
            ],
        ]);
    }

    public function clockIn(Request $request): RedirectResponse
    {
        $employee = $request->user()
            ->employee()
            ->firstOrFail();

        $today = now()->toDateString();

        $attendance = Attendance::firstOrCreate(
            [
                'employee_id' => $employee->id,
                'date' => $today,
            ],
            [
                'time_in' => now()->format('H:i:s'),
                'status' => 'present',
            ]
        );

        if ($attendance->wasRecentlyCreated) {
            return redirect()
                ->route('attendance.index')
                ->with('success', 'You have successfully clocked in.');
        }

        if ($attendance->time_in !== null) {
            return redirect()
                ->route('attendance.index')
                ->with('error', 'You have already clocked in today.');
        }

        $attendance->update([
            'time_in' => now()->format('H:i:s'),
            'status' => 'present',
        ]);

        return redirect()
            ->route('attendance.index')
            ->with('success', 'You have successfully clocked in.');
    }

    public function clockOut(Request $request): RedirectResponse
    {
        $employee = $request->user()
            ->employee()
            ->firstOrFail();

        $today = now()->toDateString();

        $attendance = Attendance::where('employee_id', $employee->id)
            ->whereDate('date', $today)
            ->first();

        if (!$attendance || !$attendance->time_in) {
            return redirect()
                ->route('attendance.index')
                ->with('error', 'You must clock in before clocking out.');
        }

        if ($attendance->time_out !== null) {
            return redirect()
                ->route('attendance.index')
                ->with('error', 'You have already clocked out today.');
        }

        $attendance->update([
            'time_out' => now()->format('H:i:s'),
        ]);

        return redirect()
            ->route('attendance.index')
            ->with('success', 'You have successfully clocked out.');
    }
    public function adminIndex(Request $request): Response
{
    abort_unless(
        $request->user()->hasRole('Admin'),
        403,
        'You are not authorized to view this page.'
    );

    $validated = $request->validate([
        'date' => ['nullable', 'date'],
    ]);

    $date = $validated['date'] ?? now()->toDateString();

    $employees = \App\Models\Employee::with([
        'user',
        'position.department',
    ])
        ->where('status', 'active')
        ->orderBy('employee_id')
        ->get();

    $attendanceRecords = Attendance::whereDate('date', $date)
        ->get()
        ->keyBy('employee_id');

    $rows = $employees->map(function ($employee) use ($attendanceRecords) {
        $attendance = $attendanceRecords->get($employee->id);

        return [
            'id' => $employee->id,
            'employee_id' => $employee->employee_id,
            'name' => trim(implode(' ', array_filter([
                $employee->user?->first_name,
                $employee->user?->middle_name,
                $employee->user?->last_name,
            ]))),
            'department' => $employee->position?->department?->name ?? 'Unassigned',
            'position' => $employee->position?->name ?? 'Unassigned',
            'time_in' => $attendance?->time_in,
            'time_out' => $attendance?->time_out,
            'status' => $attendance?->status ?? 'absent',
        ];
    });

    return Inertia::render('Attendance/AdminIndex', [
        'employees' => $rows,
        'selectedDate' => $date,
        'summary' => [
            'total' => $employees->count(),
            'present' => $rows->where('status', 'present')->count(),
            'late' => $rows->where('status', 'late')->count(),
            'leave' => $rows->where('status', 'leave')->count(),
            'absent' => $rows->where('status', 'absent')->count(),
        ],
    ]);
}
}
