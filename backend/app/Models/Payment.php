<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Payment extends Model {
    protected $fillable = ['payable_type','payable_id','midtrans_order_id','midtrans_transaction_id','payment_method','status','gross_amount','paid_at','midtrans_response'];
    protected $casts = ['gross_amount' => 'integer', 'paid_at' => 'datetime', 'midtrans_response' => 'array'];
    public function payable() { return $this->morphTo(); }
}
