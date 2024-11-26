<?php

namespace App\Http\Controllers;

use App\Data\DiscountGroupData;
use App\Data\ProductData;
use App\FlashNotificationType;
use App\Models\Discount;
use App\Models\DiscountGroup;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class GeneralDiscountController extends Controller
{
    public function index()
    {
        $discountsGroupsQuery = QueryBuilder::for(DiscountGroup::class)->withCount('discounts')
            ->allowedFilters(['id']);
        $discountGroups = DiscountGroupData::collect($discountsGroupsQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/Discount/Index/Page', ['paginated_collection' => $discountGroups]);
    }

    public function create()
    {
        $productsQuery = QueryBuilder::for(Product::class)
            ->allowedFilters(['name']);
        $products = ProductData::collect($productsQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/Discount/Create/Page', ['paginated_collection' => $products]);
    }

    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'discount' => 'required|numeric',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'max_uses' => 'required|integer',
        'selectedProducts' => 'required|array',
        'selectedProducts.*' => 'exists:products,id',
        'allProductsSelected' => 'required|boolean',
    ]);

    try {
        $discount = DiscountGroup::create([
            'name' => $request->input('name'),
            'value' => $request->input('discount'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'max_uses' => $request->input('max_uses'),
            'actual_uses' => 0,
        ]);

        $productIds = $request->input('allProductsSelected') ? Product::pluck('id')->toArray() : $request->input('selectedProducts');

        foreach ($productIds as $productId) {
            $discount->discounts()->create([
                'product_id' => $productId,
            ]);
        }
        return redirect()->route('mantenimiento.discount.index')->flash(FlashNotificationType::Success, 'Descuento creado correctamente');
    } catch (\Exception $e) {
        dd($e->getMessage());
    }
}

    public function delete(DiscountGroup $discountGroup)
    {
        $discountGroup->delete();
        return redirect()->route('mantenimiento.discount.index')->flash(FlashNotificationType::Success, 'Descuento eliminado correctamente');
    }
}
