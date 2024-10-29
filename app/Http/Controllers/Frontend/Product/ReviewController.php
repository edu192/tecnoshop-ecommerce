<?php

namespace App\Http\Controllers\Frontend\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {

    }

    public function store(Product $product, Request $request)
    {
        if ($product->reviews()->where('user_id', $request->user()->id)->exists()) {
            return redirect()->back()->with('error', 'You have already submitted a review.');
        }
        $request->validate([
            'stars' => 'required|numeric|min:1|max:5',
            'comment' => 'required|string',
        ]);

        $product->reviews()->create([
            'user_id' => auth()->id(),
            'stars' => $request->stars,
            'comment' => $request->comment,
        ]);

        return redirect()->back()->with('success', 'Review submitted successfully.');
    }

    public function destroy(Product $product, Review $review, Request $request)
    {
        if ($review->user_id !== $request->user()->id) {
            return redirect()->back()->with('error', 'You are not authorized to perform this action.');
        }

        $review->delete();

        return redirect()->back()->with('success', 'Review deleted successfully.');
    }
}
