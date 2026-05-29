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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('reservation_code')->unique();
            $table->string('name');
            $table->string('phone');
            $table->string('email');
            $table->date('date');
            $table->time('time');
            $table->tinyInteger('adults')->default(1);
            $table->tinyInteger('children')->default(0);
            $table->enum('seating_area', [
                'outdoor_lt1',
                'indoor_lt1',
                'indoor_lt1_nosmoking',
                'lt2_ac',
            ]);
            $table->text('message')->nullable();
            $table->string('promo_code')->nullable();
            $table->decimal('subtotal', 12, 0)->default(0);
            $table->decimal('discount_amount', 12, 0)->default(0);
            $table->decimal('total_price', 12, 0)->default(0);
            $table->decimal('dp_amount', 12, 0)->default(0);
            $table->boolean('has_order')->default(false);
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['unpaid', 'pending', 'paid'])->default('unpaid');
            $table->string('midtrans_order_id')->nullable();
            $table->string('midtrans_token')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
