<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class MenuAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Menu::with('category');
        if ($request->search) $query->where('name','like','%'.$request->search.'%');
        if ($request->category_id) $query->where('category_id', $request->category_id);
        $menus = $query->orderBy('sort_order')->paginate(15);
        $categories = MenuCategory::orderBy('sort_order')->get();
        return view('admin.menus.index', compact('menus','categories'));
    }

    public function create()
    {
        $categories = MenuCategory::orderBy('sort_order')->get();
        return view('admin.menus.form', compact('categories'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id'  => 'required|exists:menu_categories,id',
            'name'         => 'required|string|max:100',
            'description'  => 'nullable|string',
            'price'        => 'required|integer|min:0',
            'image'        => 'nullable|image|max:5120',
            'is_available' => 'nullable',
            'is_recommended' => 'nullable',
            'sort_order'   => 'nullable|integer',
        ]);
        $data['slug']         = Str::slug($data['name'].'-'.Str::random(4));
        $data['is_available'] = $request->boolean('is_available');
        $data['is_recommended'] = $request->boolean('is_recommended');
        $data['sort_order']   = $data['sort_order'] ?? 0;
        
        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('menus', 'public');
        }

        Menu::create($data);
        return redirect()->route('admin.menus.index')->with('success','Menu berhasil ditambahkan!');
    }

    public function edit(Menu $menu)
    {
        $categories = MenuCategory::orderBy('sort_order')->get();
        return view('admin.menus.form', compact('menu','categories'));
    }

    public function update(Request $request, Menu $menu)
    {
        $data = $request->validate([
            'category_id'  => 'required|exists:menu_categories,id',
            'name'         => 'required|string|max:100',
            'description'  => 'nullable|string',
            'price'        => 'required|integer|min:0',
            'image'        => 'nullable|image|max:5120',
            'is_available' => 'nullable',
            'is_recommended' => 'nullable',
            'sort_order'   => 'nullable|integer',
        ]);
        $data['is_available']   = $request->boolean('is_available');
        $data['is_recommended'] = $request->boolean('is_recommended');
        $data['sort_order']     = $data['sort_order'] ?? $menu->sort_order;
        
        if ($request->hasFile('image')) {
            if ($menu->image_path) {
                Storage::disk('public')->delete($menu->image_path);
            }
            $data['image_path'] = $request->file('image')->store('menus', 'public');
        }

        $menu->update($data);
        return redirect()->route('admin.menus.index')->with('success','Menu berhasil diperbarui!');
    }

    public function destroy(Menu $menu)
    {
        if ($menu->image_path) {
            Storage::disk('public')->delete($menu->image_path);
        }
        $menu->delete();
        return redirect()->route('admin.menus.index')->with('success','Menu dihapus.');
    }
}
