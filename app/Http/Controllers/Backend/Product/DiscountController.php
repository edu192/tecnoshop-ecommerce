<?php

namespace App\Http\Controllers\Backend\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    public function index()
    {

    }

    public function store(Product $product, Request $request)
    {
        $request->validate([
            'discount' => 'required|numeric|min:1|max:100',
        ]);
        if ($product->discount()->exists()) {
            $product->discount->delete();
        }

        $product->discount()->create([
            'code' => uniqid(),
            'type' => 'producto',
            'value' => $request->input('discount'),
            'start_date' => now(),
            'end_date' => now()->addDays(7),
            'max_uses' => 1,
            'actual_uses' => 0,
        ]);
        $product->save();

        return redirect()->route('mantenimiento.products.index');
    }
}
