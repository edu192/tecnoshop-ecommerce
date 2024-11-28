<?php

namespace App\Http\Controllers\Backend;

use App\Data\OrderData;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $orders =OrderData::collect(Order::with('order_details')->latest()->limit(5)->get());
        $usersCount = User::count();
        $productsCount = Product::count();
        $ordersCount = Order::count();
        $ordersTotal = Order::sum('total');
        return Inertia::render('Backend/Dashboard/Page', [
            'orders' => $orders,
            'usersCount' => $usersCount,
            'productsCount' => $productsCount,
            'ordersCount' => $ordersCount,
            'ordersTotal' => $ordersTotal,
        ]);
    }
}
