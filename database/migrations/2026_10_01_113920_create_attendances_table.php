<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();

            // Employee
            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();

            // Attendance details
            $table->date('date');
            $table->time('time_in')->nullable();
            $table->time('time_out')->nullable();

            $table->enum('status', [
                'present',
                'absent',
                'late',
                'leave',
            ])->default('present');

            $table->timestamps();

            // One attendance record per employee per day
            $table->unique(['employee_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
