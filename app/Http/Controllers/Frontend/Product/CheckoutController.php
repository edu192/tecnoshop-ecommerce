<?php

namespace App\Http\Controllers\Frontend\Product;

use App\Data\CityData;
use App\Data\DepartmentData;
use App\FlashNotificationType;
use App\Http\Controllers\Controller;
use App\Rules\ValidExpiryDateRule;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $cities=CityData::collect(\App\Models\City::all());
        return Inertia::render('Checkout/Page',['departments' =>DepartmentData::collect(\App\Models\Department::all()),'cities'=>$cities]);
    }

    public function store(Request $request)
    {
        if ($request->payment_method === 'yape') {
            $request->merge([
                'credit_card' => $this->generateRandomCreditCardNumber(),
                'expiry_date' => $this->generateRandomExpiryDate(),
                'cvv' => $this->generateRandomCVV(),
            ]);
        }

        $request->validate([
            'address' => 'required|string',
            'city' => 'required|string',
            'department' => 'required|int|exists:departments,id',
            'postal_code' => 'required|string',
            'payment_method' => 'required|string|in:credit_card,yape',
            'cartItems' => 'required|array',
            'credit_card' => [
                'required_if:payment_method,credit_card',
                'regex:/^\d{16}$/'
            ],
            'expiry_date' => [
                'required_if:payment_method,credit_card',
                'regex:/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/',
                new ValidExpiryDateRule,
            ],
            'cvv' => [
                'required_if:payment_method,credit_card',
                'regex:/^[0-9]{3,4}$/'
            ],
        ]);

        $order = auth()->user()->orders()->create([
            'address' => $request->address,
            'city' => $request->city,
            'city_id' => $request->city,
            'department_id' => $request->department,
            'postal_code' => $request->postal_code,
            'payment_method' => $request->payment_method,
            'state' => 'pending',
            'total' => 0
        ]);

        foreach ($request->cartItems as $item) {
            $unit_price = $item['discount'] ? $item['price'] * (1 - $item['discount']['value'] / 100) : $item['price'];
            $order->order_details()->create([
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'unit_price' => $unit_price,
            ]);

            // Update product stock
            $product = \App\Models\Product::find($item['id']);
            if ($product) {
                $product->stock -= $item['quantity'];
                $product->save();
            }
        }

        $order->update([
            'total' => $order->order_details->sum(function ($detail) {
                return $detail->unit_price * $detail->quantity;
            }),
            'state' => 'en proceso'
        ]);

        return redirect()->route('profile.orders')->flash(FlashNotificationType::Success, 'Compra realizada correctamente');
    }

    private function generateRandomCreditCardNumber()
    {
        $faker = \Faker\Factory::create();
        return $faker->creditCardNumber;
    }

    private function generateRandomExpiryDate()
    {
        $faker = \Faker\Factory::create();
        return $faker->creditCardExpirationDateString;
    }

    private function generateRandomCVV()
    {
        $faker = \Faker\Factory::create();
        return str_pad($faker->randomNumber(3, true), 3, '0', STR_PAD_LEFT);
    }
}
