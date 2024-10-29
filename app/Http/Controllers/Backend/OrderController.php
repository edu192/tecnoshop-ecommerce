<?php

namespace App\Http\Controllers\Backend;

use App\Data\OrderData;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
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

    public function update(Order $order, Request $request)
    {
        $request->validate([
            'state' => 'required|string|in:en_proceso,completado',
        ]);
        $order->state = $request->state;
        $order->save();
        return redirect()->route('mantenimiento.orders.index')->with('success', 'Orden actualizada correctamente');
    }
}
