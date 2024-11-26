<?php

namespace App\Http\Controllers;

use App\Data\BannerData;
use App\Models\Banner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

class BannerController extends Controller
{
    public function index()
    {
        $bannerQuery = QueryBuilder::for(Banner::class)
            ->allowedFilters(['name']);
        $banners = BannerData::collect($bannerQuery->paginate(10), PaginatedDataCollection::class)->wrap('paginated_data');
        return Inertia::render('Backend/Banner/Index/Page', ['paginated_collection' => $banners]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'link' => 'required|string',
            'image' => 'required|image|max:2048|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $banner = Banner::create($request->only('name', 'link'));
        if ($request->hasFile('image')) {
            $banner->addMediaFromRequest('image')->toMediaCollection('image');
        }

        return redirect()->route('mantenimiento.banner.index');
    }

    public function update(Banner $banner, Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'link' => 'required|string',
            'image' => 'nullable|image|max:2048|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $banner->update($request->only('name', 'link'));
        if ($request->hasFile('image')) {
            $banner->addMediaFromRequest('image')->toMediaCollection('image');
        }

        return redirect()->route('mantenimiento.banner.index');
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();
    }
}
