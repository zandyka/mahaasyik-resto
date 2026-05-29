<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DeliveryItem extends Model {
    protected $fillable = ['delivery_id','menu_id','name','price','quantity','subtotal'];
    protected $casts = ['price' => 'integer', 'subtotal' => 'integer'];
    public function delivery() { return $this->belongsTo(Delivery::class); }
    public function menu() { return $this->belongsTo(Menu::class); }
}
