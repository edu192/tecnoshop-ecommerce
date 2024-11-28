<?php

namespace App\Http\Controllers\Backend;

use App\Data\CategoryData;
use App\Data\ProductData;
use App\FlashNotificationType;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $productsQuery = QueryBuilder::for(Product::class)
            ->allowedFilters(['name', 'brand', 'category_id']);
        $products=ProductData::collect($productsQuery->paginate(10),PaginatedDataCollection::class)->wrap('paginated_data');
        $categories=CategoryData::collect(Category::all());
        return Inertia::render('Backend/Product/Index/Page', ['paginated_collection' => $products,'categories'=>$categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'brand' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category' => 'required|exists:categories,id',
            'image' => 'required|image|max:1048|mimes:jpeg,png,jpg',
        ]);
        $product = Product::create([
            'name' => $request->input('name'),
            'brand' => $request->input('brand'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'category_id' => $request->input('category'),
            'image' => 'outdated'
        ]);
        if ($request->hasFile('image')) {
            $product->addMediaFromRequest('image')->toMediaCollection('main_image');
        }

        return redirect()->route('mantenimiento.products.index')->flash(FlashNotificationType::Success, 'Producto creado correctamente');
    }

    public function destroy(Product $product)
    {
        try {
            $product->delete();
            return redirect()->route('mantenimiento.products.index')->flash(FlashNotificationType::Success, 'Producto eliminado correctamente');
        } catch (\Exception $e) {
            dd($e->getMessage());
        }
    }

    public function update(Product $product, Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'brand' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:1048|mimes:jpeg,png,jpg',
        ]);

        $product->update([
            'name' => $request->input('name'),
            'brand' => $request->input('brand'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'category_id' => $request->input('category'),
        ]);

        if ($request->hasFile('image')) {
            $product->clearMediaCollection('main_image');
            $product->addMediaFromRequest('image')->toMediaCollection('main_image');
        }

        return redirect()->route('mantenimiento.products.index')->flash(FlashNotificationType::Success, 'Producto actualizado correctamente');
    }
}
