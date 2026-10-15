<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PositionController extends Controller
{
    /**
     * Display a listing of positions.
     */

    public function index(Request $request): Response
    {
        $search = $request->get('search');

        $positions = Position::with(['department'])
            ->withCount('employees')
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhereHas('department', function ($query) use ($search) {
                            $query->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->orderBy('name')
            ->get();

        return Inertia::render('Positions/Index', [
            'positions' => $positions,
            'search' => $search,
        ]);
    }



    /**
     * Show the form for creating a new position.
     */
    public function create(): Response
    {
        $departments = Department::orderBy('name')->get([
            'id',
            'name', ]);

            return Inertia::render('Positions/Create', [
            'departments' => $departments,
             ]);
    }

    /**
     * Store a newly created position.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'department_id' => [
                'required',
                'exists:departments,id',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'nullable',
                'string',
            ],
        ]);

        Position::create($validated);

        return redirect()
            ->route('positions.index')
            ->with('success', 'Position created successfully.');
    }



    /**
     * Show the form for editing the specified position.
     */
    public function edit(Position $position): Response
    {
        $departments = Department::orderBy('name')->get([
            'id',
            'name',
        ]);

        return Inertia::render('Positions/Edit', [
            'position' => $position,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified position.
     */
    public function update(
        Request $request,
        Position $position
    ): RedirectResponse {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:positions,name,' . $position->id,
            ],
            'description' => [
                'nullable',
                'string',
            ],
        ]);

        $position->update($validated);

        return redirect()
            ->route('positions.index')
            ->with('success', 'Position updated successfully.');
    }

    /**
     * Remove the specified position.
     */
    public function destroy(Position $position): RedirectResponse
    {
        $position->delete();

        return redirect()
            ->route('positions.index')
            ->with('success', 'Position deleted successfully.');
    }
}
