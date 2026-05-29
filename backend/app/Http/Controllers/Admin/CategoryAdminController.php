<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryAdminController extends Controller
{
    public function index()
    {
        $categories = MenuCategory::withCount('menus')->orderBy('sort_order')->get();
        return view('admin.categories.index', compact('categories'));
    }

    public function create()
    {
        return view('admin.categories.form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'icon'       => 'nullable|string|max:10',
            'sort_order' => 'nullable|integer',
        ]);
        $data['slug']       = Str::slug($data['name']);
        $data['sort_order'] = $data['sort_order'] ?? 0;
        MenuCategory::create($data);
        return redirect()->route('admin.categories.index')->with('success','Kategori ditambahkan!');
    }

    public function edit(MenuCategory $category)
    {
        return view('admin.categories.form', compact('category'));
    }

    public function update(Request $request, MenuCategory $category)
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'icon'       => 'nullable|string|max:10',
            'sort_order' => 'nullable|integer',
        ]);
        $category->update($data);
        return redirect()->route('admin.categories.index')->with('success','Kategori diperbarui!');
    }

    public function destroy(MenuCategory $category)
    {
        $category->delete();
        return redirect()->route('admin.categories.index')->with('success','Kategori dihapus.');
    }
}
