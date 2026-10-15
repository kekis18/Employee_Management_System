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
            Schema::create('employees', function (Blueprint $table) {
                $table->id();

                // User account
                $table->foreignId('user_id')
                    ->nullable()
                    ->unique()
                    ->constrained('users')
                    ->nullOnDelete();

                // Employee information
                $table->string('employee_id')->unique();

                $table->string('phone')->nullable();

                // Department and position
                $table->foreignId('position_id')
                    ->nullable()
                    ->constrained()
                    ->nullOnDelete();

                $table->date('hire_date')->nullable();

                $table->enum('status', ['active', 'inactive'])
                    ->default('active');

                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('employees');
        }
    };
