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
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->string('delivery_code')->unique();
            $table->string('name');
            $table->string('phone');
            $table->string('email');
            $table->text('address');
            $table->text('notes')->nullable();
            $table->enum('delivery_method', ['gojek', 'grab', 'delivery_boy']);
            $table->enum('payment_method', [
                'qris',
                'gopay',
                'dana',
                'shopeepay',
                'google_pay',
                'debit',
                'cod',
            ]);
            $table->string('promo_code')->nullable();
            $table->decimal('subtotal', 12, 0)->default(0);
            $table->decimal('discount_amount', 12, 0)->default(0);
            $table->decimal('delivery_fee', 12, 0)->default(0);
            $table->decimal('total_price', 12, 0)->default(0);
            $table->enum('status', ['pending', 'processing', 'delivering', 'delivered', 'cancelled'])->default('pending');
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
        Schema::dropIfExists('deliveries');
    }
};
