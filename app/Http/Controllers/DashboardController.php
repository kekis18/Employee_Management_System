<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Department;
use App\Models\Employee;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        /*
        |--------------------------------------------------------------------------
        | Admin Dashboard
        |--------------------------------------------------------------------------
        */

        if ($user->hasRole('Admin')) {
            $today = now()->toDateString();
            $monthStart = now()->startOfMonth()->toDateString();

            $totalEmployees = Employee::count();

            $activeEmployees = Employee::where('status', 'active')
                ->count();

            $totalDepartments = Department::count();

            $presentToday = Attendance::whereDate('date', $today)
                ->whereIn('status', ['present', 'late'])
                ->count();

            $pendingLeaves = LeaveRequest::where('status', 'pending')
                ->count();

            $attendanceRate = $activeEmployees > 0
                ? round(($presentToday / $activeEmployees) * 100, 1)
                : 0;

            $recentEmployees = Employee::with([
                'user',
                'position.department',
            ])
                ->latest('id')
                ->take(5)
                ->get()
                ->map(function ($employee) {
                    $name = trim(implode(' ', array_filter([
                        $employee->user?->first_name,
                        $employee->user?->middle_name,
                        $employee->user?->last_name,
                    ])));

                    $initials = collect(explode(' ', $name))
                        ->filter()
                        ->take(2)
                        ->map(fn ($part) => strtoupper(substr($part, 0, 1)))
                        ->implode('');

                    return [
                        'id' => $employee->id,
                        'name' => $name ?: 'Unnamed Employee',
                        'initials' => $initials ?: '?',
                        'department' => $employee->position?->department?->name
                            ?? 'Not assigned',
                        'position' => $employee->position?->name
                            ?? 'Not assigned',
                        'status' => $employee->status,
                    ];
                });

            return Inertia::render('Dashboard', [
                'statistics' => [
                    [
                        'title' => 'Total Employees',
                        'value' => $totalEmployees,
                        'description' => 'Registered employees',
                        'icon' => 'users',
                        'color' => 'blue',
                    ],
                    [
                        'title' => 'Departments',
                        'value' => $totalDepartments,
                        'description' => 'Organizational units',
                        'icon' => 'building',
                        'color' => 'violet',
                    ],
                    [
                        'title' => 'Present Today',
                        'value' => $presentToday,
                        'description' => 'Employees checked in',
                        'icon' => 'check',
                        'color' => 'emerald',
                    ],
                    [
                        'title' => 'Pending Leaves',
                        'value' => $pendingLeaves,
                        'description' => 'Awaiting your review',
                        'icon' => 'calendar',
                        'color' => 'amber',
                    ],
                ],

                'recentEmployees' => $recentEmployees,

                'systemOverview' => [
                    'attendanceRate' => $attendanceRate,
                    'activeEmployees' => $activeEmployees,
                    'pendingRequests' => $pendingLeaves,
                ],
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Employee Dashboard
        |--------------------------------------------------------------------------
        */

        $employee = $user->employee()
            ->with('position.department')
            ->first();

        if (!$employee) {
            return redirect()->route('employee-profile.create');
        }

        $today = now()->toDateString();
        $monthStart = now()->startOfMonth()->toDateString();

        $todayAttendance = Attendance::where('employee_id', $employee->id)
            ->whereDate('date', $today)
            ->first();

        $attendanceSummary = Attendance::where('employee_id', $employee->id)
            ->whereBetween('date', [$monthStart, $today])
            ->selectRaw("
                SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
                SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late,
                SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent
            ")
            ->first();

        $leaveSummary = LeaveRequest::where('employee_id', $employee->id)
            ->selectRaw("
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
            ")
            ->first();

        $recentAttendance = Attendance::where('employee_id', $employee->id)
            ->latest('date')
            ->take(5)
            ->get(['id', 'date', 'time_in', 'time_out', 'status']);

        $recentLeaves = LeaveRequest::where('employee_id', $employee->id)
            ->latest('id')
            ->take(5)
            ->get([
                'id',
                'leave_type',
                'start_date',
                'end_date',
                'status',
            ]);

        $name = trim(implode(' ', array_filter([
            $user->first_name,
            $user->middle_name,
            $user->last_name,
        ])));

        return Inertia::render('Employees/Dashboard', [
            'employee' => [
                'employee_id' => $employee->employee_id,
                'name' => $name ?: 'Employee',
                'email' => $user->email,
                'department' => $employee->position?->department?->name
                    ?? 'Not assigned',
                'position' => $employee->position?->name
                    ?? 'Not assigned',
                'hire_date' => $employee->hire_date?->format('M d, Y'),
                'status' => $employee->status,
            ],

            'todayAttendance' => $todayAttendance,

            'attendanceSummary' => [
                'present' => (int) ($attendanceSummary->present ?? 0),
                'late' => (int) ($attendanceSummary->late ?? 0),
                'absent' => (int) ($attendanceSummary->absent ?? 0),
            ],

            'leaveSummary' => [
                'pending' => (int) ($leaveSummary->pending ?? 0),
                'approved' => (int) ($leaveSummary->approved ?? 0),
                'rejected' => (int) ($leaveSummary->rejected ?? 0),
            ],

            'recentAttendance' => $recentAttendance,
            'recentLeaves' => $recentLeaves,
        ]);
    }
}
