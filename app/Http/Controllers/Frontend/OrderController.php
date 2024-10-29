<?php

namespace App\Http\Controllers\Frontend;

use App\Data\OrderData;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = auth()->user()->orders->map(function (Order $order) {
            return OrderData::from($order);
        });

        return Inertia::render('Frontend/Order/Page', [
            'orders' => $orders,
        ]);
    }
}
