<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\PositionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login');
});

use App\Http\Controllers\DashboardController;

Route::middleware(['auth'])->get(
    '/dashboard',
    [DashboardController::class, 'index']
)->name('dashboard');

/*
|--------------------------------------------------------------------------
| Employee Routes
|--------------------------------------------------------------------------
*/

Route::prefix('employees')
    ->name('employees.')
    ->group(function () {

        Route::get('/', [EmployeeController::class, 'index'])
            ->name('index');

        Route::get('/create', [EmployeeController::class, 'create'])
            ->name('create');

        Route::post('/', [EmployeeController::class, 'store'])
            ->name('store');

        // Status
        Route::patch('/{employee}/status', [EmployeeController::class, 'updateStatus'])
            ->name('status');

        // Edit — put this BEFORE /{employee}
        Route::get('/{employee}/edit', [EmployeeController::class, 'edit'])
            ->name('edit');

        // Show — keep this AFTER /{employee}/edit
        Route::get('/{employee}', [EmployeeController::class, 'show'])
            ->name('show');

        Route::put('/{employee}', [EmployeeController::class, 'update'])
            ->name('update');

        Route::delete('/{employee}', [EmployeeController::class, 'destroy'])
            ->name('destroy');
    });

    /*
|--------------------------------------------------------------------------
| Employee Profile Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/employee-profile', [EmployeeController::class, 'createProfile'])
        ->name('employee-profile.create');

    Route::post('/employee-profile', [EmployeeController::class, 'storeProfile'])
        ->name('employee-profile.store');

});

Route::prefix('departments')
    ->name('departments.')
    ->middleware(['auth', 'employee.profile'])
    ->group(function () {

        Route::get('/', [DepartmentController::class, 'index'])
            ->name('index');

        Route::get('/create', [DepartmentController::class, 'create'])
            ->name('create');

        Route::post('/', [DepartmentController::class, 'store'])
            ->name('store');

        Route::get('/{department}/edit', [DepartmentController::class, 'edit'])
            ->name('edit');

        Route::get('/{department}', [DepartmentController::class, 'show'])
            ->name('show');

        Route::put('/{department}', [DepartmentController::class, 'update'])
            ->name('update');

        Route::delete('/{department}', [DepartmentController::class, 'destroy'])
            ->name('destroy');
    });

Route::prefix('positions')
    ->name('positions.')
    ->middleware(['auth', 'employee.profile'])
    ->group(function () {

        // List positions
        Route::get('/', [
            PositionController::class,
            'index'
        ])->name('index');

        // Create position form
        Route::get('/create', [
            PositionController::class,
            'create'
        ])->name('create');

        // Store new position
        Route::post('/', [
            PositionController::class,
            'store'
        ])->name('store');

        // Edit position form
        Route::get('/{position}/edit', [
            PositionController::class,
            'edit'
        ])->name('edit');

        // Update position
        Route::put('/{position}', [
            PositionController::class,
            'update'
        ])->name('update');

        // Delete position
        Route::delete('/{position}', [
            PositionController::class,
            'destroy'
        ])->name('destroy');
    });
Route::prefix('attendance')
    ->name('attendance.')
    ->middleware(['auth', 'employee.profile'])
    ->group(function () {
        Route::get('/', [AttendanceController::class, 'index'])
            ->name('index');

        Route::post('/clock-in', [AttendanceController::class, 'clockIn'])
            ->name('clock-in');

        Route::post('/clock-out', [AttendanceController::class, 'clockOut'])
            ->name('clock-out');
    });
Route::get('/attendance/admin', [
    AttendanceController::class,
    'adminIndex',
])
    ->middleware('auth')
    ->name('attendance.admin');



Route::middleware('auth')
    ->prefix('leave-requests')
    ->name('leave-requests.')
    ->controller(LeaveRequestController::class)
    ->group(function () {

        // Employee routes
        Route::get('/', 'employeeIndex')
            ->name('index');

        Route::post('/', 'store')
            ->name('store');

        // Admin/Manager routes
        Route::get('/admin', 'adminIndex')
            ->name('admin');

        Route::patch('/{leaveRequest}/approve', 'approve')
            ->name('approve');

        Route::patch('/{leaveRequest}/reject', 'reject')
            ->name('reject');
    });



