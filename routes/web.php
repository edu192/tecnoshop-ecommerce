<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', \App\Http\Controllers\Frontend\HomeController::class)->name('home');
Route::get('/categories/{category}',[\App\Http\Controllers\Frontend\CategoryController::class,'index'])->name('category.index');
Route::post('/search_product',[\App\Http\Controllers\Frontend\CategoryController::class,'search'])->name('product.search');
Route::get('/products/{product}',[\App\Http\Controllers\Frontend\ProductController::class,'show'])->name('product.show');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
