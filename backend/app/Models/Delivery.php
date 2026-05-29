<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Delivery extends Model {
    use HasFactory;
    protected $fillable = ['delivery_code','name','phone','email','address','notes','delivery_method','payment_method','promo_code','subtotal','discount_amount','delivery_fee','total_price','status','payment_status','midtrans_order_id','midtrans_token'];
    protected $casts = ['subtotal' => 'integer', 'discount_amount' => 'integer', 'delivery_fee' => 'integer', 'total_price' => 'integer'];
    public function items() { return $this->hasMany(DeliveryItem::class); }
    public function payment() { return $this->morphOne(Payment::class, 'payable'); }
    public function getDeliveryMethodLabelAttribute() {
        return match($this->delivery_method) {
            'gojek' => 'GoJek', 'grab' => 'Grab', 'delivery_boy' => 'Delivery Boy Restoran',
            default => $this->delivery_method
        };
    }
}
