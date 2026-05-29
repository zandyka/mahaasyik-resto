<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Promo extends Model {
    protected $fillable = ['code','description','discount_type','discount_value','min_order','max_uses','used_count','is_active','expired_at'];
    protected $casts = ['discount_value' => 'integer', 'min_order' => 'integer', 'is_active' => 'boolean', 'expired_at' => 'datetime'];
}
