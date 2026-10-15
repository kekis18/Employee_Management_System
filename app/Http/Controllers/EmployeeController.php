<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Position;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index(Request $request): Response
    {
        $status = $request->get('status', 'active');

        $employees = Employee::with([
            'user',
            'position.department',
        ])
            ->where('status', $status)
            ->latest()
            ->get();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'status' => $status,
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create(): Response
    {
            $positions = Position::with('department')
                ->orderBy('name')
                ->get([
                    'id',
                    'department_id',
                    'name',
                ]);

            return Inertia::render('Employees/Create', [
                'positions' => $positions,
            ]);
    }

    /**
     * Store a newly created employee.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => [
                'required',
                'string',
                'max:255',
            ],

            'middle_name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'last_name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],

            'phone' => [
                'nullable',
                'string',
                'max:255',
            ],

            'position_id' => [
                'nullable',
                'exists:positions,id',
            ],

            'hire_date' => [
                'nullable',
                'date',
            ],

            'status' => [
                'required',
                'in:active,inactive',
            ],
        ]);

        DB::transaction(function () use ($validated) {

            // Create the user account
            $user = User::create([
                'first_name' => $validated['first_name'],
                'middle_name' => $validated['middle_name'] ?? null,
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'password' => $validated['password'],
            ]);

            $user->assignRole('Employee');

            // Generate the employee ID automatically
            $employeeId = 'EMP-' . str_pad(
                (Employee::max('id') ?? 0) + 1,
                4,
                '0',
                STR_PAD_LEFT
            );

            // Create the employee record
            Employee::create([
                'user_id' => $user->id,
                'employee_id' => $employeeId,
                'phone' => $validated['phone'] ?? null,
                'position_id' => $validated['position_id'] ?? null,
                'hire_date' => $validated['hire_date'] ?? null,
                'status' => $validated['status'],
            ]);
        });

        return redirect()
            ->route('employees.index')
            ->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee): Response
    {
        $employee->load([
            'user',
            'position.department',
        ]);

        return Inertia::render('Employees/Show', [
            'employee' => $employee,
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee): Response
    {
        $employee->load([
            'user',
            'position.department',
        ]);

        $positions = Position::with('department')
            ->orderBy('name')
            ->get([
                'id',
                'department_id',
                'name',
            ]);

        return Inertia::render('Employees/Edit', [
            'employee' => $employee,
            'positions' => $positions,
        ]);
    }

    /**
     * Update the specified employee.
     */
    public function update(
        Request $request,
        Employee $employee
    ): RedirectResponse {
        $validated = $request->validate([
            'first_name' => [
                'required',
                'string',
                'max:255',
            ],

            'middle_name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'last_name' => [
                'required',
                'string',
                'max:255',
            ],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email,' . $employee->user_id,
            ],

            'phone' => [
                'nullable',
                'string',
                'max:255',
            ],

            'position_id' => [
                'nullable',
                'exists:positions,id',
            ],

            'hire_date' => [
                'nullable',
                'date',
            ],

            'status' => [
                'required',
                'in:active,inactive',
            ],
        ]);

        DB::transaction(function () use ($validated, $employee) {

            // Update the user account
            $employee->user->update([
                'first_name' => $validated['first_name'],
                'middle_name' => $validated['middle_name'] ?? null,
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
            ]);

            // Update the employee record
            $employee->update([
                'phone' => $validated['phone'] ?? null,
                'position_id' => $validated['position_id'] ?? null,
                'hire_date' => $validated['hire_date'] ?? null,
                'status' => $validated['status'],
            ]);
        });

        return redirect()
            ->route('employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified employee.
     */
    public function destroy(Employee $employee): RedirectResponse
    {
        $employee->update([
            'status' => 'inactive',
        ]);

        return redirect()
            ->route('employees.index', [
                'status' => 'inactive',
            ])
            ->with('success', 'Employee deactivated successfully.');
    }

    /**
     * Show the employee profile completion form.
     */
    public function createProfile(Request $request): Response
    {
        $positions = Position::with('department')
            ->orderBy('name')
            ->get([
                'id',
                'department_id',
                'name',
            ]);

        return Inertia::render('CompleteProfile', [
            'user' => $request->user(),
            'positions' => $positions,
        ]);
    }

    /**
     * Store the employee profile for the authenticated user.
     */
    public function storeProfile(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->employee) {
            return redirect()->route('dashboard');
        }

        $validated = $request->validate([
            'phone' => [
                'nullable',
                'string',
                'max:255',
            ],

            'position_id' => [
                'nullable',
                'exists:positions,id',
            ],

            'hire_date' => [
                'required',
                'date',
            ],
        ]);

        Employee::create([
            'user_id' => $user->id,

            'employee_id' => 'EMP-' . str_pad(
                (Employee::max('id') ?? 0) + 1,
                4,
                '0',
                STR_PAD_LEFT
            ),

            'phone' => $validated['phone'] ?? null,

            'position_id' => $validated['position_id'] ?? null,

            'hire_date' => $validated['hire_date'],

            'status' => 'active',
        ]);

        return redirect()
            ->route('dashboard')
            ->with(
                'success',
                'Employee profile completed successfully.'
            );
    }

    /**
     * Update the employee status.
     */
    public function updateStatus(
        Request $request,
        Employee $employee
    ): RedirectResponse {
        $validated = $request->validate([
            'status' => [
                'required',
                'in:active,inactive',
            ],
        ]);

        $employee->update([
            'status' => $validated['status'],
        ]);

        return redirect()
            ->route('employees.index', [
                'status' => $validated['status'],
            ])
            ->with(
                'success',
                'Employee status updated successfully.'
            );
    }
}
