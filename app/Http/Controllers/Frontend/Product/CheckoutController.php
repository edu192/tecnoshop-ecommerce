<?php

namespace App\Http\Controllers\Frontend\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Checkout/Page');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'address' => 'required|string',
                'city' => 'required|string',
                'country' => 'required|string',
                'postalCode' => 'required|string',
                'payment_method' => 'required|string',
                'cartItems' => 'required|array',
            ]);

            $order = auth()->user()->orders()->create([
//                'address' => $request->address,
//                'city' => $request->city,
//                'country' => $request->country,
//                'postal_code' => $request->postalCode,
//                'payment_method' => $request->payment_method,
                'state' => 'pending',
                'total' => 0
            ]);

            foreach ($request->cartItems as $item) {
                $order->order_details()->create([
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['price'],
                ]);
            }
            $order->update([
                'total' => $order->order_details->sum('unit_price'),
                'state' => 'completed'
            ]);

            return redirect()->route('home')->with('success', 'Order placed successfully.');
        } catch (\Exception $e) {
            return dd($e->getMessage());
        }
    }
}
