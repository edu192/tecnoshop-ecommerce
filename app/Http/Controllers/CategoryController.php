<?php

namespace App\Http\Controllers;

use App\Data\CategoryData;
use App\FlashNotificationType;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class CategoryController extends Controller
{
    public function index()
    {
        $categoriesQuery = QueryBuilder::for(Category::class)->withCount('products')
            ->allowedFilters(['name']);
        $categories = CategoryData::collect($categoriesQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');

        return Inertia::render('Backend/Category/Index/Page', ['paginated_collection' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'required|image|max:1048|mimes:jpeg,png,jpg',
        ]);
        $product = Category::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);
        if ($request->hasFile('image')) {
            $product->addMediaFromRequest('image')->toMediaCollection('main_image');
        }

        return redirect()->route('mantenimiento.products.index')->flash(FlashNotificationType::Success, 'Categoria creado correctamente');

    }

    public function update(Category $category, Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|max:1048|mimes:jpeg,png,jpg',
        ]);
        $category->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
        ]);
        if ($request->hasFile('image')) {
            $category->addMediaFromRequest('image')->toMediaCollection('main_image');
        }

        return redirect()->route('mantenimiento.category.index')->flash(FlashNotificationType::Success, 'Categoria actualizado correctamente');
    }

    public function destroy(Category $category, Request $request)
    {
        $category->delete();
        return redirect()->route('mantenimiento.category.index')->flash(FlashNotificationType::Success, 'Categoria eliminado correctamente');
    }
}
