<?php

namespace App\Http\Controllers;

use App\Data\ReviewData;
use App\FlashNotificationType;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class ReviewController extends Controller
{
    public function index(Product $product)
    {
        $reviewsQuery = QueryBuilder::for($product->reviews())
            ->allowedFilters(['comment']);
        $reviews = ReviewData::collect($reviewsQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/Review/Index/Page', ['product' => $product, 'paginated_collection' => $reviews]);
    }

    public function update(Product $product, Review $review, Request $request)
    {
        $request->validate([
            'status' => 'required|boolean',
        ]);
        $review->status = $request->status;
        $review->save();
        return redirect()->route('mantenimiento.review.index', $product)->flash(FlashNotificationType::Success, 'Reseña actualizada correctamente');
    }

    public function delete(Product $product, Review $review, Request $request)
    {
        $review->delete();
        return redirect()->route('mantenimiento.review.index', $product)->flash(FlashNotificationType::Success, 'Reseña eliminada correctamente');
    }
}
