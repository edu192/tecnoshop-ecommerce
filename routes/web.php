<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', \App\Http\Controllers\Frontend\HomeController::class)->name('home');
Route::get('/categories/{category}', [\App\Http\Controllers\Frontend\CategoryController::class, 'index'])->name('category.index');
Route::post('/search_product', [\App\Http\Controllers\Frontend\CategoryController::class, 'search'])->name('product.search');
Route::get('/products/{product}', [\App\Http\Controllers\Frontend\ProductController::class, 'show'])->name('product.show');
Route::get('/checkout', [\App\Http\Controllers\Frontend\Product\CheckoutController::class, 'index'])->name('checkout')->middleware('auth');
Route::post('/checkout', [\App\Http\Controllers\Frontend\Product\CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/profile/orders', [\App\Http\Controllers\Frontend\OrderController::class, 'index'])->name('profile.orders')->middleware('auth');

Route::post('/products/{product}/reviews', [\App\Http\Controllers\Frontend\Product\ReviewController::class, 'store'])->name('product.reviews.store')->middleware('auth');
Route::delete('/products/{product}/reviews/{review}', [\App\Http\Controllers\Frontend\Product\ReviewController::class, 'destroy'])->name('product.reviews.destroy')->middleware('auth');
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::group(['prefix' => 'mantenimiento', 'as' => 'mantenimiento.', 'middleware' => ['auth', 'backend']], function () {
    Route::get('/dashboard', [\App\Http\Controllers\Backend\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/orders', [\App\Http\Controllers\Backend\OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders/{order}', [\App\Http\Controllers\Backend\OrderController::class, 'update'])->name('orders.update');
    Route::get('/products', [\App\Http\Controllers\Backend\ProductController::class, 'index'])->name('products.index');
    Route::get('/stock/{product}', [\App\Http\Controllers\StockController::class, 'index'])->name('stock.index');
    Route::get('/categories', [\App\Http\Controllers\CategoryController::class, 'index'])->name('category.index');
    Route::get('/reviews', [\App\Http\Controllers\ReviewController::class, 'index'])->name('review.index');
    Route::get('/advertising', [\App\Http\Controllers\AdvertisingController::class, 'index'])->name('advertising.index');
    Route::get('/banners', [\App\Http\Controllers\BannerController::class, 'index'])->name('banner.index');
    Route::get('/discounts', [\App\Http\Controllers\GeneralDiscountController::class, 'index'])->name('discount.index');
    Route::post('/products', [\App\Http\Controllers\Backend\ProductController::class, 'store'])->name('products.store');
    Route::post('/products/{product}', [\App\Http\Controllers\Backend\ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [\App\Http\Controllers\Backend\ProductController::class, 'destroy'])->name('products.destroy');
    Route::post('/products/{product}/discounts', [\App\Http\Controllers\Backend\Product\DiscountController::class, 'store'])->name('products.discounts.store');
    Route::get('/users', [\App\Http\Controllers\Backend\UserController::class, 'index'])->name('users.index');
    Route::post('/users', [\App\Http\Controllers\Backend\UserController::class, 'store'])->name('users.store');
    Route::post('/users/{user}', [\App\Http\Controllers\Backend\UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [\App\Http\Controllers\Backend\UserController::class, 'destroy'])->name('users.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
