<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Promo;
use Illuminate\Http\Request;

class PromoAdminController extends Controller
{
    public function index()
    {
        $promos = Promo::latest()->paginate(15);
        return view('admin.promos.index', compact('promos'));
    }

    public function create()
    {
        return view('admin.promos.form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code'           => 'required|string|max:50|unique:promos,code',
            'description'    => 'nullable|string',
            'discount_type'  => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'min_order'      => 'nullable|numeric|min:0',
            'max_uses'       => 'nullable|integer|min:1',
            'is_active'      => 'nullable',
            'expired_at'     => 'nullable|date',
        ]);
        $data['code']      = strtoupper($data['code']);
        $data['is_active'] = $request->boolean('is_active');
        $data['min_order'] = $data['min_order'] ?? 0;
        Promo::create($data);
        return redirect()->route('admin.promos.index')->with('success','Kode promo ditambahkan!');
    }

    public function edit(Promo $promo)
    {
        return view('admin.promos.form', compact('promo'));
    }

    public function update(Request $request, Promo $promo)
    {
        $data = $request->validate([
            'code'           => 'required|string|max:50|unique:promos,code,'.$promo->id,
            'description'    => 'nullable|string',
            'discount_type'  => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'min_order'      => 'nullable|numeric|min:0',
            'max_uses'       => 'nullable|integer|min:1',
            'is_active'      => 'nullable',
            'expired_at'     => 'nullable|date',
        ]);
        $data['is_active'] = $request->boolean('is_active');
        $promo->update($data);
        return redirect()->route('admin.promos.index')->with('success','Kode promo diperbarui!');
    }

    public function destroy(Promo $promo)
    {
        $promo->delete();
        return redirect()->route('admin.promos.index')->with('success','Promo dihapus.');
    }

    public function toggle(Promo $promo)
    {
        $promo->update(['is_active' => !$promo->is_active]);
        return back()->with('success', 'Status promo diubah.');
    }
}
