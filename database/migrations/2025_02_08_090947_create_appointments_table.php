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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->text('first_name');
            $table->text('last_name');
            $table->text('email');
            $table->foreignId('course_id')->references('id')->on('courses');
            $table->foreignId('category_id')->references('id')->on('categories');
            $table->text('observations')->nullable();
            $table->timestamp('timestamp');
            $table->enum('status', ['confirmed', 'pending_email_confirmation', 'canceled']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
