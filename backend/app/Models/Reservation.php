<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Reservation extends Model {
    use HasFactory;
    protected $fillable = ['reservation_code','name','phone','email','date','time','adults','children','seating_area','message','promo_code','subtotal','discount_amount','total_price','dp_amount','has_order','status','payment_status','midtrans_order_id','midtrans_token'];
    protected $casts = ['date' => 'date', 'subtotal' => 'integer', 'discount_amount' => 'integer', 'total_price' => 'integer', 'dp_amount' => 'integer', 'has_order' => 'boolean'];
    public function items() { return $this->hasMany(ReservationItem::class); }
    public function payment() { return $this->morphOne(Payment::class, 'payable'); }
    public function getSeatingAreaLabelAttribute() {
        return match($this->seating_area) {
            'outdoor_lt1' => 'Outdoor Lt. 1',
            'indoor_lt1' => 'Indoor Lt. 1',
            'indoor_lt1_nosmoking' => 'Indoor Lt. 1 No Smoking (AC)',
            'lt2_ac' => 'Lt. 2 (AC)',
            default => $this->seating_area
        };
    }
}
