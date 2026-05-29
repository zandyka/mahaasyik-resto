<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Menu extends Model {
    use HasFactory;
    protected $fillable = ['category_id','name','slug','description','price','image_ratio','image_path','is_available','is_recommended','sort_order'];
    protected $casts = ['price' => 'integer', 'is_available' => 'boolean', 'is_recommended' => 'boolean'];
    public function category() { return $this->belongsTo(MenuCategory::class, 'category_id'); }
    public function reservationItems() { return $this->hasMany(ReservationItem::class); }
    public function deliveryItems() { return $this->hasMany(DeliveryItem::class); }
}
