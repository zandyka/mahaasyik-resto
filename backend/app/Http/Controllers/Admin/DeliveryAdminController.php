<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryAdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Delivery::with('items.menu')->latest();
        if ($request->status) $query->where('status', $request->status);
        if ($request->search) {
            $q = $request->search;
            $query->where(fn($x) => $x->where('name','like',"%$q%")->orWhere('delivery_code','like',"%$q%")->orWhere('phone','like',"%$q%"));
        }
        $deliveries = $query->paginate(15);
        return view('admin.deliveries.index', compact('deliveries'));
    }

    public function show(Delivery $delivery)
    {
        $delivery->load('items.menu');
        return view('admin.deliveries.show', compact('delivery'));
    }

    public function updateStatus(Request $request, Delivery $delivery)
    {
        $request->validate(['status' => 'required|in:pending,processing,delivering,delivered,cancelled']);
        $delivery->update(['status' => $request->status]);
        return back()->with('success', 'Status delivery diperbarui!');
    }
}
