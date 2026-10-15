<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LeaveRequestController extends Controller
{
    /**
     * Display the authenticated employee's leave requests.
     */
    public function index(Request $request): Response|RedirectResponse
    {
        return $this->employeeIndex($request);
    }

    /**
     * Display the authenticated employee's leave request page.
     */
    public function employeeIndex(Request $request): Response|RedirectResponse
    {
        $employee = $request->user()
            ->employee()
            ->first();

        if (!$employee) {
            return redirect()->route('employee-profile.create');
        }

        $leaveRequests = LeaveRequest::where('employee_id', $employee->id)
            ->latest()
            ->get();

        return Inertia::render('LeaveRequests/Index', [
            'leaveRequests' => $leaveRequests,
        ]);
    }

    /**
     * Store a new leave request for the authenticated employee.
     */
    public function store(Request $request): RedirectResponse
    {
        $employee = $request->user()
            ->employee()
            ->first();

        if (!$employee) {
            return redirect()->route('employee-profile.create');
        }

        $validated = $request->validate([
            'leave_type' => [
                'required',
                'in:Vacation Leave,Sick Leave,Emergency Leave,Personal Leave,Other',
            ],
            'start_date' => [
                'required',
                'date',
                'after_or_equal:today',
            ],
            'end_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
            ],
            'reason' => [
                'required',
                'string',
                'max:1000',
            ],
        ]);

        LeaveRequest::create([
            'employee_id' => $employee->id,
            'leave_type' => $validated['leave_type'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'reason' => $validated['reason'],
            'status' => 'pending',
        ]);

        return redirect()
            ->route('leave-requests.index')
            ->with('success', 'Leave request submitted successfully.');
    }

    /**
     * Cancel a pending leave request owned by the employee.
     */
    public function destroy(
        Request $request,
        LeaveRequest $leaveRequest
    ): RedirectResponse {
        $employee = $request->user()
            ->employee()
            ->first();

        if (!$employee) {
            abort(403, 'Employee profile not found.');
        }

        abort_unless(
            (int) $leaveRequest->employee_id === (int) $employee->id,
            403,
            'You cannot cancel another employee\'s leave request.'
        );

        abort_unless(
            $leaveRequest->status === 'pending',
            403,
            'Only pending leave requests can be cancelled.'
        );

        $leaveRequest->delete();

        return redirect()
            ->route('leave-requests.index')
            ->with('success', 'Leave request cancelled successfully.');
    }

    /**
     * Ensure only administrators can manage leave requests.
     */
    private function authorizeAdmin(Request $request): void
    {
        abort_unless(
            $request->user()?->hasRole('Admin'),
            403,
            'Only administrators can manage leave requests.'
        );
    }

    /**
     * Display all leave requests for the administrator.
     */
    public function adminIndex(Request $request): Response
    {
        $this->authorizeAdmin($request);

        $validated = $request->validate([
            'status' => [
                'nullable',
                'in:pending,approved,rejected',
            ],
        ]);

        $query = LeaveRequest::with([
            'employee.user',
            'employee.position.department',
            'reviewer',
        ])->latest();

        if (!empty($validated['status'])) {
            $query->where('status', $validated['status']);
        }

        $leaveRequests = $query->get()->map(function ($leaveRequest) {
            $employee = $leaveRequest->employee;
            $user = $employee?->user;

            return [
                'id' => $leaveRequest->id,
                'employee_id' => $employee?->employee_id ?? 'N/A',
                'employee_name' => trim(implode(' ', array_filter([
                    $user?->first_name,
                    $user?->middle_name,
                    $user?->last_name,
                ]))) ?: 'Unknown Employee',
                'department' => $employee?->position?->department?->name
                    ?? 'Unassigned',
                'position' => $employee?->position?->name ?? 'Unassigned',
                'leave_type' => $leaveRequest->leave_type,
                'start_date' => $leaveRequest->start_date?->format('Y-m-d'),
                'end_date' => $leaveRequest->end_date?->format('Y-m-d'),
                'reason' => $leaveRequest->reason,
                'status' => $leaveRequest->status,
                'reviewed_by' => $leaveRequest->reviewer
                    ? trim(implode(' ', array_filter([
                        $leaveRequest->reviewer->first_name,
                        $leaveRequest->reviewer->middle_name,
                        $leaveRequest->reviewer->last_name,
                    ])))
                    : null,
                'reviewed_at' => $leaveRequest->reviewed_at
                    ?->format('Y-m-d H:i'),
            ];
        });

        return Inertia::render('LeaveRequests/AdminIndex', [
            'leaveRequests' => $leaveRequests,
            'filters' => [
                'status' => $validated['status'] ?? '',
            ],
            'summary' => [
                'pending' => LeaveRequest::where('status', 'pending')->count(),
                'approved' => LeaveRequest::where('status', 'approved')->count(),
                'rejected' => LeaveRequest::where('status', 'rejected')->count(),
            ],
        ]);
    }

    /**
     * Approve a pending leave request.
     */
    public function approve(
        Request $request,
        LeaveRequest $leaveRequest
    ): RedirectResponse {
        $this->authorizeAdmin($request);

        if ($leaveRequest->status !== 'pending') {
            return back()->with(
                'error',
                'Only pending requests can be approved.'
            );
        }

        $leaveRequest->update([
            'status' => 'approved',
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return back()->with(
            'success',
            'Leave request approved successfully.'
        );
    }

    /**
     * Reject a pending leave request.
     */
    public function reject(
        Request $request,
        LeaveRequest $leaveRequest
    ): RedirectResponse {
        $this->authorizeAdmin($request);

        if ($leaveRequest->status !== 'pending') {
            return back()->with(
                'error',
                'Only pending requests can be rejected.'
            );
        }

        $leaveRequest->update([
            'status' => 'rejected',
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
        ]);

        return back()->with(
            'success',
            'Leave request rejected successfully.'
        );
    }
}
