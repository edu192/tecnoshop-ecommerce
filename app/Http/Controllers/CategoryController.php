<?php

namespace App\Http\Controllers;

use App\Data\CategoryData;
use App\Models\Category;
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
}
