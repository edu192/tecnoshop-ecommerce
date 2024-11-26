<?php

namespace App\Http\Controllers\Backend;

use App\Data\OrderData;
use App\FlashNotificationType;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $ordersQuery=QueryBuilder::for(Order::class)
            ->allowedFilters(['id','state']);
        $orders=OrderData::collect($ordersQuery->paginate(10),PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/Order/Index/Page',[
            'paginated_collection' => $orders,
        ]);
    }

    public function update(Order $order, Request $request)
    {
        $request->validate([
            'state' => 'required|string|in:en_proceso,completado',
        ]);
        $order->state = $request->state;
        $order->save();
        return redirect()->route('mantenimiento.orders.index')->flash(FlashNotificationType::Success, 'Orden actualizada correctamente');
    }
}
