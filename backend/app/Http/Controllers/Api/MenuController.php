<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index(Request $request)
    {
        $query = Menu::with('category')->where('is_available', true);

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->recommended) {
            $query->where('is_recommended', true);
        }

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $menus = $query->orderBy('sort_order')->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $menus
        ]);
    }

    public function show($id)
    {
        $menu = Menu::with('category')->findOrFail($id);
        return response()->json(['success' => true, 'data' => $menu]);
    }

    public function categories()
    {
        $categories = MenuCategory::withCount(['menus' => function($q) {
            $q->where('is_available', true);
        }])->orderBy('sort_order')->get();

        return response()->json(['success' => true, 'data' => $categories]);
    }
}
