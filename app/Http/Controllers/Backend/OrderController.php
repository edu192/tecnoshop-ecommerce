<?php

namespace App\Http\Controllers\Backend;

use App\Data\OrderData;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all()->map(function (Order $order) {
            return OrderData::from($order);
        });
        return Inertia::render('Backend/Order/Index/Page',[
            'orders' => $orders,
        ]);
    }
}
