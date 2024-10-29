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
            return redirect()->back()->with('error', 'Ya has enviado una reseña para este producto.');
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

        return redirect()->back()->with('success', 'Reseña enviada con éxito.');
    }

    public function destroy(Product $product, Review $review, Request $request)
    {
        if ($review->user_id !== $request->user()->id) {
            return redirect()->back()->with('error', 'No estas autorizado para eliminar esta reseña.');
        }

        $review->delete();

        return redirect()->back()->with('success', 'Reseña eliminada con éxito.');
    }
}
