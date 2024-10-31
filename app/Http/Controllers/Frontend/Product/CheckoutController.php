<?php

namespace App\Http\Controllers\Frontend\Product;

use App\Http\Controllers\Controller;
use App\Rules\ValidExpiryDateRule;
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
        $request->validate([
            'address' => 'required|string',
            'city' => 'required|string',
            'department' => 'required|string',
            'postal_code' => 'required|string',
            'payment_method' => 'required|string',
            'cartItems' => 'required|array',
            'credit_card' => [
                'required',
                'regex:/^\d{16}$/'
            ],
            'expiry_date' => [
                'required',
                'regex:/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/',
                new ValidExpiryDateRule,
            ],
            'cvv' => [
                'required',
                'regex:/^[0-9]{3,4}$/'
            ],
        ]);

        $order = auth()->user()->orders()->create([
            'address' => $request->address,
            'city' => $request->city,
            'department' => $request->department,
            'postal_code' => $request->postal_code,
            'payment_method' => $request->payment_method,
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
            'state' => 'en proceso'
        ]);

        return redirect()->route('home')->with('success', 'Orden creada con éxito.');
    }
}
