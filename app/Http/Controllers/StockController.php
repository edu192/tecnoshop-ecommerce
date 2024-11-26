<?php

namespace App\Http\Controllers;

use App\Data\ProductBatchData;
use App\Models\Product;
use App\Models\ProductBatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index(Product $product)
    {
        $batches = ProductBatchData::collect(ProductBatch::where('product_id', $product->id)->get());
        return Inertia::render('Backend/Stock/Index/Page', ['product' => $product,'batches' => $batches]);
    }

    public function store(Product $product, Request $request)
    {
        $request->validate([
            'provider' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'price_unit' => 'required|numeric|min:0',
            'voucher' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        try {
            $productBatch = ProductBatch::create([
                'provider' => $request->input('provider'),
                'quantity' => $request->input('quantity'),
                'unit_price' => $request->input('price_unit'),
                'product_id' => $product->id,
            ]);

            if ($request->hasFile('voucher')) {
                $productBatch->addMedia($request->file('voucher'))->toMediaCollection('voucher');
            }

            return redirect()->route('mantenimiento.stock.index', $product)
                ->with('success', 'Stock entry created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}
