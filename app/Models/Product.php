<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'category_id', 'store_id', 'description', 'image', 'price', 'compare_price'
    ];

     

     

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
